import { cn } from "../../../../../../../libs/utils/cn";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { DifficultyBadge } from "../atoms/DifficultyBadge";
import { DIFFICULTY_WEIGHT } from "../../lib/quizTypes";
import type { QuizQuestion, Difficulty } from "../../lib/quizTypes";
import type { QuestionResult } from "../../hooks/useQuizSession";

const DIFFICULTY_ORDER: Difficulty[] = ["beginner", "intermediate", "expert"];

type ByDifficulty = Record<Difficulty, { correct: number; total: number; pts: number; maxPts: number }>;

function buildBreakdown(
	questions: QuizQuestion[],
	results: Record<string, QuestionResult>,
): ByDifficulty {
	const acc: ByDifficulty = {
		beginner: { correct: 0, total: 0, pts: 0, maxPts: 0 },
		intermediate: { correct: 0, total: 0, pts: 0, maxPts: 0 },
		expert: { correct: 0, total: 0, pts: 0, maxPts: 0 },
	};
	for (const q of questions) {
		const row = acc[q.difficulty];
		const weight = DIFFICULTY_WEIGHT[q.difficulty];
		row.total += 1;
		row.maxPts += weight;
		if (results[q.id]?.isCorrect) {
			row.correct += 1;
			row.pts += weight;
		}
	}
	return acc;
}

function scoreLabel(score: number): string {
	if (score >= 90) return "Excellent!";
	if (score >= 70) return "Well done!";
	if (score >= 50) return "Keep practicing";
	return "Needs more study";
}

type Props = {
	questions: QuizQuestion[];
	results: Record<string, QuestionResult>;
	score: number;
	onRestart: () => void;
};

export function QuizSummary({ questions, results, score, onRestart }: Props) {
	const breakdown = buildBreakdown(questions, results);

	return (
		<div className="space-y-6">
			{/* Score ring */}
			<div className="flex flex-col items-center gap-2 pt-2">
				<div
					className={cn(
						"flex h-28 w-28 items-center justify-center rounded-full border-4 text-4xl font-bold tabular-nums",
						score >= 70
							? "border-emerald-500 text-emerald-400"
							: score >= 50
								? "border-amber-400 text-amber-400"
								: "border-red-400 text-red-400",
					)}
				>
					{score}%
				</div>
				<p
					className={cn(
						"text-sm font-medium",
						score >= 70 ? "text-emerald-400" : "text-(--text-muted)",
					)}
				>
					{scoreLabel(score)}
				</p>
			</div>

			{/* Difficulty breakdown */}
			<div className="divide-y divide-(--border) rounded-xl border border-(--border)">
				{DIFFICULTY_ORDER.filter((d) => breakdown[d].total > 0).map((d) => {
					const row = breakdown[d];
					return (
						<div key={d} className="flex items-center justify-between px-4 py-3">
							<DifficultyBadge difficulty={d} showWeight />
							<div className="flex items-center gap-4 text-xs text-(--text-muted)">
								<span>
									{row.correct}/{row.total} correct
								</span>
								<span className="font-mono text-(--text-secondary)">
									{row.pts}/{row.maxPts} pts
								</span>
							</div>
						</div>
					);
				})}
			</div>

			{/* Per-question list */}
			<div className="space-y-2">
				<p className="text-xs font-medium uppercase tracking-wider text-(--text-muted)">
					Question breakdown
				</p>
				{questions.map((q) => {
					const r = results[q.id];
					const correct = r?.isCorrect === true;
					const wrong = r?.locked && !correct;
					return (
						<div
							key={q.id}
							className="flex items-start gap-3 rounded-lg border border-(--border) px-4 py-3"
						>
							<span className="mt-0.5 shrink-0">
								{correct ? (
									<CheckCircle className="h-4 w-4 text-emerald-500" />
								) : wrong ? (
									<XCircle className="h-4 w-4 text-red-400" />
								) : (
									<span className="block h-4 w-4 rounded-full border-2 border-(--border)" />
								)}
							</span>
							<p className="flex-1 line-clamp-2 text-sm text-(--text-secondary)">
								{q.type === "drag-drop"
									? q.sentence.replace(/\[blank\]/g, "___")
									: q.question}
							</p>
							<DifficultyBadge difficulty={q.difficulty} />
						</div>
					);
				})}
			</div>

			{/* Actions */}
			<div className="flex justify-center pb-2">
				<button
					onClick={onRestart}
					className="flex items-center gap-2 rounded-lg border border-(--border) px-5 py-2.5 text-sm text-(--text-secondary) transition hover:border-(--border-strong) hover:text-(--text-primary)"
				>
					<RotateCcw className="h-4 w-4" />
					Retake Quiz
				</button>
			</div>
		</div>
	);
}
