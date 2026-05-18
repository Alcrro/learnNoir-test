import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, AlertCircle, RefreshCw, ChevronLeft } from "lucide-react";
import { cn } from "../../../../../libs/utils/cn";
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
	const [mobilePanel, setMobilePanel] = useState<"list" | "detail">("detail");

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

	const handleSelect = (id: string) => {
		onSelect(id);
		setMobilePanel("detail");
	};

	return (
		<div className="flex h-full overflow-hidden">
			{/* Left — problem list: full width on mobile (when active), fixed on md+ */}
			<div
				className={cn(
					"md:flex md:w-[260px] md:shrink-0",
					mobilePanel === "list" ? "flex w-full" : "hidden md:flex",
				)}
			>
				<ProblemListPanel
					exercises={exercises}
					selectedId={exerciseId}
					statusMap={statusMap}
					onSelect={handleSelect}
					isPro={isPro}
				/>
			</div>

			{/* Right — detail + editor */}
			<div
				className={cn(
					"min-w-0 flex-1 flex-col overflow-hidden",
					mobilePanel === "detail" ? "flex" : "hidden md:flex",
				)}
			>
				{/* Back button — mobile only */}
				<button
					onClick={() => setMobilePanel("list")}
					className="flex items-center gap-1 border-b border-(--border) px-4 py-2.5 text-xs text-(--text-secondary) transition-colors hover:text-(--text-primary) md:hidden"
				>
					<ChevronLeft className="h-3.5 w-3.5" />
					Exerciții
				</button>

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
