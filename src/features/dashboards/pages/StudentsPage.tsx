import { GraduationCap, TrendingUp, Users } from "lucide-react";
import { DashboardPanel, DashboardSectionHeading, DashboardStatCard } from "../components/DashboardUI";
import { StudentTable } from "../components/organisms/StudentTable";
import { useTeacherStudents } from "../hooks/useTeacherStudents";

export default function StudentsPage() {
	const { data: students, isLoading } = useTeacherStudents();

	if (isLoading) {
		return (
			<div className="flex h-64 items-center justify-center">
				<p className="text-sm text-[var(--text-muted)]">Loading students…</p>
			</div>
		);
	}

	const list = students ?? [];

	const totalStudents = list.length;
	const avgScore =
		list.length > 0
			? list.reduce((sum, s) => sum + s.avgScore, 0) / list.length
			: 0;
	const avgCompletion =
		list.length > 0
			? list.reduce(
					(sum, s) =>
						sum +
						(s.lessonsTotal > 0
							? Math.round((s.lessonsCompleted / s.lessonsTotal) * 100)
							: 0),
					0,
				) / list.length
			: 0;

	const topStudents = [...list]
		.sort((a, b) => b.avgScore - a.avgScore)
		.slice(0, 3);

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
					value={String(totalStudents)}
					helper="Students with progress tracked in your lessons"
					trend="All time"
					icon={Users}
					tone="blue"
				/>
				<DashboardStatCard
					label="Average score"
					value={avgScore > 0 ? avgScore.toFixed(1) : "—"}
					helper="Mean score across all students and lessons"
					trend="Higher is better"
					icon={TrendingUp}
					tone="teal"
				/>
				<DashboardStatCard
					label="Avg completion"
					value={`${Math.round(avgCompletion)}%`}
					helper="Average lesson completion rate across the roster"
					trend="Based on lesson progress"
					icon={GraduationCap}
					tone="amber"
				/>
			</div>

			{topStudents.length > 0 && (
				<DashboardPanel>
					<DashboardSectionHeading
						eyebrow="Top performers"
						title="Students with the highest average score"
						description="Recognize strong learners and use them as mentors or case studies."
					/>
					<div className="mt-5 grid gap-3 sm:grid-cols-3">
						{topStudents.map((s, i) => {
							const initials = s.username
								.split(/\s+/)
								.map((w) => w[0] ?? "")
								.join("")
								.toUpperCase()
								.slice(0, 2);

							return (
								<div
									key={s.userId}
									className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4"
								>
									<div className="relative shrink-0">
										{s.avatarUrl ? (
											<img
												src={s.avatarUrl}
												alt={s.username}
												className="h-10 w-10 rounded-full object-cover"
											/>
										) : (
											<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--blue-bg)] text-sm font-semibold text-[var(--blue-text)]">
												{initials}
											</div>
										)}
										<span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--bg-card)] text-xs font-bold text-[var(--text-muted)]">
											{i + 1}
										</span>
									</div>
									<div className="min-w-0">
										<p className="truncate text-sm font-semibold text-[var(--text-primary)]">
											{s.username}
										</p>
										<p className="text-xs text-[var(--text-secondary)]">
											Score: {s.avgScore > 0 ? s.avgScore.toFixed(1) : "—"}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</DashboardPanel>
			)}

			<StudentTable students={list} />
		</div>
	);
}
