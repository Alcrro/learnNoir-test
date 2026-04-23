import { ShieldCheck, SlidersHorizontal } from "lucide-react";
import {
	DashboardBadge,
	DashboardPanel,
	DashboardRoleSwitch,
	DashboardSectionHeading,
} from "./DashboardUI";
import { useDashboardContext } from "../lib/dashboardContext";

const Settings = () => {
	const { previewRole, setPreviewRole, workspace } = useDashboardContext();

	return (
		<div className="space-y-4">
			<DashboardPanel>
				<DashboardSectionHeading
					eyebrow="Settings"
					title="Tune the workspace around how the school actually operates"
					description="Preferences cover grading transparency, notifications, publishing flow and role-specific ergonomics."
					action={
						<DashboardRoleSwitch
							value={previewRole}
							onChange={setPreviewRole}
						/>
					}
				/>
			</DashboardPanel>

			<div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
				<DashboardPanel>
					<DashboardSectionHeading
						eyebrow="Configuration"
						title="Saved preferences"
						description="These cards show the types of controls that make the dashboard feel ready for a real institution."
					/>

					<div className="mt-6 space-y-3">
						{workspace.settings.map((item) => (
							<div
								key={item.title}
								className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-5"
							>
								<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
									<div>
										<p className="text-base font-semibold text-[var(--text-primary)]">
											{item.title}
										</p>
										<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
											{item.description}
										</p>
									</div>
									<DashboardBadge
										label={item.status}
										tone="blue"
										className="max-w-[14rem] justify-center text-center"
									/>
								</div>
							</div>
						))}
					</div>
				</DashboardPanel>

				<DashboardPanel>
					<DashboardSectionHeading
						eyebrow="Governance"
						title="What makes this feel production-ready"
						description="Good educational software needs reliability, transparency and role-aware defaults."
					/>

					<div className="mt-6 space-y-3">
						<div className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-5">
							<div className="flex items-start gap-3">
								<div className="rounded-2xl bg-[var(--teal-bg)] p-3 text-[var(--teal-text)]">
									<ShieldCheck className="h-5 w-5" />
								</div>
								<div>
									<p className="text-sm font-semibold text-[var(--text-primary)]">
										Transparent grade logic
									</p>
									<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
										Students and teachers can both see how the grade is produced from progress, attendance and quiz accuracy.
									</p>
								</div>
							</div>
						</div>

						<div className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-5">
							<div className="flex items-start gap-3">
								<div className="rounded-2xl bg-[var(--blue-bg)] p-3 text-[var(--blue-text)]">
									<SlidersHorizontal className="h-5 w-5" />
								</div>
								<div>
									<p className="text-sm font-semibold text-[var(--text-primary)]">
										Role-aware workspace
									</p>
									<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
										The same dashboard shell adapts to teacher and student needs without splitting the product into separate experiences.
									</p>
								</div>
							</div>
						</div>
					</div>
				</DashboardPanel>
			</div>
		</div>
	);
};

export default Settings;
