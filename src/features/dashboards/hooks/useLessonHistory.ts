import { useQuery } from "@tanstack/react-query";
import { lessonsApi } from "../api/lessonsApi";

export function useLessonHistory(lessonId: string | null) {
	return useQuery({
		queryKey: ["lesson", "history", lessonId],
		queryFn: () => lessonsApi.getHistory(lessonId!),
		enabled: !!lessonId,
	});
}
