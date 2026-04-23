import { GraduationCap, HeartPulse, Users } from "lucide-react";
import {
	DashboardBadge,
	DashboardPanel,
	DashboardProgressBar,
	DashboardSectionHeading,
	DashboardStatCard,
} from "./DashboardUI";
import { dashboardGradeFormula, getStatusTone } from "../data/dashboardData";
import { useDashboardContext } from "../lib/dashboardContext";

const Students = () => {
	const { previewRole, workspace } = useDashboardContext();
	const student = workspace.students[0];
	const averageGrade =
		workspace.students.reduce((sum, item) => sum + item.grade, 0) /
		workspace.students.length;
	const supportCount = workspace.students.filter(
		(item) => item.status === "Needs support",
	).length;

	return (
		<div className="space-y-4">
			<DashboardPanel>
				<DashboardSectionHeading
					eyebrow={previewRole === "teacher" ? "Student Matrix" : "Personal Progress"}
					title={
						previewRole === "teacher"
							? "Every student gets a visible lesson, pace and grade state"
							: "Your personal learning profile stays readable at a glance"
					}
					description="This is where the dashboard proves it can replace fragmented school workflows with one coherent view."
				/>
			</DashboardPanel>

			<div className="grid gap-4 md:grid-cols-3">
				<DashboardStatCard
					label={previewRole === "teacher" ? "Tracked students" : "Current grade"}
					value={previewRole === "teacher" ? `${workspace.students.length}` : `${student.grade}/10`}
					helper={
						previewRole === "teacher"
							? "Students with live progress signals"
							: "Weighted from progress, attendance and quizzes"
					}
					trend={
						previewRole === "teacher"
							? `${supportCount} need support`
							: `${student.progress}% current lesson completed`
					}
					icon={Users}
					tone="blue"
				/>
				<DashboardStatCard
					label={previewRole === "teacher" ? "Average grade" : "Attendance"}
					value={
						previewRole === "teacher"
							? `${averageGrade.toFixed(1)}/10`
							: `${student.attendance}%`
					}
					helper="Romanian grade scale displayed live"
					trend={
						previewRole === "teacher"
							? "Good predictor for intervention"
							: `${student.streak} study sessions streak`
					}
					icon={GraduationCap}
					tone="teal"
				/>
				<DashboardStatCard
					label={previewRole === "teacher" ? "Support load" : "Assignments pending"}
					value={
						previewRole === "teacher"
							? `${supportCount}`
							: `${student.assignmentsPending}`
					}
					helper="Operational burden visible before it becomes a problem"
					trend={previewRole === "teacher" ? "Review the table below" : student.nextSession}
					icon={HeartPulse}
					tone="amber"
				/>
			</div>

			<div className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
				<DashboardPanel>
					<DashboardSectionHeading
						eyebrow={previewRole === "teacher" ? "Roster" : "Your record"}
						title={
							previewRole === "teacher"
								? "Student-by-student operational overview"
								: "Your live academic profile"
						}
						description="The note should never be detached from progress and attendance."
					/>

					<div className="mt-6 overflow-x-auto">
						<table className="min-w-full border-separate border-spacing-y-3">
							<thead>
								<tr className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
									<th className="px-3">Student</th>
									<th className="px-3">Lesson</th>
									<th className="px-3">Progress</th>
									<th className="px-3">Attendance</th>
									<th className="px-3">Grade</th>
								</tr>
							</thead>
							<tbody>
								{workspace.students.map((item) => (
									<tr
										key={item.id}
										className="bg-[var(--bg-secondary)] text-sm"
									>
										<td className="rounded-l-3xl px-3 py-4">
											<p className="font-semibold text-[var(--text-primary)]">{item.name}</p>
											<p className="mt-1 text-xs text-[var(--text-secondary)]">
												{item.course}
											</p>
										</td>
										<td className="px-3 py-4 text-[var(--text-secondary)]">
											{item.currentLesson}
										</td>
										<td className="px-3 py-4">
											<div className="min-w-[10rem]">
												<div className="mb-2 text-xs text-[var(--text-secondary)]">
													{item.progress}%
												</div>
												<DashboardProgressBar
													value={item.progress}
													tone={getStatusTone(item.status)}
												/>
											</div>
										</td>
										<td className="px-3 py-4 text-[var(--text-secondary)]">
											{item.attendance}%
										</td>
										<td className="rounded-r-3xl px-3 py-4">
											<DashboardBadge
												label={`${item.grade}/10 · ${item.status}`}
												tone={getStatusTone(item.status)}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</DashboardPanel>

				<DashboardPanel>
					<DashboardSectionHeading
						eyebrow="Grade Formula"
						title="How the dashboard computes the note"
						description="The score is transparent and defensible, which is essential in a serious academic workspace."
					/>

					<div className="mt-6 space-y-3">
						{dashboardGradeFormula.map((item) => {
							const Icon = item.icon;

							return (
								<div
									key={item.label}
									className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4"
								>
									<div className="flex items-start gap-3">
										<div className="rounded-2xl bg-[var(--blue-bg)] p-3 text-[var(--blue-text)]">
											<Icon className="h-5 w-5" />
										</div>
										<div className="flex-1">
											<div className="flex items-center justify-between gap-3">
												<p className="text-sm font-semibold text-[var(--text-primary)]">
													{item.label}
												</p>
												<span className="text-sm font-semibold text-[var(--text-primary)]">
													{item.value}
												</span>
											</div>
											<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
												{item.helper}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</DashboardPanel>
			</div>
		</div>
	);
};

export default Students;
