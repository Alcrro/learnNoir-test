import { TrendingUp } from "lucide-react";
import { DashboardPanel, DashboardSectionHeading } from "./DashboardUI";
import { useDashboardContext } from "../lib/dashboardContext";
import { ActivityBarColumn } from "./atoms/ActivityBarColumn";
import { ModuleHealthCard } from "./atoms/ModuleHealthCard";
import { AlertCard } from "./atoms/AlertCard";

const Analytics = () => {
	const { previewRole, workspace } = useDashboardContext();
	const strongestSignal = [...workspace.moduleHealth].sort(
		(first, second) => second.value - first.value,
	)[0];

	return (
		<div className="space-y-4">
			<DashboardPanel>
				<DashboardSectionHeading
					eyebrow="Analytics"
					title={
						previewRole === "teacher"
							? "Operational insights for the whole classroom"
							: "Understand the signals behind your current performance"
					}
					description="Even without a chart library, we can shape the information architecture around meaningful indicators."
				/>
			</DashboardPanel>

			<div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
				<DashboardPanel>
					<DashboardSectionHeading
						eyebrow="Weekly activity"
						title="Engagement trend"
						description="A simple activity rail already makes the dashboard feel analytical and actionable."
					/>
					<div className="mt-8 grid grid-cols-5 gap-3">
						{workspace.weeklyActivity.map((item) => (
							<ActivityBarColumn key={item.label} item={item} />
						))}
					</div>
				</DashboardPanel>

				<DashboardPanel>
					<DashboardSectionHeading
						eyebrow="Best signal"
						title={strongestSignal.label}
						description={strongestSignal.helper}
					/>
					<div className="mt-6 rounded-3xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-5">
						<div className="flex items-center gap-3">
							<div className="rounded-2xl bg-[var(--teal-bg)] p-3 text-[var(--teal-text)]">
								<TrendingUp className="h-5 w-5" />
							</div>
							<div>
								<p className="text-sm font-semibold text-[var(--text-primary)]">
									{strongestSignal.value}%
								</p>
								<p className="mt-1 text-sm text-[var(--text-secondary)]">
									Best-performing module this cycle
								</p>
							</div>
						</div>
					</div>
					<div className="mt-4 space-y-3">
						{workspace.alerts.map((alert) => (
							<AlertCard key={alert.id} alert={alert} />
						))}
					</div>
				</DashboardPanel>
			</div>

			<DashboardPanel>
				<DashboardSectionHeading
					eyebrow="Module health"
					title="The pillars behind progress and grades"
					description="A professional dashboard keeps the input signals visible, not just the final score."
				/>
				<div className="mt-6 grid gap-4 xl:grid-cols-2">
					{workspace.moduleHealth.map((item) => (
						<ModuleHealthCard key={item.label} item={item} />
					))}
				</div>
			</DashboardPanel>
		</div>
	);
};

export default Analytics;
