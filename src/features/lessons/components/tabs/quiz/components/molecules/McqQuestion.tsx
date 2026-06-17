import { cn } from "../../../../../../../libs/utils/cn";
import { DifficultyBadge } from "../atoms/DifficultyBadge";
import { QuizOption } from "../atoms/QuizOption";
import type { OptionState } from "../atoms/QuizOption";
import type { McqQuestion as McqQuestionType } from "../../lib/quizTypes";
import type { QuestionResult } from "../../hooks/useQuizSession";

function resolveOptionState(
	index: number,
	result: QuestionResult,
	correctIndex: number,
): OptionState {
	if (!result.locked) {
		return result.selected === index ? "selected-pending" : "default";
	}
	if (index === correctIndex) return "correct";
	if (result.selected === index) return "wrong";
	return "default";
}

type Props = {
	question: McqQuestionType;
	result: QuestionResult;
	onSelect: (optionIndex: number) => void;
};

export function McqQuestion({ question, result, onSelect }: Props) {
	return (
		<div className="space-y-4">
			<div className="flex items-start gap-3">
				<p className="flex-1 text-base font-medium leading-snug text-(--text-primary)">
					{question.question}
				</p>
				<DifficultyBadge difficulty={question.difficulty} showWeight />
			</div>

			<div className="space-y-2">
				{question.options.map((option, i) => (
					<QuizOption
						key={i}
						label={option}
						state={resolveOptionState(i, result, question.correctIndex)}
						onClick={() => onSelect(i)}
						disabled={result.locked}
					/>
				))}
			</div>

			{result.locked && (
				<div
					className={cn(
						"rounded-lg border px-4 py-3 text-sm leading-relaxed",
						result.isCorrect
							? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
							: "border-red-400/30 bg-red-400/5 text-red-400",
					)}
				>
					{question.explanation}
				</div>
			)}
		</div>
	);
}
