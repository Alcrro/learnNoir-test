import { AlarmClock, BookOpen, GraduationCap, ShieldCheck, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import PageStatus from "../../../components/atoms/PageStatus";
import {
	DashboardPanel,
	DashboardSectionHeading,
	DashboardStatCard,
} from "../components/DashboardUI";
import { AlertCard } from "../components/atoms/AlertCard";
import { LiveLessonBanner } from "../components/atoms/LiveLessonBanner";
import { StatCounter } from "../components/atoms/StatCounter";
import { useDashboardContext } from "../lib/dashboardContext";
import { useTeacherStats } from "../hooks/useTeacherStats";
import { DueForReviewWidget } from "../../lessons/components/DueForReviewWidget";

function StudentOverview() {
	const { workspace, profileName } = useDashboardContext();
	const { stats, alerts, quickActions } = workspace;
	const [gradeStat, lessonStat, attendanceStat, sessionStat] = stats;

	return (
		<div className="space-y-4">
			<DashboardPanel className="relative overflow-hidden">
				<div className="absolute -right-14 top-0 h-44 w-44 rounded-full bg-(--blue-bg) blur-3xl" />
				<div className="relative">
					<DashboardSectionHeading
						eyebrow="Tabloul tău de bord"
						title={`Bine ai venit, ${profileName}`}
						description="Urmărește-ți progresul, nota proiectată și sesiunile viitoare — totul într-un singur loc."
					/>
					<div className="mt-6 flex flex-wrap gap-3">
						{quickActions.map((action) => (
							<Link
								key={action.href}
								to={action.href}
								className="rounded-2xl border border-(--border) bg-(--bg-secondary) px-4 py-2.5 text-sm font-semibold text-(--text-primary) transition hover:bg-(--bg-elevated)"
							>
								{action.cta}
							</Link>
						))}
					</div>
				</div>
			</DashboardPanel>

			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				{gradeStat && (
					<DashboardStatCard
						label={gradeStat.label}
						value={gradeStat.value}
						helper={gradeStat.helper}
						trend={gradeStat.trend}
						icon={GraduationCap}
						tone="blue"
					/>
				)}
				{lessonStat && (
					<DashboardStatCard
						label={lessonStat.label}
						value={lessonStat.value}
						helper={lessonStat.helper}
						trend={lessonStat.trend}
						icon={BookOpen}
						tone="teal"
					/>
				)}
				{attendanceStat && (
					<DashboardStatCard
						label={attendanceStat.label}
						value={attendanceStat.value}
						helper={attendanceStat.helper}
						trend={attendanceStat.trend}
						icon={ShieldCheck}
						tone="amber"
					/>
				)}
				{sessionStat && (
					<DashboardStatCard
						label={sessionStat.label}
						value={sessionStat.value}
						helper={sessionStat.helper}
						trend={sessionStat.trend}
						icon={AlarmClock}
						tone="slate"
					/>
				)}
			</div>

			<DueForReviewWidget />

			{alerts.length > 0 && (
				<DashboardPanel>
					<DashboardSectionHeading
						eyebrow="Notificări"
						title="Ce se întâmplă acum"
						description="Actualizări despre progresul tău, teme și feedback de la profesor."
					/>
					<div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
						{alerts.map((alert) => (
							<AlertCard
								key={alert.id}
								alert={alert}
							/>
						))}
					</div>
				</DashboardPanel>
			)}
		</div>
	);
}

function TeacherOverview() {
	const { data: stats, isLoading } = useTeacherStats();

	if (isLoading)
		return (
			<PageStatus
				message="Loading overview…"
				centered
			/>
		);

	return (
		<div className="space-y-4">
			<DashboardPanel className="relative overflow-hidden">
				<div className="absolute -right-14 top-0 h-44 w-44 rounded-full bg-(--blue-bg) blur-3xl" />
				<div className="relative">
					<DashboardSectionHeading
						eyebrow="Overview"
						title="Your classroom at a glance"
						description="Real-time stats from your lessons, students, and activity — everything you need to stay on top of your course."
					/>
					<div className="mt-6 flex flex-wrap gap-3">
						<Link
							to="/dashboard/lessons"
							className="rounded-2xl border border-(--border) bg-(--bg-secondary) px-4 py-2.5 text-sm font-semibold text-(--text-primary) transition hover:bg-(--bg-elevated)"
						>
							Manage lessons
						</Link>
						<Link
							to="/dashboard/students"
							className="rounded-2xl border border-(--border) bg-(--bg-secondary) px-4 py-2.5 text-sm font-semibold text-(--text-primary) transition hover:bg-(--bg-elevated)"
						>
							View students
						</Link>
					</div>
				</div>
			</DashboardPanel>

			{stats?.liveLesson && (
				<LiveLessonBanner
					title={stats.liveLesson.title}
					lastActivityAt={stats.liveLesson.lastActivityAt}
				/>
			)}

			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				<DashboardStatCard
					label="Total lessons"
					value={String(stats?.totalLessons ?? 0)}
					helper="Across all modules you teach"
					trend={`${stats?.publishedLessons ?? 0} published`}
					icon={BookOpen}
					tone="blue"
				/>
				<DashboardStatCard
					label="Published"
					value={String(stats?.publishedLessons ?? 0)}
					helper="Live and accessible to students"
					trend={`${stats?.draftLessons ?? 0} still in draft`}
					icon={TrendingUp}
					tone="teal"
				/>
				<DashboardStatCard
					label="Total students"
					value={String(stats?.totalStudents ?? 0)}
					helper="Enrolled in at least one of your lessons"
					trend="All time"
					icon={GraduationCap}
					tone="amber"
				/>
				<DashboardStatCard
					label="Avg completion"
					value={`${stats?.avgCompletionRate ?? 0}%`}
					helper="Across all published lessons"
					trend="Based on lesson progress"
					icon={TrendingUp}
					tone="slate"
				/>
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				<StatCounter
					label="Drafts"
					value={stats?.draftLessons ?? 0}
					icon={BookOpen}
					tone="slate"
				/>
				<StatCounter
					label="In review"
					value={stats?.reviewedLessons ?? 0}
					icon={BookOpen}
					tone="amber"
				/>
				<StatCounter
					label="Published"
					value={stats?.publishedLessons ?? 0}
					icon={BookOpen}
					tone="teal"
				/>
			</div>
		</div>
	);
}

export default function OverviewPage() {
	const { previewRole } = useDashboardContext();
	return previewRole === "student" ? <StudentOverview /> : <TeacherOverview />;
}
