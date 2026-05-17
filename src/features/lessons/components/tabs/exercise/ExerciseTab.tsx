import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { ProblemListPanel } from "./organisms/ProblemListPanel";
import { ProblemDetailPanel } from "./organisms/ProblemDetailPanel";
import { CodeEditorPanel } from "./organisms/CodeEditorPanel";
import { ResizableSplit } from "./molecules/ResizableSplit";
import { useExerciseSession } from "./hooks/useExerciseSession";
import { exercisesApi } from "./lib/exercisesApi";
import { useIsPro } from "../../../../../features/subscriptions/hooks/useSubscription";
import type { ExerciseStatus, ExerciseProgressItem } from "./lib/exerciseTypes";

type Props = {
	lessonId: string;
};

function buildStatusMap(items: ExerciseProgressItem[]): Record<string, ExerciseStatus> {
	const map: Record<string, ExerciseStatus> = {};
	for (const item of items) {
		map[item.exerciseId] = item.status === "passed" ? "passed" : "failed";
	}
	return map;
}

function ExerciseSessionView({
	lessonId,
	exerciseId,
	statusMap,
	allExerciseIds,
	onSelect,
	isPro,
}: {
	lessonId: string;
	exerciseId: string;
	statusMap: Record<string, ExerciseStatus>;
	allExerciseIds: string[];
	onSelect: (id: string) => void;
	isPro: boolean;
}) {
	const { data: exercises = [] } = useQuery({
		queryKey: ["exercises", lessonId, isPro],
		queryFn: () =>
			isPro
				? exercisesApi.getByLesson(lessonId)
				: exercisesApi.getPreviewByLesson(lessonId),
		staleTime: 5 * 60 * 1000,
	});

	const exercise = exercises.find((e) => e.id === exerciseId);

	const session = useExerciseSession(
		exerciseId,
		lessonId,
		exercise?.starterCode ?? "",
	);

	if (!exercise) return null;

	return (
		<div className="flex h-full overflow-hidden">
			<ProblemListPanel
				exercises={exercises}
				selectedId={exerciseId}
				statusMap={statusMap}
				onSelect={onSelect}
				isPro={isPro}
			/>

			<ResizableSplit
				className="flex-1 min-w-0"
				defaultSplit={45}
				top={
					<ProblemDetailPanel
						exercise={exercise}
						revealedHints={session.revealedHints}
						onRevealHint={session.revealHint}
					/>
				}
				bottom={
					<CodeEditorPanel
						code={session.code}
						onChange={session.setCode}
						onRun={session.run}
						onSubmit={session.submit}
						onReset={session.reset}
						isRunning={session.isRunning}
						runState={session.runState}
					/>
				}
			/>
		</div>
	);
}

export function ExerciseTab({ lessonId }: Props) {
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const qc = useQueryClient();
	const isPro = useIsPro();

	const { data: exercises = [], isLoading: loadingExercises, isError, error } = useQuery({
		queryKey: ["exercises", lessonId, isPro],
		queryFn: () =>
			isPro
				? exercisesApi.getByLesson(lessonId)
				: exercisesApi.getPreviewByLesson(lessonId),
		enabled: !!lessonId,
		staleTime: 5 * 60 * 1000,
		retry: 1,
	});

	const { data: progressItems = [] } = useQuery({
		queryKey: ["exercise-progress", lessonId],
		queryFn: () => exercisesApi.getMyProgress(lessonId),
		enabled: !!lessonId,
		staleTime: 60 * 1000,
		retry: false,
	});

	const statusMap = buildStatusMap(progressItems);
	const activeId = selectedId ?? exercises[0]?.id ?? null;

	if (loadingExercises) {
		return (
			<div className="flex h-full items-center justify-center gap-2 text-(--text-muted)">
				<Loader2 className="h-4 w-4 animate-spin" />
				<span className="text-sm">Se încarcă exercițiile...</span>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex h-full flex-col items-center justify-center gap-3 text-(--text-muted)">
				<AlertCircle className="h-5 w-5 text-red-400" />
				<p className="text-sm">Eroare la încărcarea exercițiilor.</p>
				<p className="text-xs text-(--text-muted) opacity-60">{(error as Error)?.message}</p>
				<button
					onClick={() => void qc.invalidateQueries({ queryKey: ["exercises", lessonId] })}
					className="flex items-center gap-1.5 rounded-md border border-(--border) px-3 py-1.5 text-xs text-(--text-secondary) transition-colors hover:border-(--border-strong)"
				>
					<RefreshCw className="h-3 w-3" />
					Reîncearcă
				</button>
			</div>
		);
	}

	if (exercises.length === 0) {
		return (
			<div className="flex h-full items-center justify-center text-sm text-(--text-muted)">
				Nu există exerciții pentru această lecție.
			</div>
		);
	}

	if (!activeId) return null;

	return (
		<ExerciseSessionView
			lessonId={lessonId}
			exerciseId={activeId}
			statusMap={statusMap}
			allExerciseIds={exercises.map((e) => e.id)}
			onSelect={setSelectedId}
			isPro={isPro}
		/>
	);
}
