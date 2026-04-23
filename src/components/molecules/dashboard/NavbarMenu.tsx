import { Link } from "react-router-dom";
import { LogOut, Settings2 } from "lucide-react";
import { ToggleTheme } from "../ThemeToggle";
import { DashboardRoleSwitch } from "../../../features/dashboards/components/DashboardUI";
import { useLogout } from "../../../features/auth/hooks/useLogout";
import type { WorkspaceRole } from "../../../features/dashboards/data/dashboardData";

type NavbarMenuProps = {
	previewRole: WorkspaceRole;
	onRoleChange: (role: WorkspaceRole) => void;
};

const NavbarMenu = ({ previewRole, onRoleChange }: NavbarMenuProps) => {
	const logoutMutation = useLogout();

	async function handleLogout() {
		await logoutMutation.mutateAsync();
	}

	return (
		<div className="flex items-center gap-2 sm:gap-3">
			<div className="hidden lg:block">
				<DashboardRoleSwitch
					value={previewRole}
					onChange={onRoleChange}
				/>
			</div>

			<ToggleTheme />

			<Link
				to="/dashboard/settings"
				className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] transition hover:border-[color:var(--border-strong)] hover:bg-[var(--bg-elevated)]"
				aria-label="Open dashboard settings"
			>
				<Settings2 className="h-4 w-4" />
			</Link>

			<button
				type="button"
				onClick={handleLogout}
				disabled={logoutMutation.isPending}
				className="inline-flex items-center gap-2 rounded-2xl border border-[color:var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition hover:border-[color:var(--border-strong)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-60"
			>
				<LogOut className="h-4 w-4" />
				<span className="hidden sm:inline">
					{logoutMutation.isPending ? "Signing out..." : "Logout"}
				</span>
			</button>
		</div>
	);
};

export default NavbarMenu;
