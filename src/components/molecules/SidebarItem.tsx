import { NavLink } from "react-router-dom";
import { cn } from "../../libs/utils/cn";
import {
	navItemActive,
	navItemBase,
	navItemInactive,
} from "../styles/navbarVariants";

export type SidebarItemProps = {
	id: string;
	name: string;
	path: string;
};
const SidebarItem = ({ id, name, path }: SidebarItemProps) => {
	return (
		<NavLink
			key={id}
			to={path}
			className={({ isActive }) =>
				cn(navItemBase, isActive ? navItemActive : navItemInactive)
			}
		>
			{({ isActive }) => (
				<>
					{isActive && (
						<span className="absolute left-0 h-5 w-1 rounded-r bg-(--btn-primary-bg)" />
					)}
					{name}
				</>
			)}
		</NavLink>
	);
};

export default SidebarItem;
