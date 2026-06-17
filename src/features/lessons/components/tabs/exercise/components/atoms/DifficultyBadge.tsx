import { cn } from "../../../../../../../libs/utils/cn";
import type { ExerciseDifficulty } from "../../lib/exerciseTypes";

const COLOR: Record<ExerciseDifficulty, string> = {
	easy: "text-emerald-400",
	medium: "text-amber-400",
	hard: "text-red-400",
};

const PILL_COLOR: Record<ExerciseDifficulty, string> = {
	easy: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
	medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
	hard: "text-red-400 bg-red-400/10 border-red-400/20",
};

const LABEL: Record<ExerciseDifficulty, string> = {
	easy: "Ușor",
	medium: "Mediu",
	hard: "Greu",
};

type Props = {
	difficulty: ExerciseDifficulty;
	variant?: "inline" | "pill";
};

export function DifficultyBadge({ difficulty, variant = "inline" }: Props) {
	if (variant === "pill") {
		return (
			<span
				className={cn(
					"rounded-full border px-2 py-0.5 text-[11px] font-medium",
					PILL_COLOR[difficulty],
				)}
			>
				{LABEL[difficulty]}
			</span>
		);
	}

	return (
		<span className={cn("mt-1 text-[10px] font-medium", COLOR[difficulty])}>
			{LABEL[difficulty]}
		</span>
	);
}
