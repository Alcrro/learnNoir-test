import type { TeacherStudentDTO } from "../../types/teacher.types";
import { DashboardPanel, DashboardSectionHeading } from "../DashboardUI";
import { TopPerformerCard } from "../atoms/TopPerformerCard";

type Props = { students: TeacherStudentDTO[] };

export function TopPerformersPanel({ students }: Props) {
	if (students.length === 0) return null;

	return (
		<DashboardPanel>
			<DashboardSectionHeading
				eyebrow="Top performers"
				title="Students with the highest average score"
				description="Recognize strong learners and use them as mentors or case studies."
			/>
			<div className="mt-5 grid gap-3 sm:grid-cols-3">
				{students.map((s, i) => (
					<TopPerformerCard
						key={s.userId}
						rank={i + 1}
						username={s.username}
						avatarUrl={s.avatarUrl}
						avgScore={s.avgScore}
					/>
				))}
			</div>
		</DashboardPanel>
	);
}
