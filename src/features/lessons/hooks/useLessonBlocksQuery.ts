import { useQuery } from "@tanstack/react-query";
import { lessonBlocksApi } from "../api/lessonBlocksApi";

// Fetches all blocks for a lesson. Enabled only when lessonId is non-empty.
export function useLessonBlocksQuery(lessonId: string) {
	return useQuery({
		queryKey: ["lesson-blocks", lessonId],
		queryFn: () => lessonBlocksApi.getByLessonId(lessonId),
		staleTime: 10 * 60 * 1000,
		enabled: !!lessonId,
	});
}
