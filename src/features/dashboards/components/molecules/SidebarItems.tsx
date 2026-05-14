import { NavLink } from "react-router-dom";
import { Icons, sidebarItems } from "../../../../content/sidebarItems";
import { cn } from "../../../../libs/utils/cn";
import { DashboardRoleSwitch } from "../DashboardUI";
import { getRoleLabel, type WorkspaceRole } from "../../data/dashboardData";

type SidebarProps = {
	previewRole: WorkspaceRole;
	profileName: string;
	onRoleChange: (role: WorkspaceRole) => void;
	className?: string;
	onNavigate?: () => void;
};

function getInitials(name: string) {
	return name
		.split(" ")
		.slice(0, 2)
		.map((w) => w[0]?.toUpperCase() ?? "")
		.join("");
}

const Sidebar = ({ previewRole, profileName, onRoleChange, className, onNavigate }: SidebarProps) => {
	const visibleItems = sidebarItems.filter(
		(item) => !item.roles || item.roles.includes(previewRole),
	);
	const initials = getInitials(profileName);

	return (
		<aside
			className={cn(
				"flex min-h-full flex-col rounded-[28px] border border-(--border) bg-(--bg-card) text-(--text-primary) shadow-sm",
				className,
			)}
		>
			{/* Profile card */}
			<div className="border-b border-(--border) px-4 py-5">
				<div className="flex items-center gap-3">
					<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-(--blue-bg) text-sm font-semibold text-(--blue-text)">
						{initials}
					</div>
					<div className="min-w-0">
						<p className="truncate text-sm font-semibold text-(--text-primary)">
							{profileName}
						</p>
						<p className="text-xs text-(--text-muted)">
							{getRoleLabel(previewRole)} workspace
						</p>
					</div>
				</div>

				<div className="mt-4">
					<p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-(--text-muted)">
						Preview as
					</p>
					<DashboardRoleSwitch value={previewRole} onChange={onRoleChange} />
				</div>
			</div>

			{/* Navigation */}
			<nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
				{["main", "teaching", "management"].map((group) => {
					const items = visibleItems.filter((item) => item.group === group);
					if (!items.length) return null;

					return (
						<div key={group}>
							<p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-(--text-muted)">
								{group}
							</p>

							<ul className="space-y-1">
								{items.map((item) => {
									const Icon = Icons[item.icon];
									return (
										<li key={item.id}>
											<NavLink
												to={item.path}
												end={item.path === "/dashboard"}
												onClick={onNavigate}
												className={({ isActive }) =>
													cn(
														"group flex items-start gap-3 rounded-2xl px-3 py-3 text-sm transition",
														isActive
															? "bg-(--blue-bg) text-(--blue-text)"
															: "text-(--text-secondary) hover:bg-(--bg-secondary) hover:text-(--text-primary)",
													)
												}
											>
												<Icon size={18} className="mt-0.5 shrink-0 transition" />
												<span className="min-w-0 flex-1">
													<span className="block truncate font-medium">{item.label}</span>
													<span className="mt-1 block truncate text-xs opacity-80">
														{item.description}
													</span>
												</span>
											</NavLink>
										</li>
									);
								})}
							</ul>
						</div>
					);
				})}
			</nav>

			{/* Footer */}
			<div className="border-t border-(--border) p-4">
				<div className="rounded-2xl border border-(--border) bg-(--bg-secondary) p-4">
					<p className="text-sm font-semibold text-(--text-primary)">Grade engine</p>
					<p className="mt-2 text-sm leading-6 text-(--text-secondary)">
						Final score is prepared from lesson progress, attendance and quiz accuracy.
					</p>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
