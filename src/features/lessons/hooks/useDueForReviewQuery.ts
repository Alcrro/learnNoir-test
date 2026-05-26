import { useQuery } from "@tanstack/react-query";
import { progressApi, type LessonWithReview } from "../api/progressApi";
import { useGetMe } from "../../auth/hooks/useAuth";
import { lessonQueryKeys } from "../lib/lessonQueryKeys";

export function useDueForReviewQuery() {
	const { data: me } = useGetMe();

	const query = useQuery({
		queryKey: lessonQueryKeys.dueForReview,
		queryFn: () => progressApi.getDueForReview(),
		staleTime: 5 * 60 * 1000,
		enabled: !!me?.userId,
	});

	return {
		dueItems: query.data ?? ([] as LessonWithReview[]),
		isLoading: query.isLoading,
		error: query.error,
	};
}
