import { CalendarClock, PencilRuler, PlayCircle } from "lucide-react";
import {
	DashboardBadge,
	DashboardPanel,
	DashboardProgressBar,
	DashboardSectionHeading,
} from "./DashboardUI";
import { getStatusTone } from "../data/dashboardData";
import { useDashboardContext } from "../lib/dashboardContext";

const Lessons = () => {
	const { previewRole, workspace } = useDashboardContext();
	const draftCount = workspace.lessons.filter((lesson) => lesson.status === "Draft").length;
	const liveCount = workspace.lessons.filter((lesson) => lesson.status === "Live").length;
	const scheduledCount = workspace.lessons.filter(
		(lesson) => lesson.status === "Scheduled",
	).length;

	return (
		<div className="space-y-4">
			<DashboardPanel>
				<DashboardSectionHeading
					eyebrow="Lessons"
					title={
						previewRole === "teacher"
							? "Build, review and deliver lessons with visible states"
							: "See every lesson state before you even enter the classroom"
					}
					description="A serious dashboard should know if a lesson is still draft, already scheduled, live or awaiting review."
				/>
			</DashboardPanel>

			<div className="grid gap-4 md:grid-cols-3">
				<div className="rounded-[28px] border border-[color:var(--border)] bg-[var(--bg-card)] p-5 shadow-sm">
					<div className="flex items-center gap-3">
						<div className="rounded-2xl bg-[var(--blue-bg)] p-3 text-[var(--blue-text)]">
							<PencilRuler className="h-5 w-5" />
						</div>
						<div>
							<p className="text-sm font-medium text-[var(--text-secondary)]">Drafts</p>
							<p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">
								{draftCount}
							</p>
						</div>
					</div>
				</div>
				<div className="rounded-[28px] border border-[color:var(--border)] bg-[var(--bg-card)] p-5 shadow-sm">
					<div className="flex items-center gap-3">
						<div className="rounded-2xl bg-[var(--teal-bg)] p-3 text-[var(--teal-text)]">
							<PlayCircle className="h-5 w-5" />
						</div>
						<div>
							<p className="text-sm font-medium text-[var(--text-secondary)]">Live now</p>
							<p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">
								{liveCount}
							</p>
						</div>
					</div>
				</div>
				<div className="rounded-[28px] border border-[color:var(--border)] bg-[var(--bg-card)] p-5 shadow-sm">
					<div className="flex items-center gap-3">
						<div className="rounded-2xl bg-[var(--amber-bg)] p-3 text-[var(--amber-text)]">
							<CalendarClock className="h-5 w-5" />
						</div>
						<div>
							<p className="text-sm font-medium text-[var(--text-secondary)]">
								Scheduled
							</p>
							<p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">
								{scheduledCount}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="grid gap-4 xl:grid-cols-2">
				{workspace.lessons.map((lesson) => (
					<DashboardPanel
						key={lesson.id}
						className="h-full"
					>
						<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
									{lesson.course}
								</p>
								<h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--text-primary)]">
									{lesson.title}
								</h3>
								<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
									{lesson.objective}
								</p>
							</div>
							<DashboardBadge
								label={lesson.status}
								tone={getStatusTone(lesson.status)}
							/>
						</div>

						<div className="mt-6 grid gap-3 sm:grid-cols-3">
							<div className="rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4">
								<p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
									Starts
								</p>
								<p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
									{lesson.startsAt}
								</p>
							</div>
							<div className="rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4">
								<p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
									Duration
								</p>
								<p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
									{lesson.duration}
								</p>
							</div>
							<div className="rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4">
								<p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
									Template
								</p>
								<p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
									{lesson.completion}%
								</p>
							</div>
						</div>

						<div className="mt-6">
							<div className="mb-2 flex items-center justify-between text-xs text-[var(--text-secondary)]">
								<span>Lesson preparation</span>
								<span>{lesson.completion}%</span>
							</div>
							<DashboardProgressBar
								value={lesson.completion}
								tone={getStatusTone(lesson.status)}
							/>
						</div>

						<div className="mt-6 rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4">
							<p className="text-sm font-semibold text-[var(--text-primary)]">
								Checkpoint
							</p>
							<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
								{lesson.checkpoint}
							</p>
						</div>
					</DashboardPanel>
				))}
			</div>
		</div>
	);
};

export default Lessons;
