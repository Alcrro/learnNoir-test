import { CheckCircle2, Circle, Minus } from "lucide-react";
import { cn } from "../../../../libs/utils/cn";
import type { MyLessonProgress } from "../../../lessons/api/progressApi";
import { DashboardPanel, DashboardProgressBar, DashboardSectionHeading } from "../DashboardUI";

type Props = {
	rows: MyLessonProgress[];
};

function scoreToGrade(score: number): string {
	return (score / 10).toFixed(1);
}

function scoreTone(score: number): "teal" | "blue" | "amber" | "rose" {
	if (score >= 90) return "teal";
	if (score >= 75) return "blue";
	if (score >= 50) return "amber";
	return "rose";
}

function gradeToneClass(score: number): string {
	if (score >= 90) return "text-[var(--teal-text)]";
	if (score >= 75) return "text-[var(--blue-text)]";
	if (score >= 50) return "text-[var(--amber-text)]";
	return "text-[var(--text-muted)]";
}

function TheoryReadIcon({ readScore }: { readScore: number }) {
	return readScore > 0 ? (
		<CheckCircle2 className="mx-auto h-4 w-4 text-[var(--teal-text)]" />
	) : (
		<Circle className="mx-auto h-4 w-4 text-[var(--text-muted)]" />
	);
}

function ScoreCell({ score }: { score: number }) {
	if (score === 0) return <Minus className="mx-auto h-3.5 w-3.5 text-[var(--text-muted)]" />;
	const tone = scoreTone(score);
	return (
		<span
			className={cn(
				"inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums",
				tone === "teal" && "bg-[var(--teal-bg)] text-[var(--teal-text)]",
				tone === "blue" && "bg-[var(--blue-bg)] text-[var(--blue-text)]",
				tone === "amber" && "bg-[var(--amber-bg)] text-[var(--amber-text)]",
				tone === "rose" &&
					"bg-[color:rgba(244,63,94,0.12)] text-[color:rgb(225,29,72)] dark:text-[color:rgb(251,113,133)]",
			)}
		>
			{score}%
		</span>
	);
}

const statusLabel: Record<string, string> = {
	not_started: "Neînceput",
	in_progress: "În progres",
	completed: "Finalizat",
};

export default function StudentLessonProgressTable({ rows }: Props) {
	if (!rows.length)
		return (
			<DashboardPanel>
				<DashboardSectionHeading
					eyebrow="Progresul tău"
					title="Lecții începute"
					description="Nu ai început nicio lecție încă. Navighează la o lecție pentru a începe."
				/>
			</DashboardPanel>
		);

	return (
		<DashboardPanel>
			<DashboardSectionHeading
				eyebrow="Progresul tău"
				title="Lecții începute"
				description="Urmărește cât ai parcurs din fiecare lecție: teorie, quiz-uri, exerciții și scorul total calculat de sistem."
			/>

			<div className="mt-5 overflow-x-auto">
				<table className="w-full min-w-[620px] text-sm">
					<thead>
						<tr className="border-b border-[var(--border)]">
							{(
								[
									{ label: "Lecție", align: "left" as const, wide: false },
									{ label: "Status", align: "left" as const, wide: false },
									{ label: "Teorie citită", align: "center" as const, wide: false },
									{ label: "Quiz", align: "center" as const, wide: false },
									{ label: "Exerciții", align: "center" as const, wide: false },
									{ label: "Scor total", align: "left" as const, wide: true },
									{ label: "Notă", align: "center" as const, wide: false },
								]
							).map(({ label, align, wide }) => (
								<th
									key={label}
									className={cn(
										"pb-3 pt-1 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]",
										align === "center" && "text-center",
										align === "left" && "text-left",
										wide ? "w-40 pr-4" : "px-2",
										label === "Lecție" && "pl-0 pr-4",
									)}
								>
									{label}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="divide-y divide-[var(--border)]">
						{rows.map((row) => (
							<tr
								key={row.id}
								className="transition-colors hover:bg-[var(--bg-secondary)]"
							>
								<td className="py-3.5 pl-0 pr-4">
									<p className="font-medium text-[var(--text-primary)]">{row.lessonTitle}</p>
									<p className="mt-0.5 text-xs text-[var(--text-muted)]">{row.moduleName}</p>
								</td>
								<td className="px-2 py-3.5">
									<span className="text-xs text-[var(--text-secondary)]">
										{statusLabel[row.status] ?? row.status}
									</span>
								</td>
								<td className="px-2 py-3.5 text-center">
									<TheoryReadIcon readScore={row.readScore} />
								</td>
								<td className="px-2 py-3.5 text-center">
									<ScoreCell score={row.quizScore} />
								</td>
								<td className="px-2 py-3.5 text-center">
									<ScoreCell score={row.outputScore} />
								</td>
								<td className="py-3.5 pl-2 pr-4">
									<div className="flex items-center gap-2">
										<DashboardProgressBar
											value={row.weightedScore}
											tone={scoreTone(row.weightedScore)}
											className="flex-1"
										/>
										<span className="w-8 text-right text-xs font-semibold tabular-nums text-[var(--text-secondary)]">
											{row.weightedScore}%
										</span>
									</div>
								</td>
								<td className="px-2 py-3.5 text-center">
									<span
										className={cn(
											"text-base font-bold tabular-nums",
											gradeToneClass(row.weightedScore),
										)}
									>
										{scoreToGrade(row.weightedScore)}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<p className="mt-4 text-xs text-[var(--text-muted)]">
				Scorul total este calculat de sistem ca medie între teorie, quiz și exerciții. Nota pe scara 1–10.
			</p>
		</DashboardPanel>
	);
}
