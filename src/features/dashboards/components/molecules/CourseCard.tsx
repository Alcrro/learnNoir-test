import type { DashboardCourse, WorkspaceRole } from "../../data/dashboardData";
import { DashboardBadge, DashboardPanel, DashboardProgressBar } from "../DashboardUI";
import { CourseStatCell } from "../atoms/CourseStatCell";

type Props = {
	course: DashboardCourse;
	role: WorkspaceRole;
};

export function CourseCard({ course, role }: Props) {
	const isTeacher = role === "teacher";

	return (
		<DashboardPanel className="h-full">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
						{isTeacher ? "Course" : "Learning track"}
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
				<CourseStatCell label={isTeacher ? "Students" : "Seat"} value={course.students} />
				<CourseStatCell label="Completion" value={`${course.completion}%`} />
				<CourseStatCell label={isTeacher ? "At risk" : "Blocked"} value={course.atRisk} />
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
					<p className="text-sm font-semibold text-[var(--text-primary)]">Next milestone</p>
					<p className="mt-1 text-sm text-[var(--text-secondary)]">{course.nextMilestone}</p>
				</div>
				<p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
					{course.updatedAt}
				</p>
			</div>
		</DashboardPanel>
	);
}
