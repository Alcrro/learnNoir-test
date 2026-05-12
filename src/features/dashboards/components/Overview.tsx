import { Sparkles, Zap } from "lucide-react";
import {
	DashboardPanel,
	DashboardSectionHeading,
	DashboardStatCard,
} from "./DashboardUI";
import { dashboardHighlights } from "../data/dashboardData";
import { useDashboardContext } from "../lib/dashboardContext";
import { GovernanceCard } from "./atoms/GovernanceCard";
import { QuickActionCard } from "./atoms/QuickActionCard";
import { SessionCard } from "./atoms/SessionCard";
import { AlertCard } from "./atoms/AlertCard";
import { RosterPulseTable } from "./organisms/RosterPulseTable";

const Overview = () => {
	const { previewRole, workspace } = useDashboardContext();
	const highlights = dashboardHighlights[previewRole];
	const mainStudent = workspace.students[0];

	return (
		<div className="space-y-4">
			<DashboardPanel className="relative overflow-hidden">
				<div className="absolute -right-14 top-0 h-44 w-44 rounded-full bg-(--blue-bg) blur-3xl" />
				<div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,1fr)]">
					<div>
						<DashboardSectionHeading
							eyebrow={workspace.headline.eyebrow}
							title={workspace.headline.title}
							description={workspace.headline.description}
						/>
						<div className="mt-5 inline-flex items-center gap-2 rounded-full border border-(--teal-border) bg-(--teal-bg) px-4 py-2 text-sm font-medium text-(--teal-text)">
							<Sparkles className="h-4 w-4" />
							{workspace.headline.highlight}
						</div>
						<div className="mt-6 grid gap-3 sm:grid-cols-3">
							{workspace.quickActions.map((action) => (
								<QuickActionCard key={action.title} action={action} />
							))}
						</div>
					</div>

					<div className="grid gap-3">
						{highlights.map((item) => (
							<GovernanceCard
								key={item.title}
								icon={item.icon}
								title={item.title}
								description={item.description}
								tone="blue"
							/>
						))}
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
							<SessionCard key={session.id} session={session} />
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
							<AlertCard key={alert.id} alert={alert} />
						))}
					</div>
				</DashboardPanel>
			</div>

			<div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
				<RosterPulseTable students={workspace.students} role={previewRole} />

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
						<GovernanceCard
							icon={Zap}
							tone="teal"
							title={previewRole === "teacher" ? "Most consistent learner" : "Current streak"}
							description={
								previewRole === "teacher"
									? `${workspace.students[0]?.name} is on pace with a ${workspace.students[0]?.grade}/10 grade.`
									: `${mainStudent?.streak ?? 0} focused study sessions in a row.`
							}
						/>
						<div className="rounded-3xl border border-(--border) bg-(--bg-secondary) p-4">
							<p className="text-sm font-semibold text-(--text-primary)">
								{previewRole === "teacher" ? "Next operational move" : "Next personal move"}
							</p>
							<p className="mt-2 text-sm leading-6 text-(--text-secondary)">
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
