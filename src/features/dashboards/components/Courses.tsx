import { BookOpen, TriangleAlert } from "lucide-react";
import { DashboardPanel, DashboardSectionHeading, DashboardStatCard } from "./DashboardUI";
import { useDashboardContext } from "../lib/dashboardContext";
import { CourseCard } from "./molecules/CourseCard";

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
					<CourseCard key={course.id} course={course} role={previewRole} />
				))}
			</div>
		</div>
	);
};

export default Courses;
