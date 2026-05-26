import { useQuery } from "@tanstack/react-query";
import { lessonBlocksApi } from "../api/lessonBlocksApi";
import { lessonQueryKeys } from "../lib/lessonQueryKeys";

export function useLessonBlocksQuery(lessonId: string) {
	return useQuery({
		queryKey: lessonQueryKeys.blocks(lessonId),
		queryFn: () => lessonBlocksApi.getByLessonId(lessonId),
		staleTime: 0,
		enabled: !!lessonId,
	});
}
