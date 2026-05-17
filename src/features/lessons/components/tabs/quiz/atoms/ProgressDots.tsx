import { cn } from "../../../../../../libs/utils/cn";
import type { QuestionResult } from "../hooks/useQuizSession";

type DotState = "current" | "correct" | "wrong" | "unanswered";

function dotState(
	idx: number,
	currentIndex: number,
	questionId: string,
	results: Record<string, QuestionResult>,
): DotState {
	if (idx === currentIndex) return "current";
	const r = results[questionId];
	if (!r?.locked) return "unanswered";
	return r.isCorrect ? "correct" : "wrong";
}

type Props = {
	total: number;
	currentIndex: number;
	questionIds: string[];
	results: Record<string, QuestionResult>;
};

export function ProgressDots({ total, currentIndex, questionIds, results }: Props) {
	return (
		<div className="flex items-center gap-1.5">
			{Array.from({ length: total }, (_, i) => {
				const id = questionIds[i] ?? "";
				const s = dotState(i, currentIndex, id, results);
				return (
					<span
						key={i}
						className={cn(
							"rounded-full transition-all duration-200",
							s === "current" &&
								"h-2.5 w-2.5 bg-(--text-primary) ring-2 ring-(--text-primary)/20",
							s === "correct" && "h-2 w-2 bg-emerald-500",
							s === "wrong" && "h-2 w-2 bg-red-400",
							s === "unanswered" && "h-2 w-2 bg-(--border-strong)",
						)}
					/>
				);
			})}
		</div>
	);
}
