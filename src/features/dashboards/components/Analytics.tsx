import { BarChart3, TrendingUp } from "lucide-react";
import {
	DashboardBadge,
	DashboardPanel,
	DashboardProgressBar,
	DashboardSectionHeading,
} from "./DashboardUI";
import { useDashboardContext } from "../lib/dashboardContext";

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
							<div
								key={item.label}
								className="flex flex-col items-center gap-3"
							>
								<div className="flex h-52 w-full items-end rounded-[24px] border border-[color:var(--border)] bg-[var(--bg-secondary)] p-3">
									<div
										className="w-full rounded-[18px] bg-[var(--blue)]"
										style={{ height: `${item.value}%` }}
									/>
								</div>
								<div className="text-center">
									<p className="text-sm font-semibold text-[var(--text-primary)]">
										{item.label}
									</p>
									<p className="mt-1 text-xs text-[var(--text-secondary)]">
										{item.value}%
									</p>
									<p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
										{item.helper}
									</p>
								</div>
							</div>
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
							<div
								key={alert.id}
								className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4"
							>
								<div className="flex items-center justify-between gap-3">
									<p className="text-sm font-semibold text-[var(--text-primary)]">
										{alert.title}
									</p>
									<DashboardBadge
										label={alert.meta}
										tone={alert.tone}
									/>
								</div>
								<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
									{alert.description}
								</p>
							</div>
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
						<div
							key={item.label}
							className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-5"
						>
							<div className="flex items-center justify-between gap-3">
								<div>
									<p className="text-base font-semibold text-[var(--text-primary)]">
										{item.label}
									</p>
									<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
										{item.helper}
									</p>
								</div>
								<div className="rounded-2xl bg-[var(--blue-bg)] p-3 text-[var(--blue-text)]">
									<BarChart3 className="h-5 w-5" />
								</div>
							</div>

							<div className="mt-6">
								<div className="mb-2 flex items-center justify-between text-xs text-[var(--text-secondary)]">
									<span>Health</span>
									<span>{item.value}%</span>
								</div>
								<DashboardProgressBar
									value={item.value}
									tone={item.value >= 85 ? "teal" : item.value >= 70 ? "blue" : "amber"}
								/>
							</div>
						</div>
					))}
				</div>
			</DashboardPanel>
		</div>
	);
};

export default Analytics;
