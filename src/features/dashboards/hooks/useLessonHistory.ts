import { useQuery } from "@tanstack/react-query";
import { lessonsApi } from "../api/lessonsApi";
import { dashboardQueryKeys } from "../lib/dashboardQueryKeys";

export function useLessonHistory(lessonId: string | null) {
	return useQuery({
		queryKey: dashboardQueryKeys.lessonHistory(lessonId),
		queryFn: () => lessonsApi.getHistory(lessonId!),
		enabled: !!lessonId,
	});
}
