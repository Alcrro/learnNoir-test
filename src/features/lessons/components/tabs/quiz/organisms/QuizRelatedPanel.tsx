import { ArrowRight, CheckCircle, Circle } from "lucide-react";
import { cn } from "../../../../../../libs/utils/cn";
import { getQuizRelatedContent } from "../lib/relatedLessonsMock";

type Props = { quizId: string };

export function QuizRelatedPanel({ quizId }: Props) {
	const { prerequisites, relatedLessons } = getQuizRelatedContent(quizId);

	return (
		<aside className="flex h-full w-full flex-col border-l border-(--border)">
			<div className="border-b border-(--border) px-4 py-3.5">
				<h2 className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
					Materiale
				</h2>
				<p className="mt-0.5 text-[10px] text-(--text-muted)">
					Resurse utile pentru acest quiz
				</p>
			</div>

			<div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
				{/* Prerequisites */}
				<section>
					<p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-(--text-muted)">
						Trebuie să știi
					</p>
					<div className="space-y-1">
						{prerequisites.map((p) => (
							<div
								key={p.name}
								className="flex items-center gap-2 rounded-md px-2 py-1.5"
							>
								{p.status === "done" ? (
									<CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
								) : (
									<Circle className="h-3.5 w-3.5 shrink-0 text-(--text-muted) opacity-40" />
								)}
								<span
									className={cn(
										"text-xs",
										p.status === "done"
											? "text-(--text-secondary)"
											: "text-(--text-muted)",
									)}
								>
									{p.name}
								</span>
							</div>
						))}
					</div>
				</section>

				{/* Related lessons */}
				{relatedLessons.length > 0 && (
					<section>
						<p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-(--text-muted)">
							Lecții conexe
						</p>
						<div className="space-y-1">
							{relatedLessons.map((lesson) => (
								<div
									key={lesson.title}
									className="group flex items-start gap-2 rounded-md border border-transparent px-2 py-2 transition hover:border-(--border) hover:bg-(--hover)"
								>
									<div className="min-w-0 flex-1">
										<p className="text-xs font-medium text-(--text-secondary) group-hover:text-(--text-primary) transition-colors">
											{lesson.title}
										</p>
										<p className="mt-0.5 text-[10px] leading-snug text-(--text-muted)">
											{lesson.why}
										</p>
									</div>
									<ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-(--text-muted) opacity-0 transition-opacity group-hover:opacity-100" />
								</div>
							))}
						</div>
					</section>
				)}
			</div>
		</aside>
	);
}
