import { cn } from "../../../../../../libs/utils/cn";
import { DIFFICULTY_LABEL, DIFFICULTY_WEIGHT } from "../lib/quizTypes";
import type { Difficulty } from "../lib/quizTypes";

const COLOR: Record<Difficulty, string> = {
	beginner: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
	intermediate: "border-amber-500/30 bg-amber-500/10 text-amber-400",
	expert: "border-purple-500/30 bg-purple-500/10 text-purple-400",
};

type Props = { difficulty: Difficulty; showWeight?: boolean };

export function DifficultyBadge({ difficulty, showWeight = false }: Props) {
	return (
		<span
			className={cn(
				"inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
				COLOR[difficulty],
			)}
		>
			{DIFFICULTY_LABEL[difficulty]}
			{showWeight && <span className="opacity-60">×{DIFFICULTY_WEIGHT[difficulty]}</span>}
		</span>
	);
}
