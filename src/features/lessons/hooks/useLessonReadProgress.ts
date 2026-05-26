import { useCallback, useEffect, useRef, useState } from "react";
import { useLessonProgressQuery, useUpsertProgressMutation } from "./useLessonProgressQuery";
import { useGuestProgressStore } from "../store/useGuestProgressStore";
import UseGetProfile from "../../profiles/hooks/UseGetProfile";

export function useLessonReadProgress(lessonId: string) {
	const { isAuthenticated } = UseGetProfile();
	const { data: progress } = useLessonProgressQuery(lessonId);
	const { mutate: upsert } = useUpsertProgressMutation(lessonId);
	const guestLesson = useGuestProgressStore((s) => s.lessons[lessonId]);
	const setGuestReadProgress = useGuestProgressStore((s) => s.setReadProgress);

	const isCompleted =
		progress?.status === "completed" || guestLesson?.status === "completed";

	const [scrollProgress, setScrollProgress] = useState(isCompleted ? 100 : 0);
	const [hasScrollableContent, setHasScrollableContent] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const savedRef = useRef(false);

	const markCompleted = useCallback(() => {
		if (savedRef.current) return;
		savedRef.current = true;
		if (isAuthenticated) {
			upsert({ status: "completed", readScore: 100 });
		} else {
			setGuestReadProgress(lessonId, 100, "completed");
		}
	}, [isAuthenticated, upsert, setGuestReadProgress, lessonId]);

	// Sync when DB/store already shows completed (revisit)
	useEffect(() => {
		if (isCompleted) {
			savedRef.current = true;
			setScrollProgress(100);
		}
	}, [isCompleted]);

	// Determine if content is taller than the viewport and track scroll progress.
	// Short content (fits in viewport) is never auto-completed.
	useEffect(() => {
		if (isCompleted) return;

		function calcProgress() {
			const el = contentRef.current;
			if (!el) return;

			const elTop = el.getBoundingClientRect().top + window.scrollY;
			const elHeight = el.offsetHeight;
			const viewportHeight = window.innerHeight;
			const scrollEnd = elTop + elHeight - viewportHeight;

			if (scrollEnd <= 0) {
				setHasScrollableContent(false);
				return;
			}

			setHasScrollableContent(true);
			const pct = Math.min(
				100,
				Math.max(0, Math.round(((window.scrollY - elTop) / scrollEnd) * 100)),
			);
			setScrollProgress(pct);
			if (pct >= 95) markCompleted();
		}

		// Run once on mount to detect content height, then on every scroll
		calcProgress();
		window.addEventListener("scroll", calcProgress, { passive: true });
		return () => window.removeEventListener("scroll", calcProgress);
	}, [isCompleted, markCompleted]);

	return {
		scrollProgress: isCompleted ? 100 : scrollProgress,
		isCompleted,
		hasScrollableContent: isCompleted || hasScrollableContent,
		contentRef,
	};
}
