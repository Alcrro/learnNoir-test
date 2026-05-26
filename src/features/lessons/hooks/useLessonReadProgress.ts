import { useCallback, useEffect, useRef, useState } from "react";
import { useLessonProgressQuery, useUpsertProgressMutation } from "./useLessonProgressQuery";
import { useGuestProgressStore } from "../store/useGuestProgressStore";
import UseGetProfile from "../../profiles/hooks/UseGetProfile";

const READ_DWELL_MS = 3000;

export function useLessonReadProgress(lessonId: string) {
	const { isAuthenticated } = UseGetProfile();
	const { data: progress } = useLessonProgressQuery(lessonId);
	const { mutate: upsert } = useUpsertProgressMutation(lessonId);
	const guestLesson = useGuestProgressStore((s) => s.lessons[lessonId]);
	const setGuestReadProgress = useGuestProgressStore((s) => s.setReadProgress);

	const isCompleted =
		progress?.status === "completed" || guestLesson?.status === "completed";

	const [scrollProgress, setScrollProgress] = useState(isCompleted ? 100 : 0);
	const contentRef = useRef<HTMLDivElement>(null);
	const savedRef = useRef(false);
	const dwellTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

	// Scroll progress for content taller than viewport
	useEffect(() => {
		if (isCompleted) return;

		function calcProgress() {
			const el = contentRef.current;
			if (!el) return;

			const elTop = el.getBoundingClientRect().top + window.scrollY;
			const elHeight = el.offsetHeight;
			const viewportHeight = window.innerHeight;
			const scrollEnd = elTop + elHeight - viewportHeight;

			// Content shorter than viewport: progress tracked via IntersectionObserver
			if (scrollEnd <= 0) return;

			const pct = Math.min(
				100,
				Math.max(0, Math.round(((window.scrollY - elTop) / scrollEnd) * 100)),
			);
			setScrollProgress(pct);
			if (pct >= 95) markCompleted();
		}

		window.addEventListener("scroll", calcProgress, { passive: true });
		return () => window.removeEventListener("scroll", calcProgress);
	}, [isCompleted, markCompleted]);

	// For content that fits entirely in the viewport, require READ_DWELL_MS of visibility
	useEffect(() => {
		if (isCompleted) return;
		const el = contentRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry) return;
				if (entry.isIntersecting) {
					dwellTimerRef.current = setTimeout(() => {
						setScrollProgress(100);
						markCompleted();
					}, READ_DWELL_MS);
				} else {
					if (dwellTimerRef.current !== null) {
						clearTimeout(dwellTimerRef.current);
						dwellTimerRef.current = null;
					}
				}
			},
			{ threshold: 0.9 },
		);

		observer.observe(el);
		return () => {
			observer.disconnect();
			if (dwellTimerRef.current !== null) clearTimeout(dwellTimerRef.current);
		};
	}, [isCompleted, markCompleted]);

	return { scrollProgress: isCompleted ? 100 : scrollProgress, isCompleted, contentRef };
}
