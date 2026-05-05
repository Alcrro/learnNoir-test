import type { TeacherStudentDTO } from "../../types/teacher.types";
import { DashboardPanel, DashboardSectionHeading } from "../DashboardUI";
import { StudentRow } from "../molecules/StudentRow";

type Props = { students: TeacherStudentDTO[] };

export function StudentTable({ students }: Props) {
	if (students.length === 0) {
		return (
			<DashboardPanel>
				<p className="text-center text-sm text-[var(--text-secondary)] py-8">
					No students enrolled yet.
				</p>
			</DashboardPanel>
		);
	}

	return (
		<DashboardPanel>
			<DashboardSectionHeading
				eyebrow="Roster"
				title="Student-by-student operational overview"
				description="Track completion rates, scores, and activity for every enrolled student."
			/>
			<div className="mt-6 overflow-x-auto">
				<table className="min-w-full border-separate border-spacing-y-3">
					<thead>
						<tr className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
							<th className="px-4">Student</th>
							<th className="px-4">Lessons</th>
							<th className="px-4">Progress</th>
							<th className="px-4">Avg score</th>
							<th className="px-4">Last active</th>
						</tr>
					</thead>
					<tbody>
						{students.map((s) => (
							<StudentRow key={s.userId} student={s} />
						))}
					</tbody>
				</table>
			</div>
		</DashboardPanel>
	);
}
