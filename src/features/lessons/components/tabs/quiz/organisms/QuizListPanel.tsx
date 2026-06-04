import { BookOpen, Clock, RotateCcw } from "lucide-react";
import { cn } from "../../../../../../libs/utils/cn";
import { DifficultyBadge } from "../atoms/DifficultyBadge";
import { QuizProgressBar } from "../atoms/QuizProgressBar";
import { QuizStatusIcon } from "../atoms/QuizStatusIcon";
import { PaywallBanner } from "../../../../../../features/subscriptions/components/molecules/PaywallBanner";
import { useIsPro } from "../../../../../../features/subscriptions/hooks/useIsPro";
import type { QuizSummaryItem } from "../lib/quizTypes";

type QuizCardProps = {
	quiz: QuizSummaryItem;
	isSelected: boolean;
	onSelect: () => void;
};

function QuizCard({ quiz, isSelected, onSelect }: QuizCardProps) {
	const isLocked = quiz.status === "locked";
	const isCompleted = quiz.status === "completed";

	return (
		<div
			onClick={isLocked ? undefined : onSelect}
			className={cn(
				"relative cursor-pointer rounded-lg border p-3 transition-all",
				isSelected
					? "border-(--border-strong) bg-(--surface)"
					: "border-(--border) hover:border-(--border-strong) hover:bg-(--hover)",
				isLocked && "cursor-not-allowed opacity-40",
			)}
		>
			{isSelected && (
				<span className="absolute left-0 top-4 h-6 w-0.5 rounded-r-full bg-sky-400" />
			)}

			{/* Title row */}
			<div className="flex items-start justify-between gap-2">
				<div className="flex items-start gap-2 min-w-0">
					<QuizStatusIcon status={quiz.status} className="mt-0.5 h-3.5 w-3.5 shrink-0" />
					<p
						className={cn(
							"line-clamp-2 text-xs font-medium leading-snug",
							isSelected ? "text-(--text-primary)" : "text-(--text-secondary)",
						)}
					>
						{quiz.title}
					</p>
				</div>
				<DifficultyBadge difficulty={quiz.primaryDifficulty} />
			</div>

			{/* Metadata row */}
			<div className="mt-2 flex items-center gap-2 pl-5 text-[10px] text-(--text-muted)">
				<span className="flex items-center gap-1">
					<BookOpen className="h-2.5 w-2.5" />
					{quiz.questionCount}q
				</span>
				<span className="opacity-40">·</span>
				<span>{quiz.maxPoints} pts</span>
				<span className="opacity-40">·</span>
				<span className="flex items-center gap-1">
					<Clock className="h-2.5 w-2.5" />~{quiz.estimatedMinutes}min
				</span>
			</div>

			{/* Progress bar */}
			{quiz.score !== undefined && (
				<div className="mt-2 pl-5">
					<QuizProgressBar score={quiz.score} />
				</div>
			)}

			{/* CTA */}
			{!isLocked && (
				<div className="mt-3 pl-5">
					<button
						onClick={(e) => {
							e.stopPropagation();
							onSelect();
						}}
						className={cn(
							"flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[11px] font-medium transition",
							isSelected
								? "border-sky-400/40 bg-sky-400/10 text-sky-400 hover:bg-sky-400/20"
								: "border-(--border) text-(--text-secondary) hover:border-(--border-strong) hover:text-(--text-primary)",
						)}
					>
						{isCompleted ? (
							<>
								<RotateCcw className="h-3 w-3" />
								Retry
							</>
						) : (
							"Start Quiz"
						)}
					</button>
				</div>
			)}
		</div>
	);
}

type Props = {
	quizzes: QuizSummaryItem[];
	selectedId: string | null;
	onSelect: (id: string) => void;
};

export function QuizListPanel({ quizzes, selectedId, onSelect }: Props) {
	const isPro = useIsPro();
	const availableCount = quizzes.filter((q) => q.status !== "locked").length;
	const completedCount = quizzes.filter((q) => q.status === "completed").length;

	return (
		<aside className="flex h-full w-full flex-col border-r border-(--border)">
			<div className="border-b border-(--border) px-4 py-3.5">
				<h2 className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
					Quizuri
				</h2>
				<p className="mt-0.5 text-[10px] text-(--text-muted)">
					{availableCount} disponibile &middot; {completedCount} completate
				</p>
			</div>

			<div className="flex-1 overflow-y-auto p-3 space-y-2">
				{quizzes.map((quiz) => (
					<QuizCard
						key={quiz.id}
						quiz={quiz}
						isSelected={selectedId === quiz.id}
						onSelect={() => onSelect(quiz.id)}
					/>
				))}

				{quizzes.length === 0 && (
					<div className="flex flex-col items-center justify-center gap-2 py-12 text-(--text-muted)">
						<BookOpen className="h-6 w-6 opacity-20" />
						<p className="text-xs">Niciun quiz disponibil</p>
					</div>
				)}

				{!isPro && quizzes.length > 0 && (
					<PaywallBanner
						label="Deblochează toate quizurile cu Pro"
						className="mt-1"
					/>
				)}
			</div>
		</aside>
	);
}
