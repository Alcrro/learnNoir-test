import { BookOpen, Clock, RotateCcw, Trophy } from "lucide-react";
import { cn } from "../../../../../../libs/utils/cn";
import { DifficultyBadge } from "../atoms/DifficultyBadge";
import { countByDifficulty, maxPoints } from "../lib/quizScoring";
import { DIFFICULTY_WEIGHT } from "../lib/quizTypes";
import type { Difficulty, QuizSummaryItem } from "../lib/quizTypes";

const DIFFICULTY_ORDER: Difficulty[] = ["beginner", "intermediate", "expert"];

type Props = {
	quiz: QuizSummaryItem;
	onStart: () => void;
};

export function QuizPreviewPanel({ quiz, onStart }: Props) {
	const hasFullData = !!quiz.quiz;
	const isCompleted = quiz.status === "completed";
	const hasScore = quiz.score !== undefined && quiz.score > 0;
	const counts = hasFullData ? countByDifficulty(quiz.quiz!.questions) : null;
	const totalMax = hasFullData ? maxPoints(quiz.quiz!.questions) : quiz.maxPoints;

	return (
		<div className="flex flex-col gap-5 p-6 md:p-8">
			{/* Title */}
			<div>
				<h2 className="text-xl font-bold leading-snug text-(--text-primary)">
					{quiz.title}
				</h2>
				{quiz.description && (
					<p className="mt-1 text-sm leading-relaxed text-(--text-muted)">
						{quiz.description}
					</p>
				)}
			</div>

			{/* Stats */}
			<div className="flex items-center gap-5 text-sm text-(--text-muted)">
				<span className="flex items-center gap-1.5">
					<BookOpen className="h-3.5 w-3.5" />
					{quiz.questionCount} întrebări
				</span>
				<span className="flex items-center gap-1.5">
					<Clock className="h-3.5 w-3.5" />
					~{quiz.estimatedMinutes} min
				</span>
				<span className="flex items-center gap-1.5">
					<Trophy className="h-3.5 w-3.5" />
					{totalMax} pts max
				</span>
			</div>

			{/* Difficulty breakdown */}
			{counts && (
				<div className="divide-y divide-(--border) rounded-xl border border-(--border) overflow-hidden">
					{DIFFICULTY_ORDER.filter((d) => counts[d] > 0).map((d) => (
						<div
							key={d}
							className="flex items-center justify-between px-4 py-3"
						>
							<div className="flex items-center gap-2">
								<DifficultyBadge difficulty={d} />
								<span className="text-xs text-(--text-muted)">
									×{DIFFICULTY_WEIGHT[d]} pts
								</span>
							</div>
							<span className="text-xs text-(--text-secondary)">
								{counts[d]} {counts[d] === 1 ? "întrebare" : "întrebări"}
							</span>
						</div>
					))}
				</div>
			)}

			{/* Real score from DB */}
			{hasScore && (
				<div className="flex items-center justify-between rounded-xl border border-(--border) bg-(--surface) px-4 py-3.5">
					<div>
						<p className="text-xs text-(--text-muted)">Scorul tău</p>
						<p
							className={cn(
								"mt-0.5 text-2xl font-bold tabular-nums",
								quiz.score! >= 70 ? "text-emerald-400" : "text-amber-400",
							)}
						>
							{quiz.score}%
						</p>
					</div>
					<span
						className={cn(
							"rounded-full px-2.5 py-1 text-xs font-medium",
							quiz.score! >= 70
								? "bg-emerald-500/10 text-emerald-400"
								: "bg-amber-500/10 text-amber-400",
						)}
					>
						{quiz.score! >= 70 ? "Promovat" : "Sub limită"}
					</span>
				</div>
			)}

			{/* CTA */}
			{!hasFullData ? (
				<p className="rounded-xl border border-(--border) px-4 py-3 text-sm text-(--text-muted)">
					Conținut quiz în curând
				</p>
			) : (
				<button
					onClick={onStart}
					className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-500 transition-colors"
				>
					{isCompleted ? (
						<>
							<RotateCcw className="h-4 w-4" />
							Încearcă din nou
						</>
					) : (
						"Începe Quiz-ul →"
					)}
				</button>
			)}
		</div>
	);
}
