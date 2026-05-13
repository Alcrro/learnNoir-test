import { X, Star, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";
import { useLessonAIStore } from "../../store/useLessonAIStore";

const ClarityBar = ({ score }: { score: number }) => (
	<div className="flex items-center gap-2">
		<div className="flex gap-0.5">
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={`h-4 w-4 ${i < score ? "fill-(--accent) text-(--accent)" : "text-(--border)"}`}
				/>
			))}
		</div>
		<span className="text-xs text-(--text-muted)">{score}/5</span>
	</div>
);

export const AIReviewPanel = () => {
	const result = useLessonAIStore((s) => s.reviewState.data);
	const clearReview = useLessonAIStore((s) => s.clearReview);

	if (!result) return null;

	return (
		<div className="fixed right-0 top-0 h-full w-80 z-50 border-l border-(--border) bg-(--bg-surface) shadow-xl flex flex-col">
			<div className="flex items-center justify-between border-b border-(--border) px-4 py-3">
				<span className="text-sm font-semibold text-(--text-primary)">AI Review</span>
				<button
					type="button"
					onClick={clearReview}
					className="rounded-md p-1 text-(--text-muted) hover:text-(--text-primary) transition-colors"
				>
					<X className="h-4 w-4" />
				</button>
			</div>

			<div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-5">
				<div className="flex flex-col gap-1.5">
					<span className="text-xs font-medium text-(--text-secondary) uppercase tracking-wide">
						Clarity
					</span>
					<ClarityBar score={result.clarity} />
				</div>

				<div className="flex flex-col gap-1.5">
					<div className="flex items-center gap-1.5">
						<CheckCircle2 className="h-3.5 w-3.5 text-(--accent)" />
						<span className="text-xs font-medium text-(--text-secondary) uppercase tracking-wide">
							Accuracy
						</span>
					</div>
					<p className="text-sm text-(--text-primary) leading-relaxed">{result.accuracy}</p>
				</div>

				<div className="flex flex-col gap-1.5">
					<div className="flex items-center gap-1.5">
						<AlertCircle className="h-3.5 w-3.5 text-(--warning, amber)" />
						<span className="text-xs font-medium text-(--text-secondary) uppercase tracking-wide">
							Completeness
						</span>
					</div>
					<p className="text-sm text-(--text-primary) leading-relaxed">{result.completeness}</p>
				</div>

				{result.suggestions.length > 0 && (
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-1.5">
							<Lightbulb className="h-3.5 w-3.5 text-amber-500" />
							<span className="text-xs font-medium text-(--text-secondary) uppercase tracking-wide">
								Suggestions
							</span>
						</div>
						<ul className="flex flex-col gap-2">
							{result.suggestions.map((s, i) => (
								<li
									key={i}
									className="flex gap-2 text-sm text-(--text-primary) leading-relaxed"
								>
									<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)" />
									{s}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};
