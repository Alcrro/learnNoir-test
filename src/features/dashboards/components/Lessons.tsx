import { CalendarClock, PencilRuler, PlayCircle } from "lucide-react";
import { DashboardPanel, DashboardSectionHeading } from "./DashboardUI";
import { useDashboardContext } from "../lib/dashboardContext";
import { countByStatus } from "../lib/lessonStats";
import { StatCounter } from "./atoms/StatCounter";
import { LessonDashboardCard } from "./molecules/LessonDashboardCard";

const Lessons = () => {
	const { previewRole, workspace } = useDashboardContext();
	const draftCount = countByStatus(workspace.lessons, "Draft");
	const liveCount = countByStatus(workspace.lessons, "Live");
	const scheduledCount = countByStatus(workspace.lessons, "Scheduled");

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
				<StatCounter label="Drafts" value={draftCount} icon={PencilRuler} tone="blue" />
				<StatCounter label="Live now" value={liveCount} icon={PlayCircle} tone="teal" />
				<StatCounter label="Scheduled" value={scheduledCount} icon={CalendarClock} tone="amber" />
			</div>

			<div className="grid gap-4 xl:grid-cols-2">
				{workspace.lessons.map((lesson) => (
					<LessonDashboardCard key={lesson.id} lesson={lesson} />
				))}
			</div>
		</div>
	);
};

export default Lessons;
