import { useQuery } from "@tanstack/react-query";
import { lessonBlocksApi } from "../api/lessonBlocksApi";
import { useIsPro } from "../../subscriptions/hooks/useSubscription";

// Fetches blocks for a lesson. Pro users get all blocks; free/guest users get the preview subset.
export function useLessonBlocksQuery(lessonId: string) {
	const isPro = useIsPro();

	return useQuery({
		queryKey: ["lesson-blocks", lessonId, isPro],
		queryFn: () =>
			isPro
				? lessonBlocksApi.getByLessonId(lessonId)
				: lessonBlocksApi.getPreviewByLessonId(lessonId),
		staleTime: 10 * 60 * 1000,
		enabled: !!lessonId,
	});
}
