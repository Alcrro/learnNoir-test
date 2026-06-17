import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "../../../../../../../libs/utils/cn";
import { ProblemListPanel } from "./ProblemListPanel";
import { ProblemDetailPanel } from "./ProblemDetailPanel";
import { CodeEditorPanel } from "./CodeEditorPanel";
import { ResizableSplit } from "../molecules/ResizableSplit";
import { useExerciseSession } from "../../hooks/useExerciseSession";
import type { Exercise, ExerciseStatus } from "../../lib/exerciseTypes";

type Props = {
	lessonId: string;
	exercise: Exercise;
	exercises: Exercise[];
	statusMap: Record<string, ExerciseStatus>;
	onSelect: (id: string) => void;
	isPro: boolean;
};

export function ExerciseSessionView({
	lessonId,
	exercise,
	exercises,
	statusMap,
	onSelect,
	isPro,
}: Props) {
	const [mobilePanel, setMobilePanel] = useState<"list" | "detail">("detail");

	const session = useExerciseSession(
		exercise.id,
		lessonId,
		exercise.starterCode,
	);

	const handleSelect = (id: string) => {
		onSelect(id);
		setMobilePanel("detail");
	};

	return (
		<div className="flex h-full overflow-hidden">
			<div
				className={cn(
					"md:flex md:w-[260px] md:shrink-0",
					mobilePanel === "list" ? "flex w-full" : "hidden md:flex",
				)}
			>
				<ProblemListPanel
					exercises={exercises}
					selectedId={exercise.id}
					statusMap={statusMap}
					onSelect={handleSelect}
					isPro={isPro}
				/>
			</div>

			<div
				className={cn(
					"min-w-0 flex-1 flex-col overflow-hidden",
					mobilePanel === "detail" ? "flex" : "hidden md:flex",
				)}
			>
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
