import type { DashboardLesson } from "../../data/dashboardData";
import { getStatusTone } from "../../data/dashboardData";
import { DashboardBadge, DashboardPanel, DashboardProgressBar } from "../DashboardUI";

type Props = { lesson: DashboardLesson };

export function LessonDashboardCard({ lesson }: Props) {
	return (
		<DashboardPanel className="h-full">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--text-muted)">
						{lesson.course}
					</p>
					<h3 className="mt-2 text-xl font-semibold tracking-tight text-(--text-primary)">
						{lesson.title}
					</h3>
					<p className="mt-2 text-sm leading-6 text-(--text-secondary)">{lesson.objective}</p>
				</div>
				<DashboardBadge label={lesson.status} tone={getStatusTone(lesson.status)} />
			</div>

			<div className="mt-6 grid gap-3 sm:grid-cols-3">
				{(
					[
						{ label: "Starts", value: lesson.startsAt },
						{ label: "Duration", value: lesson.duration },
						{ label: "Template", value: `${lesson.completion}%` },
					] as const
				).map(({ label, value }) => (
					<div key={label} className="rounded-2xl border border-(--border) bg-(--bg-secondary) p-4">
						<p className="text-xs uppercase tracking-[0.16em] text-(--text-muted)">{label}</p>
						<p className="mt-2 text-sm font-semibold text-(--text-primary)">{value}</p>
					</div>
				))}
			</div>

			<div className="mt-6">
				<div className="mb-2 flex items-center justify-between text-xs text-(--text-secondary)">
					<span>Lesson preparation</span>
					<span>{lesson.completion}%</span>
				</div>
				<DashboardProgressBar value={lesson.completion} tone={getStatusTone(lesson.status)} />
			</div>

			<div className="mt-6 rounded-2xl border border-(--border) bg-(--bg-secondary) p-4">
				<p className="text-sm font-semibold text-(--text-primary)">Checkpoint</p>
				<p className="mt-2 text-sm leading-6 text-(--text-secondary)">{lesson.checkpoint}</p>
			</div>
		</DashboardPanel>
	);
}
