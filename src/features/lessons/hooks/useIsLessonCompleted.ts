import { useLessonProgressQuery } from "./useLessonProgressQuery";
import { useGuestProgressStore } from "../store/useGuestProgressStore";

export function useIsLessonCompleted(lessonId: string): boolean {
	const { data: progress } = useLessonProgressQuery(lessonId);
	const guestLesson = useGuestProgressStore((s) => s.lessons[lessonId]);

	return progress?.status === "completed" || guestLesson?.status === "completed";
}
