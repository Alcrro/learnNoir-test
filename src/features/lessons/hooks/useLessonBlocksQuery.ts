import { useQuery } from "@tanstack/react-query";
import { lessonBlocksApi } from "../api/lessonBlocksApi";

// Theory content is publicly accessible — no auth or subscription required.
export function useLessonBlocksQuery(lessonId: string) {
	return useQuery({
		queryKey: ["lesson-blocks", lessonId],
		queryFn: () => lessonBlocksApi.getByLessonId(lessonId),
		staleTime: 0,
		enabled: !!lessonId,
	});
}
