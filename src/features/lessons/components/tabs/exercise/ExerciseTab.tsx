import { useState } from "react";
import { useLessonContext } from "../../../context/LessonContext";
import { useExerciseData } from "./hooks/useExerciseData";
import { ExerciseSessionView } from "./components/organisms/ExerciseSessionView";
import { ExerciseLoadingState } from "./components/atoms/ExerciseLoadingState";
import { ExerciseErrorState } from "./components/atoms/ExerciseErrorState";
import { ExerciseEmptyState } from "./components/atoms/ExerciseEmptyState";

export function ExerciseTab() {
	const { lessonId } = useLessonContext();
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const { exercises, statusMap, isPro, isLoading, isError, error, retry } =
		useExerciseData(lessonId);

	if (isLoading) return <ExerciseLoadingState />;
	if (isError) return <ExerciseErrorState message={error?.message} onRetry={retry} />;
	if (exercises.length === 0) return <ExerciseEmptyState />;

	const activeId = selectedId ?? exercises[0]?.id ?? null;
	const activeExercise = exercises.find((e) => e.id === activeId) ?? null;

	if (!activeExercise) return null;

	return (
		<ExerciseSessionView
			lessonId={lessonId}
			exercise={activeExercise}
			exercises={exercises}
			statusMap={statusMap}
			onSelect={setSelectedId}
			isPro={isPro}
		/>
	);
}
