import { ArrowRight, Clock3, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import {
	DashboardBadge,
	DashboardPanel,
	DashboardProgressBar,
	DashboardSectionHeading,
	DashboardStatCard,
} from "./DashboardUI";
import { dashboardHighlights, getStatusTone } from "../data/dashboardData";
import { useDashboardContext } from "../lib/dashboardContext";

const Overview = () => {
	const { previewRole, workspace } = useDashboardContext();
	const highlights = dashboardHighlights[previewRole];
	const mainStudent = workspace.students[0];

	return (
		<div className="space-y-4">
			<DashboardPanel className="relative overflow-hidden">
				<div className="absolute -right-14 top-0 h-44 w-44 rounded-full bg-[var(--blue-bg)] blur-3xl" />
				<div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,1fr)]">
					<div>
						<DashboardSectionHeading
							eyebrow={workspace.headline.eyebrow}
							title={workspace.headline.title}
							description={workspace.headline.description}
						/>

						<div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--teal-border)] bg-[var(--teal-bg)] px-4 py-2 text-sm font-medium text-[var(--teal-text)]">
							<Sparkles className="h-4 w-4" />
							{workspace.headline.highlight}
						</div>

						<div className="mt-6 grid gap-3 sm:grid-cols-3">
							{workspace.quickActions.map((action) => (
								<Link
									key={action.title}
									to={action.href}
									className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4 transition hover:border-[color:var(--border-strong)] hover:bg-[var(--bg-elevated)]"
								>
									<p className="text-sm font-semibold text-[var(--text-primary)]">
										{action.title}
									</p>
									<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
										{action.description}
									</p>
									<span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
										{action.cta}
										<ArrowRight className="h-4 w-4" />
									</span>
								</Link>
							))}
						</div>
					</div>

					<div className="grid gap-3">
						{highlights.map((item) => {
							const Icon = item.icon;

							return (
								<div
									key={item.title}
									className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4"
								>
									<div className="flex items-start gap-3">
										<div className="rounded-2xl bg-[var(--blue-bg)] p-3 text-[var(--blue-text)]">
											<Icon className="h-5 w-5" />
										</div>
										<div>
											<p className="text-sm font-semibold text-[var(--text-primary)]">
												{item.title}
											</p>
											<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
												{item.description}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</DashboardPanel>

			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				{workspace.stats.map((stat) => (
					<DashboardStatCard
						key={stat.label}
						label={stat.label}
						value={stat.value}
						helper={stat.helper}
						trend={stat.trend}
						icon={stat.icon}
						tone={stat.tone}
					/>
				))}
			</div>

			<div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
				<DashboardPanel>
					<DashboardSectionHeading
						eyebrow={previewRole === "teacher" ? "Session Queue" : "Agenda"}
						title={
							previewRole === "teacher"
								? "Everything happening across the classroom today"
								: "Your next important learning moments"
						}
						description={
							previewRole === "teacher"
								? "Every session keeps date, hour, cohort context and operational status visible."
								: "You can see upcoming classes, submission windows and exactly what you need to prepare."
						}
					/>

					<div className="mt-6 grid gap-3">
						{workspace.sessions.map((session) => (
							<div
								key={session.id}
								className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4"
							>
								<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
									<div>
										<p className="text-base font-semibold text-[var(--text-primary)]">
											{session.title}
										</p>
										<p className="mt-1 text-sm text-[var(--text-secondary)]">
											{session.group} · {session.mode}
										</p>
									</div>
									<DashboardBadge
										label={session.status}
										tone={session.status === "Booked" || session.status === "Next class" ? "blue" : "amber"}
									/>
								</div>
								<div className="mt-4 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
									<Clock3 className="h-4 w-4" />
									{session.time}
								</div>
								<p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
									{session.meta}
								</p>
							</div>
						))}
					</div>
				</DashboardPanel>

				<DashboardPanel>
					<DashboardSectionHeading
						eyebrow="Signals"
						title={
							previewRole === "teacher"
								? "Where the dashboard should pull your attention"
								: "What to keep an eye on this week"
						}
						description="Short operational cues make the dashboard feel like a real command center."
					/>

					<div className="mt-6 space-y-3">
						{workspace.alerts.map((alert) => (
							<div
								key={alert.id}
								className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4"
							>
								<div className="flex items-start justify-between gap-3">
									<p className="text-sm font-semibold text-[var(--text-primary)]">
										{alert.title}
									</p>
									<DashboardBadge
										label={alert.meta}
										tone={alert.tone}
										className="max-w-[11rem] justify-center text-center"
									/>
								</div>
								<p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
									{alert.description}
								</p>
							</div>
						))}
					</div>
				</DashboardPanel>
			</div>

			<div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
				<DashboardPanel>
					<DashboardSectionHeading
						eyebrow={previewRole === "teacher" ? "Roster Pulse" : "Performance Snapshot"}
						title={
							previewRole === "teacher"
								? "See lesson, progress and grade per student"
								: "Your current standing in one clear row"
						}
						description={
							previewRole === "teacher"
								? "This is the part that replaces scattered spreadsheets and paper notes."
								: "A student dashboard should always make the next step obvious."
						}
					/>

					<div className="mt-6 overflow-x-auto">
						<table className="min-w-full border-separate border-spacing-y-3">
							<thead>
								<tr className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
									<th className="px-3">Name</th>
									<th className="px-3">Current lesson</th>
									<th className="px-3">Progress</th>
									<th className="px-3">Grade</th>
									<th className="px-3">Next date</th>
								</tr>
							</thead>
							<tbody>
								{workspace.students.map((student) => (
									<tr
										key={student.id}
										className="rounded-3xl bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)]"
									>
										<td className="rounded-l-3xl px-3 py-4">
											<div>
												<p className="font-semibold">{student.name}</p>
												<p className="mt-1 text-xs text-[var(--text-secondary)]">
													{student.cohort} · {student.course}
												</p>
											</div>
										</td>
										<td className="px-3 py-4 text-[var(--text-secondary)]">
											{student.currentLesson}
										</td>
										<td className="px-3 py-4">
											<div className="min-w-[10rem]">
												<div className="mb-2 flex items-center justify-between text-xs text-[var(--text-secondary)]">
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
										<td className="rounded-r-3xl px-3 py-4 text-[var(--text-secondary)]">
											{student.nextSession}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</DashboardPanel>

				<DashboardPanel>
					<DashboardSectionHeading
						eyebrow="Focus"
						title={
							previewRole === "teacher"
								? "What matters for the next intervention"
								: "The next milestone to unlock"
						}
						description="Small details like this make the dashboard operational instead of decorative."
					/>

					<div className="mt-6 space-y-4">
						<div className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4">
							<div className="flex items-center gap-3">
								<div className="rounded-2xl bg-[var(--teal-bg)] p-3 text-[var(--teal-text)]">
									<Zap className="h-5 w-5" />
								</div>
								<div>
									<p className="text-sm font-semibold text-[var(--text-primary)]">
										{previewRole === "teacher"
											? "Most consistent learner"
											: "Current streak"}
									</p>
									<p className="mt-1 text-sm text-[var(--text-secondary)]">
										{previewRole === "teacher"
											? `${workspace.students[0]?.name} is on pace with a ${workspace.students[0]?.grade}/10 grade.`
											: `${mainStudent?.streak ?? 0} focused study sessions in a row.`}
									</p>
								</div>
							</div>
						</div>

						<div className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4">
							<p className="text-sm font-semibold text-[var(--text-primary)]">
								{previewRole === "teacher" ? "Next operational move" : "Next personal move"}
							</p>
							<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
								{previewRole === "teacher"
									? "Turn the review lesson into a published recap and assign the recovery path to students below 7.5."
									: "Finish the recovery sprint before the live geometry lesson to lift the projected grade above 9.2."}
							</p>
						</div>
					</div>
				</DashboardPanel>
			</div>
		</div>
	);
};

export default Overview;
