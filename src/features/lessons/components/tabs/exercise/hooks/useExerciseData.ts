import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useIsPro } from "../../../../../../features/subscriptions/hooks/useIsPro";
import { exercisesApi } from "../lib/exercisesApi";
import { buildStatusMap } from "../lib/exerciseUtils";
import { lessonQueryKeys } from "../../../../lib/lessonQueryKeys";
import type { Exercise, ExerciseStatus } from "../lib/exerciseTypes";

type ExerciseData = {
	exercises: Exercise[];
	statusMap: Record<string, ExerciseStatus>;
	isPro: boolean;
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
	retry: () => void;
};

export function useExerciseData(lessonId: string): ExerciseData {
	const qc = useQueryClient();
	const isPro = useIsPro();

	const {
		data: exercises = [],
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: lessonQueryKeys.exercises(lessonId, isPro),
		queryFn: () =>
			isPro
				? exercisesApi.getByLesson(lessonId)
				: exercisesApi.getPreviewByLesson(lessonId),
		enabled: !!lessonId,
		staleTime: 5 * 60 * 1000,
		retry: 1,
	});

	const { data: progressItems = [] } = useQuery({
		queryKey: lessonQueryKeys.exerciseProgress(lessonId),
		queryFn: () => exercisesApi.getMyProgress(lessonId),
		enabled: !!lessonId,
		staleTime: 60 * 1000,
		retry: false,
	});

	return {
		exercises,
		statusMap: buildStatusMap(progressItems),
		isPro,
		isLoading,
		isError,
		error: error as Error | null,
		retry: () =>
			void qc.invalidateQueries({
				queryKey: lessonQueryKeys.exercisesRoot(lessonId),
			}),
	};
}
