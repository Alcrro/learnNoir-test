import type { DashboardStudent, WorkspaceRole } from "../../data/dashboardData";
import { getStatusTone } from "../../data/dashboardData";
import { DashboardBadge, DashboardPanel, DashboardProgressBar, DashboardSectionHeading } from "../DashboardUI";

type Props = {
	students: DashboardStudent[];
	role: WorkspaceRole;
};

export function RosterPulseTable({ students, role }: Props) {
	return (
		<DashboardPanel>
			<DashboardSectionHeading
				eyebrow={role === "teacher" ? "Roster Pulse" : "Performance Snapshot"}
				title={
					role === "teacher"
						? "See lesson, progress and grade per student"
						: "Your current standing in one clear row"
				}
				description={
					role === "teacher"
						? "This is the part that replaces scattered spreadsheets and paper notes."
						: "A student dashboard should always make the next step obvious."
				}
			/>
			<div className="mt-6 overflow-x-auto">
				<table className="min-w-full border-separate border-spacing-y-3">
					<thead>
						<tr className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-(--text-muted)">
							<th className="px-3">Name</th>
							<th className="px-3">Current lesson</th>
							<th className="px-3">Progress</th>
							<th className="px-3">Grade</th>
							<th className="px-3">Next date</th>
						</tr>
					</thead>
					<tbody>
						{students.map((student) => (
							<tr
								key={student.id}
								className="rounded-3xl bg-(--bg-secondary) text-sm text-(--text-primary)"
							>
								<td className="rounded-l-3xl px-3 py-4">
									<p className="font-semibold">{student.name}</p>
									<p className="mt-1 text-xs text-(--text-secondary)">
										{student.cohort} · {student.course}
									</p>
								</td>
								<td className="px-3 py-4 text-(--text-secondary)">
									{student.currentLesson}
								</td>
								<td className="px-3 py-4">
									<div className="min-w-40">
										<div className="mb-2 flex items-center justify-between text-xs text-(--text-secondary)">
											<span>{student.progress}%</span>
											<span>{student.attendance}% attendance</span>
										</div>
										<DashboardProgressBar
											value={student.progress}
											tone={getStatusTone(student.status)}
										/>
									</div>
								</td>
								<td className="px-3 py-4">
									<DashboardBadge
										label={`${student.grade}/10 · ${student.status}`}
										tone={getStatusTone(student.status)}
									/>
								</td>
								<td className="rounded-r-3xl px-3 py-4 text-(--text-secondary)">
									{student.nextSession}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</DashboardPanel>
	);
}
