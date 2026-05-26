import { useCallback, useRef } from "react";
import { useUpsertProgressMutation } from "./useLessonProgressQuery";
import { useGuestProgressStore } from "../store/useGuestProgressStore";
import UseGetProfile from "../../profiles/hooks/UseGetProfile";

export function useMarkLessonCompleted(lessonId: string) {
	const { isAuthenticated } = UseGetProfile();
	const { mutate: upsert } = useUpsertProgressMutation(lessonId);
	const setGuestReadProgress = useGuestProgressStore((s) => s.setReadProgress);
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

	const reset = useCallback(() => {
		savedRef.current = false;
	}, []);

	return { markCompleted, reset };
}
