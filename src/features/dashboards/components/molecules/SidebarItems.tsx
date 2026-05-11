import { NavLink } from "react-router-dom";
import { Icons, sidebarItems } from "../../../../content/sidebarItems";
import { cn } from "../../../../libs/utils/cn";
import { getRoleLabel, type WorkspaceRole } from "../../data/dashboardData";

type SidebarProps = {
	previewRole: WorkspaceRole;
	className?: string;
	onNavigate?: () => void;
};

const Sidebar = ({ previewRole, className, onNavigate }: SidebarProps) => {
	const visibleItems = sidebarItems.filter(
		(item) => !item.roles || item.roles.includes(previewRole),
	);

	return (
		<aside
			className={cn(
				"flex min-h-full flex-col rounded-[28px] border border-[color:var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm",
				className,
			)}
		>
			<div className="border-b border-[color:var(--border)] px-4 py-5">
				<div className="inline-flex rounded-full border border-[color:var(--blue-border)] bg-[var(--blue-bg)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--blue-text)]">
					{getRoleLabel(previewRole)} workspace
				</div>
				<h2 className="mt-4 text-lg font-semibold tracking-tight text-[var(--text-primary)]">
					Academic OS
				</h2>
				<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
					Lessons, cohorts, progress, grading and follow-up in one place.
				</p>
			</div>

			<nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
				{["main", "teaching", "management"].map((group) => {
					const items = visibleItems.filter((item) => item.group === group);

					if (!items.length) return null;

					return (
						<div key={group}>
							<p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
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
															? "bg-[var(--blue-bg)] text-[var(--blue-text)]"
															: "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]",
													)
												}
											>
												<Icon
													size={18}
													className="mt-0.5 shrink-0 transition"
												/>
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

			<div className="border-t border-[color:var(--border)] p-4">
				<div className="rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4">
					<p className="text-sm font-semibold text-[var(--text-primary)]">
						Grade engine
					</p>
					<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
						Final score is prepared from lesson progress, attendance and quiz accuracy.
					</p>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
