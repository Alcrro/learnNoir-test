import { NavLink } from "react-router-dom";
import { cn } from "../../libs/utils/cn";
import { NAV_LINK_BASE, type NavigationItem } from "../../content/navbarItems";

type Props = {
	items: NavigationItem[];
};

export function NavbarDesktopNav({ items }: Props) {
	return (
		<div className="hidden flex-1 items-center justify-center lg:flex">
			<ul className="flex items-center gap-2 rounded-2xl border border-(--border) bg-(--bg-secondary) p-1">
				{items.map((item) => {
					const Icon = item.icon;
					return (
						<li key={item.to}>
							<NavLink
								to={item.to}
								end={item.to === "/"}
								className={({ isActive }) =>
									cn(
										NAV_LINK_BASE,
										isActive
											? "bg-(--blue-bg) text-(--blue-text)"
											: "text-(--text-secondary) hover:bg-(--bg-elevated) hover:text-(--text-primary)",
									)
								}
							>
								<Icon className="h-4 w-4" />
								{item.label}
							</NavLink>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
