import { BookOpen, GraduationCap, Radio, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardPanel, DashboardSectionHeading, DashboardStatCard } from "../components/DashboardUI";
import { StatCounter } from "../components/atoms/StatCounter";
import { useTeacherStats } from "../hooks/useTeacherStats";

export default function OverviewPage() {
	const { data: stats, isLoading } = useTeacherStats();

	if (isLoading) {
		return (
			<div className="flex h-64 items-center justify-center">
				<p className="text-sm text-[var(--text-muted)]">Loading overview…</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<DashboardPanel className="relative overflow-hidden">
				<div className="absolute -right-14 top-0 h-44 w-44 rounded-full bg-[var(--blue-bg)] blur-3xl" />
				<div className="relative">
					<DashboardSectionHeading
						eyebrow="Overview"
						title="Your classroom at a glance"
						description="Real-time stats from your lessons, students, and activity — everything you need to stay on top of your course."
					/>
					<div className="mt-6 flex flex-wrap gap-3">
						<Link
							to="/dashboard/lessons"
							className="rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-elevated)]"
						>
							Manage lessons
						</Link>
						<Link
							to="/dashboard/students"
							className="rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-elevated)]"
						>
							View students
						</Link>
					</div>
				</div>
			</DashboardPanel>

			{stats?.liveLesson && (
				<div className="rounded-[28px] border border-[color:var(--teal-border)] bg-[var(--teal-bg)] p-5">
					<div className="flex items-start gap-4">
						<div className="rounded-2xl bg-[var(--teal-bg)] border border-[color:var(--teal-border)] p-3 text-[var(--teal-text)] shrink-0">
							<Radio className="h-5 w-5" />
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--teal-text)]">
								Live now
							</p>
							<p className="mt-1 text-lg font-semibold text-[var(--text-primary)] truncate">
								{stats.liveLesson.title}
							</p>
							<p className="mt-1 text-xs text-[var(--text-secondary)]">
								Last activity{" "}
								{new Date(stats.liveLesson.lastActivityAt).toLocaleTimeString("en-GB", {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</p>
						</div>
						<Link
							to="/dashboard/lessons"
							className="shrink-0 rounded-2xl border border-[color:var(--teal-border)] bg-[var(--bg-card)] px-3 py-2 text-xs font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-elevated)]"
						>
							View
						</Link>
					</div>
				</div>
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
