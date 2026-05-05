import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { progressApi, type UpsertProgressInput } from "../api/progressApi";

// Fetches the current user's progress for a lesson. Returns null when not started.
export function useLessonProgressQuery(lessonId: string) {
	return useQuery({
		queryKey: ["lesson-progress", lessonId],
		queryFn: () => progressApi.getByLesson(lessonId),
		staleTime: 60 * 1000,
		enabled: !!lessonId,
	});
}

// Mutation to create or update progress. Invalidates the query on success so the
// UI re-fetches the latest state automatically.
export function useUpsertProgressMutation(lessonId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: UpsertProgressInput) => progressApi.upsert(lessonId, input),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["lesson-progress", lessonId] });
		},
	});
}
