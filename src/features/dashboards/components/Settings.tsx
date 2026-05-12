import { ShieldCheck, SlidersHorizontal } from "lucide-react";
import {
	DashboardPanel,
	DashboardRoleSwitch,
	DashboardSectionHeading,
} from "./DashboardUI";
import { useDashboardContext } from "../lib/dashboardContext";
import { SettingRow } from "./atoms/SettingRow";
import { GovernanceCard } from "./atoms/GovernanceCard";

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
							<SettingRow
								key={item.title}
								title={item.title}
								description={item.description}
								status={item.status}
							/>
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
						<GovernanceCard
							icon={ShieldCheck}
							tone="teal"
							title="Transparent grade logic"
							description="Students and teachers can both see how the grade is produced from progress, attendance and quiz accuracy."
						/>
						<GovernanceCard
							icon={SlidersHorizontal}
							tone="blue"
							title="Role-aware workspace"
							description="The same dashboard shell adapts to teacher and student needs without splitting the product into separate experiences."
						/>
					</div>
				</DashboardPanel>
			</div>
		</div>
	);
};

export default Settings;
