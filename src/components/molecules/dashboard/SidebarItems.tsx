import { Link, useLocation } from "react-router-dom";
import { Icons, sidebarItems } from "../../../content/sidebarItems";

const Sidebar = () => {
	const location = useLocation();

	return (
		<aside className="min-h-full bg-(--bg-color) text-zinc-200 border-r rounded-md border-zinc-800 flex flex-col">
			{/* Navigation */}
			<nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
				{["main", "teaching", "management"].map((group) => {
					const items = sidebarItems.filter((i) => i.group === group);

					if (!items.length) return null;

					return (
						<div key={group}>
							<p className="px-3 mb-2 text-xs uppercase text-zinc-500 tracking-wider">
								{group}
							</p>

							<ul className="space-y-1">
								{items.map((item) => {
									const Icon = Icons[item.icon];
									const isActive = location.pathname.endsWith(item.path);

									return (
										<li key={item.id}>
											<Link
												to={item.path}
												className={`
													group flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
													${
														isActive
															? "bg-(--bg-tertiary) text-white"
															: "text-zinc-400 hover:bg-zinc-900 hover:text-white"
													}
												`}
											>
												<Icon
													size={18}
													className={`transition ${
														isActive ? "text-white" : "text-zinc-500 group-hover:text-white"
													}`}
												/>

												<span className="truncate">{item.label}</span>

												{/* Active indicator */}
												{isActive && (
													<div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
												)}
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
					);
				})}
			</nav>

			{/* Footer */}
			<div className="p-4 border-t border-zinc-800">
				<Link
					to="/dashboard/settings"
					className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white"
				>
					{(() => {
						const Icon = Icons.settings;
						return <Icon size={18} />;
					})()}
					Settings
				</Link>
			</div>
		</aside>
	);
};

export default Sidebar;
