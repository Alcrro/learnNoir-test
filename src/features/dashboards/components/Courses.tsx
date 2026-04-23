import { BookOpen, TriangleAlert } from "lucide-react";
import {
	DashboardBadge,
	DashboardPanel,
	DashboardProgressBar,
	DashboardSectionHeading,
	DashboardStatCard,
} from "./DashboardUI";
import { useDashboardContext } from "../lib/dashboardContext";

const Courses = () => {
	const { previewRole, workspace } = useDashboardContext();
	const averageCompletion = Math.round(
		workspace.courses.reduce((sum, course) => sum + course.completion, 0) /
			workspace.courses.length,
	);
	const totalAtRisk = workspace.courses.reduce(
		(sum, course) => sum + course.atRisk,
		0,
	);

	return (
		<div className="space-y-4">
			<DashboardPanel>
				<DashboardSectionHeading
					eyebrow="Courses"
					title={
						previewRole === "teacher"
							? "Track each cohort as a living product line"
							: "Every course stays transparent from first lesson to next milestone"
					}
					description="Course cards expose completion, risk and upcoming milestones without extra clicks."
				/>
			</DashboardPanel>

			<div className="grid gap-4 md:grid-cols-3">
				<DashboardStatCard
					label="Active tracks"
					value={`${workspace.courses.length}`}
					helper="Courses currently visible inside the dashboard"
					trend={previewRole === "teacher" ? "Across your cohorts" : "Across your current schedule"}
					icon={BookOpen}
					tone="blue"
				/>
				<DashboardStatCard
					label="Average completion"
					value={`${averageCompletion}%`}
					helper="How far the visible course set has moved"
					trend={previewRole === "teacher" ? "Operational pacing signal" : "Your blended progress"}
					icon={BookOpen}
					tone="teal"
				/>
				<DashboardStatCard
					label={previewRole === "teacher" ? "Students at risk" : "Pending blockers"}
					value={`${totalAtRisk}`}
					helper={
						previewRole === "teacher"
							? "Learners who need follow-up before the next checkpoint"
							: "Modules where you still need to close the gap"
					}
					trend="Review inside the course cards below"
					icon={TriangleAlert}
					tone="amber"
				/>
			</div>

			<div className="grid gap-4 xl:grid-cols-2">
				{workspace.courses.map((course) => (
					<DashboardPanel
						key={course.id}
						className="h-full"
					>
						<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
									{previewRole === "teacher" ? "Course" : "Learning track"}
								</p>
								<h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--text-primary)]">
									{course.title}
								</h3>
								<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
									{course.summary}
								</p>
							</div>
							<DashboardBadge
								label={course.nextMilestone}
								tone="blue"
								className="max-w-[15rem] justify-center text-center"
							/>
						</div>

						<div className="mt-6 grid gap-3 sm:grid-cols-3">
							<div className="rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4">
								<p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
									{previewRole === "teacher" ? "Students" : "Seat"}
								</p>
								<p className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
									{course.students}
								</p>
							</div>
							<div className="rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4">
								<p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
									Completion
								</p>
								<p className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
									{course.completion}%
								</p>
							</div>
							<div className="rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4">
								<p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
									{previewRole === "teacher" ? "At risk" : "Blocked"}
								</p>
								<p className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
									{course.atRisk}
								</p>
							</div>
						</div>

						<div className="mt-6">
							<div className="mb-2 flex items-center justify-between text-xs text-[var(--text-secondary)]">
								<span>Course progress</span>
								<span>{course.completion}%</span>
							</div>
							<DashboardProgressBar
								value={course.completion}
								tone={course.atRisk > 0 ? "amber" : "teal"}
							/>
						</div>

						<div className="mt-6 flex flex-col gap-2 rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<p className="text-sm font-semibold text-[var(--text-primary)]">
									Next milestone
								</p>
								<p className="mt-1 text-sm text-[var(--text-secondary)]">
									{course.nextMilestone}
								</p>
							</div>
							<p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
								{course.updatedAt}
							</p>
						</div>
					</DashboardPanel>
				))}
			</div>
		</div>
	);
};

export default Courses;
