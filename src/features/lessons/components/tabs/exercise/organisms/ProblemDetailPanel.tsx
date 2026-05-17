import { cn } from "../../../../../../libs/utils/cn";
import { HintItem } from "../molecules/HintItem";
import type { Exercise } from "../lib/exerciseTypes";

const DIFFICULTY_COLOR: Record<Exercise["difficulty"], string> = {
	easy: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
	medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
	hard: "text-red-400 bg-red-400/10 border-red-400/20",
};

const DIFFICULTY_LABEL: Record<Exercise["difficulty"], string> = {
	easy: "Ușor",
	medium: "Mediu",
	hard: "Greu",
};

type Props = {
	exercise: Exercise;
	revealedHints: number[];
	onRevealHint: (index: number) => void;
};

export function ProblemDetailPanel({ exercise, revealedHints, onRevealHint }: Props) {
	return (
		<div className="h-full overflow-y-auto px-5 py-4 space-y-5 text-sm">
			{/* Header */}
			<div>
				<div className="flex items-center gap-3 mb-1.5">
					<h2 className="text-base font-semibold text-(--text-primary)">
						{exercise.position}. {exercise.title}
					</h2>
					<span
						className={cn(
							"rounded-full border px-2 py-0.5 text-[11px] font-medium",
							DIFFICULTY_COLOR[exercise.difficulty],
						)}
					>
						{DIFFICULTY_LABEL[exercise.difficulty]}
					</span>
				</div>
				{exercise.tags.length > 0 && (
					<div className="flex flex-wrap gap-1.5">
						{exercise.tags.map((tag) => (
							<span
								key={tag}
								className="rounded-md border border-(--border) bg-(--surface) px-2 py-0.5 text-[10px] text-(--text-muted)"
							>
								{tag}
							</span>
						))}
					</div>
				)}
			</div>

			{/* Description */}
			<div className="text-(--text-secondary) leading-relaxed whitespace-pre-wrap">
				{exercise.description}
			</div>

			{/* Examples */}
			{exercise.examples.length > 0 && (
				<div className="space-y-3">
					{exercise.examples.map((ex, i) => (
						<div key={i} className="rounded-lg border border-(--border) overflow-hidden">
							<div className="bg-(--surface) px-3 py-1.5 text-[11px] font-semibold text-(--text-muted) uppercase tracking-wider">
								Exemplu {i + 1}
							</div>
							<div className="px-3 py-2.5 font-mono text-xs space-y-1.5">
								<div>
									<span className="text-(--text-muted)">Input: </span>
									<span className="text-(--text-primary)">{ex.input}</span>
								</div>
								<div>
									<span className="text-(--text-muted)">Output: </span>
									<span className="text-(--text-primary)">{ex.output}</span>
								</div>
								{ex.explanation && (
									<div className="mt-1 text-(--text-secondary) font-sans leading-relaxed">
										<span className="text-(--text-muted)">Explicație: </span>
										{ex.explanation}
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			)}

			{/* Constraints */}
			{exercise.constraints.length > 0 && (
				<div>
					<h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-(--text-muted)">
						Constrângeri
					</h3>
					<ul className="space-y-1">
						{exercise.constraints.map((c, i) => (
							<li key={i} className="flex items-start gap-2 text-xs text-(--text-secondary)">
								<span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-(--text-muted)" />
								{c}
							</li>
						))}
					</ul>
				</div>
			)}

			{/* Hints */}
			{exercise.hints.length > 0 && (
				<div>
					<h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-(--text-muted)">
						Hints
					</h3>
					<div className="space-y-2">
						{exercise.hints.map((hint, i) => (
							<HintItem
								key={i}
								index={i}
								text={hint}
								revealed={revealedHints.includes(i)}
								onReveal={() => onRevealHint(i)}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
