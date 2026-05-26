import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { theoryLevelApi } from "../api/theoryLevelApi";
import type { ExplanationLevel } from "../api/theoryLevelApi";
import { lessonQueryKeys } from "../lib/lessonQueryKeys";

export function useTheoryLevelExplanations(lessonId: string, blockId: string) {
	const query = useQuery({
		queryKey: lessonQueryKeys.theoryLevels(blockId),
		queryFn: () => theoryLevelApi.getAll(lessonId, blockId),
		staleTime: 10 * 60 * 1000,
		enabled: !!lessonId && !!blockId,
	});

	return {
		explanations: query.data ?? [],
		isLoading: query.isLoading,
		error: query.error,
	};
}

export function useExplanationByLevel(
	lessonId: string,
	blockId: string,
	level: ExplanationLevel,
	enabled: boolean,
) {
	const query = useQuery({
		queryKey: lessonQueryKeys.theoryLevel(blockId, level),
		queryFn: () => theoryLevelApi.getByLevel(lessonId, blockId, level),
		staleTime: 10 * 60 * 1000,
		enabled: enabled && !!lessonId && !!blockId,
	});

	return {
		data: query.data,
		isLoading: query.isLoading,
		isFetching: query.isFetching,
		error: query.error,
	};
}

export function useUpsertTeacherExplanation(lessonId: string, blockId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ level, content }: { level: ExplanationLevel; content: string }) =>
			theoryLevelApi.upsertTeacher(lessonId, blockId, level, content),
		onSuccess: (_, { level }) => {
			void queryClient.invalidateQueries({ queryKey: lessonQueryKeys.theoryLevels(blockId) });
			void queryClient.invalidateQueries({ queryKey: lessonQueryKeys.theoryLevel(blockId, level) });
		},
	});
}

export function useGenerateExplanationForTeacher(lessonId: string, blockId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (level: ExplanationLevel) => theoryLevelApi.generate(lessonId, blockId, level),
		onSuccess: (data) => {
			// Set cache directly so the explanation appears instantly without a round-trip refetch.
			queryClient.setQueryData(lessonQueryKeys.theoryLevel(blockId, data.level), data);
			// Invalidate the "all levels" list so indicator dots refresh.
			void queryClient.invalidateQueries({ queryKey: lessonQueryKeys.theoryLevels(blockId) });
		},
	});
}
