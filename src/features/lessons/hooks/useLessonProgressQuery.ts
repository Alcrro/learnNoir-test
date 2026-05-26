import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { progressApi, type UpsertProgressInput } from "../api/progressApi";
import { useGetMe } from "../../auth/hooks/useAuth";
import { useToastStore } from "../../../store/useToastStore";
import { lessonQueryKeys } from "../lib/lessonQueryKeys";

export function useLessonProgressQuery(lessonId: string) {
	const { data: me } = useGetMe();

	return useQuery({
		queryKey: lessonQueryKeys.progress(lessonId),
		queryFn: () => progressApi.getByLesson(lessonId),
		staleTime: 60 * 1000,
		enabled: !!lessonId && !!me?.userId,
	});
}

export function useUpsertProgressMutation(lessonId: string) {
	const queryClient = useQueryClient();
	const showToast = useToastStore((s) => s.show);

	return useMutation({
		mutationFn: (input: UpsertProgressInput) => progressApi.upsert(lessonId, input),
		onSuccess: (data, input) => {
			queryClient.invalidateQueries({ queryKey: lessonQueryKeys.progress(lessonId) });

			if (input.status === "completed" && data.nextReviewAt !== null) {
				queryClient.invalidateQueries({ queryKey: lessonQueryKeys.dueForReview });

				const message =
					data.reviewCount === 0
						? "Lecție completată! Revino să o reverifici în 1 zi pentru a consolida."
						: `Review complet! Următoarea revedere în ${nextIntervalDays(data.reviewCount)} zile.`;
				showToast(message);
			}
		},
	});
}

function nextIntervalDays(reviewCount: number): number {
	const intervals = [1, 3, 7, 21, 60];
	return intervals[Math.min(reviewCount, intervals.length - 1)] ?? 60;
}

export function useUpsertQuizBlockScoreMutation(lessonId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ blockId, score }: { blockId: string; score: number }) =>
			progressApi.upsertQuizBlockScore(lessonId, blockId, score),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: lessonQueryKeys.quizBlockScores(lessonId) });
		},
	});
}
