import { NavLink } from "react-router-dom";
import { cn } from "../../libs/utils/cn";
import { NAV_LINK_BASE, type NavigationItem } from "../../content/navbarItems";

type Props = {
	item: NavigationItem;
	onClose: () => void;
};

export function NavbarMobileNavItem({ item, onClose }: Props) {
	const Icon = item.icon;
	return (
		<NavLink
			to={item.to}
			end={item.to === "/"}
			onClick={onClose}
			className={({ isActive }) =>
				cn(
					NAV_LINK_BASE,
					"justify-between rounded-2xl border border-(--border) px-4 py-3",
					isActive
						? "bg-(--blue-bg) text-(--blue-text)"
						: "bg-(--bg-secondary) text-(--text-secondary) hover:bg-(--bg-elevated) hover:text-(--text-primary)",
				)
			}
		>
			<span className="flex items-center gap-3">
				<Icon className="h-4 w-4" />
				{item.label}
			</span>
			<span className="text-xs text-(--text-muted)">{item.description}</span>
		</NavLink>
	);
}
