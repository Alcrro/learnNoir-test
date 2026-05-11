import { Menu } from "lucide-react";
import NavbarMenu from "./NavbarMenu";
import { DashboardBadge } from "../DashboardUI";
import { getRoleLabel, type WorkspaceRole } from "../../data/dashboardData";

type DashboardNavbarProps = {
	previewRole: WorkspaceRole;
	alertCount: number;
	profileName: string;
	profileRoleLabel: string;
	onOpenSidebar: () => void;
	onRoleChange: (role: WorkspaceRole) => void;
};

const DashboardNavbar = ({
	previewRole,
	alertCount,
	profileName,
	profileRoleLabel,
	onOpenSidebar,
	onRoleChange,
}: DashboardNavbarProps) => {
	return (
		<header className="sticky top-3 z-30 rounded-[28px] border border-[color:var(--border)] bg-[color:var(--bg-card)]/95 p-4 shadow-sm backdrop-blur sm:p-5">
			<div className="flex items-center justify-between gap-3">
				<div className="flex min-w-0 items-center gap-3">
					<button
						type="button"
						onClick={onOpenSidebar}
						className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] transition hover:border-[color:var(--border-strong)] hover:bg-[var(--bg-elevated)] lg:hidden"
						aria-label="Open dashboard navigation"
					>
						<Menu className="h-5 w-5" />
					</button>

					<div className="min-w-0">
						<p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
							{getRoleLabel(previewRole)} dashboard
						</p>
						<h1 className="mt-1 truncate text-xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-2xl">
							{profileName}
						</h1>
						<p className="mt-1 text-sm text-[var(--text-secondary)]">
							{profileRoleLabel} workspace with real-time lesson, roster and grade signals.
						</p>
					</div>
				</div>

				<div className="hidden items-center gap-2 xl:flex">
					<DashboardBadge label={`${alertCount} active signals`} tone="amber" />
					<DashboardBadge label="Responsive + theme ready" tone="blue" />
				</div>

				<NavbarMenu
					previewRole={previewRole}
					onRoleChange={onRoleChange}
				/>
			</div>
		</header>
	);
};

export default DashboardNavbar;
