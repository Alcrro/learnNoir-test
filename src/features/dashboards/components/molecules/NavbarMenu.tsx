import { Link } from "react-router-dom";
import { LogOut, Settings2 } from "lucide-react";
import { ToggleTheme } from "../../../../components/molecules/ThemeToggle";
import { useLogout } from "../../../auth/hooks/useLogout";

const NavbarMenu = () => {
	const logoutMutation = useLogout();

	return (
		<div className="flex shrink-0 items-center gap-2 sm:gap-3">
			<ToggleTheme />

			<Link
				to="/dashboard/settings"
				className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-(--border) bg-(--bg-secondary) text-(--text-secondary) transition hover:border-(--border-strong) hover:bg-(--bg-elevated) hover:text-(--text-primary)"
				aria-label="Dashboard settings"
			>
				<Settings2 className="h-4 w-4" />
			</Link>

			<button
				type="button"
				onClick={() => logoutMutation.mutateAsync()}
				disabled={logoutMutation.isPending}
				className="inline-flex items-center gap-2 rounded-2xl border border-(--border) px-4 py-2.5 text-sm font-medium text-(--text-secondary) transition hover:border-(--border-strong) hover:bg-(--bg-secondary) hover:text-(--text-primary) disabled:cursor-not-allowed disabled:opacity-60"
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
