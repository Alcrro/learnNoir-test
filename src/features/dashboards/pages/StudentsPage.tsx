import { GraduationCap, TrendingUp, Users } from "lucide-react";
import PageStatus from "../../../components/atoms/PageStatus";
import { DashboardPanel, DashboardSectionHeading, DashboardStatCard } from "../components/DashboardUI";
import { StudentTable } from "../components/organisms/StudentTable";
import { TopPerformersPanel } from "../components/organisms/TopPerformersPanel";
import { useTeacherStudents } from "../hooks/useTeacherStudents";
import { calcAvgCompletion, calcAvgScore, getTopStudents } from "../lib/studentStats";

export default function StudentsPage() {
	const { data: students, isLoading } = useTeacherStudents();

	if (isLoading) return <PageStatus message="Loading students…" centered />;

	const list = students ?? [];

	return (
		<div className="space-y-4">
			<DashboardPanel>
				<DashboardSectionHeading
					eyebrow="Students"
					title="Every student gets a visible progress state"
					description="Track completion, scores, and last activity across your entire roster in one place."
				/>
			</DashboardPanel>

			<div className="grid gap-4 md:grid-cols-3">
				<DashboardStatCard
					label="Enrolled students"
					value={String(list.length)}
					helper="Students with progress tracked in your lessons"
					trend="All time"
					icon={Users}
					tone="blue"
				/>
				<DashboardStatCard
					label="Average score"
					value={calcAvgScore(list) > 0 ? calcAvgScore(list).toFixed(1) : "—"}
					helper="Mean score across all students and lessons"
					trend="Higher is better"
					icon={TrendingUp}
					tone="teal"
				/>
				<DashboardStatCard
					label="Avg completion"
					value={`${Math.round(calcAvgCompletion(list))}%`}
					helper="Average lesson completion rate across the roster"
					trend="Based on lesson progress"
					icon={GraduationCap}
					tone="amber"
				/>
			</div>

			<TopPerformersPanel students={getTopStudents(list)} />

			<StudentTable students={list} />
		</div>
	);
}
