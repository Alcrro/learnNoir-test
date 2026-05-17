import { ProgressDots } from "../atoms/ProgressDots";
import { ScoreBadge } from "../atoms/ScoreBadge";
import { earnedPoints, maxPoints } from "../lib/quizScoring";
import type { QuizQuestion } from "../lib/quizTypes";
import type { QuestionResult } from "../hooks/useQuizSession";

type Props = {
	currentIndex: number;
	questions: QuizQuestion[];
	results: Record<string, QuestionResult>;
	score: number;
};

export function QuizProgressHeader({ currentIndex, questions, results, score }: Props) {
	const questionIds = questions.map((q) => q.id);
	const earned = earnedPoints(questions, results);
	const max = maxPoints(questions);

	return (
		<div className="flex flex-col gap-2.5 border-b border-(--border) pb-4">
			<div className="flex items-center justify-between">
				<span className="text-xs font-medium uppercase tracking-wider text-(--text-muted)">
					Question {currentIndex + 1} of {questions.length}
				</span>
				<ScoreBadge earned={earned} max={max} score={score} />
			</div>
			<ProgressDots
				total={questions.length}
				currentIndex={currentIndex}
				questionIds={questionIds}
				results={results}
			/>
		</div>
	);
}
