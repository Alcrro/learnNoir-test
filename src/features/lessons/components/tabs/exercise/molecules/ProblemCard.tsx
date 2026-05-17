import { CheckCircle2, Circle, XCircle } from "lucide-react";
import { cn } from "../../../../../../libs/utils/cn";
import type { Exercise, ExerciseStatus } from "../lib/exerciseTypes";

const DIFFICULTY_COLOR: Record<Exercise["difficulty"], string> = {
	easy: "text-emerald-400",
	medium: "text-amber-400",
	hard: "text-red-400",
};

const DIFFICULTY_LABEL: Record<Exercise["difficulty"], string> = {
	easy: "Ușor",
	medium: "Mediu",
	hard: "Greu",
};

type Props = {
	exercise: Exercise;
	status: ExerciseStatus;
	isSelected: boolean;
	onSelect: () => void;
};

export function ProblemCard({ exercise, status, isSelected, onSelect }: Props) {
	return (
		<button
			onClick={onSelect}
			className={cn(
				"w-full rounded-lg border p-3 text-left transition-all",
				isSelected
					? "border-(--border-strong) bg-(--surface)"
					: "border-(--border) hover:border-(--border-strong) hover:bg-(--hover)",
			)}
		>
			{isSelected && (
				<span className="absolute left-0 top-4 h-6 w-0.5 rounded-r-full bg-sky-400" />
			)}

			<div className="flex items-start gap-2.5">
				{status === "passed" ? (
					<CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
				) : status === "failed" ? (
					<XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
				) : (
					<Circle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-(--text-muted) opacity-50" />
				)}

				<div className="min-w-0">
					<p
						className={cn(
							"text-xs font-medium leading-snug",
							isSelected ? "text-(--text-primary)" : "text-(--text-secondary)",
						)}
					>
						{exercise.position}. {exercise.title}
					</p>
					<span className={cn("mt-1 text-[10px] font-medium", DIFFICULTY_COLOR[exercise.difficulty])}>
						{DIFFICULTY_LABEL[exercise.difficulty]}
					</span>
				</div>
			</div>
		</button>
	);
}
