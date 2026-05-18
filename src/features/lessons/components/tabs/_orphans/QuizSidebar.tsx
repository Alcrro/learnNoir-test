import { BookOpen } from "lucide-react";
import { cn } from "../../../../../../libs/utils/cn";
import { QuizStatusIcon } from "../atoms/QuizStatusIcon";
import type { Difficulty, QuizSummaryItem } from "../lib/quizTypes";

const DIFFICULTY_ORDER: Difficulty[] = ["beginner", "intermediate", "expert"];

const SECTION_LABEL: Record<Difficulty, string> = {
	beginner: "Beginner",
	intermediate: "Intermediate",
	expert: "Expert",
};

type SidebarItemProps = {
	quiz: QuizSummaryItem;
	isSelected: boolean;
	onSelect: () => void;
};

function SidebarItem({ quiz, isSelected, onSelect }: SidebarItemProps) {
	const isLocked = quiz.status === "locked";

	return (
		<button
			onClick={isLocked ? undefined : onSelect}
			disabled={isLocked}
			className={cn(
				"group relative w-full rounded-md border px-3 py-2.5 text-left transition-all",
				isSelected
					? "border-(--border-strong) bg-(--surface)"
					: "border-transparent hover:border-(--border) hover:bg-(--hover)",
				isLocked && "cursor-not-allowed opacity-40",
			)}
		>
			{isSelected && (
				<span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-sky-400" />
			)}

			<div className="flex items-start gap-2.5">
				<div className="mt-0.5">
					<QuizStatusIcon status={quiz.status} />
				</div>
				<div className="min-w-0 flex-1">
					<p
						className={cn(
							"truncate text-xs font-medium leading-snug",
							isSelected ? "text-(--text-primary)" : "text-(--text-secondary)",
						)}
					>
						{quiz.title}
					</p>
					<div className="mt-1 flex items-center gap-1.5 text-[10px] text-(--text-muted)">
						<span className="flex items-center gap-1">
							<BookOpen className="h-2.5 w-2.5" />
							{quiz.questionCount}q
						</span>
						<span className="opacity-40">·</span>
						<span>{quiz.maxPoints} pts</span>
						{quiz.score !== undefined && (
							<>
								<span className="opacity-40">·</span>
								<span
									className={cn(
										"font-semibold",
										quiz.score >= 70 ? "text-emerald-400" : "text-amber-400",
									)}
								>
									{quiz.score}%
								</span>
							</>
						)}
					</div>
				</div>
			</div>
		</button>
	);
}

type Props = {
	quizzes: QuizSummaryItem[];
	selectedId: string | null;
	onSelect: (id: string) => void;
};

export function QuizSidebar({ quizzes, selectedId, onSelect }: Props) {
	const availableCount = quizzes.filter((q) => q.status !== "locked").length;
	const completedCount = quizzes.filter((q) => q.status === "completed").length;

	const grouped = DIFFICULTY_ORDER.reduce<Record<Difficulty, QuizSummaryItem[]>>(
		(acc, d) => {
			acc[d] = quizzes.filter((q) => q.primaryDifficulty === d);
			return acc;
		},
		{ beginner: [], intermediate: [], expert: [] },
	);

	return (
		<aside className="flex h-full w-[272px] shrink-0 flex-col border-r border-(--border)">
			<div className="border-b border-(--border) px-4 py-3.5">
				<h2 className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
					Quiz Library
				</h2>
				<p className="mt-0.5 text-[10px] text-(--text-muted)">
					{availableCount} available &middot; {completedCount} completed
				</p>
			</div>

			<div className="flex-1 overflow-y-auto px-2 py-3">
				{DIFFICULTY_ORDER.map((difficulty) => {
					const items = grouped[difficulty];
					if (items.length === 0) return null;

					return (
						<div key={difficulty} className="mb-5">
							<div className="mb-1.5 flex items-center gap-2 px-1.5">
								<span className="text-[10px] font-semibold uppercase tracking-wider text-(--text-muted)">
									{SECTION_LABEL[difficulty]}
								</span>
								<span className="h-px flex-1 bg-(--border)" />
								<span className="text-[10px] tabular-nums text-(--text-muted)">
									{items.length}
								</span>
							</div>
							<div className="space-y-0.5">
								{items.map((quiz) => (
									<SidebarItem
										key={quiz.id}
										quiz={quiz}
										isSelected={selectedId === quiz.id}
										onSelect={() => onSelect(quiz.id)}
									/>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</aside>
	);
}
