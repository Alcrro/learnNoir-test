import { cn } from "../../../../../../../libs/utils/cn";
import { ChevronRight } from "lucide-react";
import { DifficultyBadge } from "../atoms/DifficultyBadge";
import type { InputQuestion as InputQuestionType } from "../../lib/quizTypes";
import type { QuestionResult } from "../../hooks/useQuizSession";

type Props = {
	question: InputQuestionType;
	result: QuestionResult;
	onValueChange: (value: string) => void;
	onSubmit: (value: string) => void;
};

export function InputQuestion({ question, result, onValueChange, onSubmit }: Props) {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && result.inputValue.trim() && !result.locked) {
			onSubmit(result.inputValue);
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex items-start gap-3">
				<p className="flex-1 text-base font-medium leading-snug text-(--text-primary)">
					{question.question}
				</p>
				<DifficultyBadge difficulty={question.difficulty} showWeight />
			</div>

			<div className="flex gap-2">
				<input
					type="text"
					value={result.inputValue}
					disabled={result.locked}
					onChange={(e) => onValueChange(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={question.placeholder ?? "Your answer…"}
					className="flex-1 rounded-lg border border-(--border) bg-(--bg) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--border-strong) disabled:opacity-60"
				/>
				{!result.locked && (
					<button
						onClick={() => onSubmit(result.inputValue)}
						disabled={!result.inputValue.trim()}
						className="flex items-center gap-1 rounded-lg border border-(--border) px-4 py-2 text-sm text-(--text-primary) transition hover:border-(--border-strong) disabled:opacity-40"
					>
						<span>Check</span>
						<ChevronRight className="h-3.5 w-3.5" />
					</button>
				)}
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
					{result.isCorrect ? (
						"Correct!"
					) : (
						<>
							Expected: <span className="font-mono">{question.correctAnswer}</span>
						</>
					)}
					<span className="ml-2 opacity-80">— {question.explanation}</span>
				</div>
			)}
		</div>
	);
}
