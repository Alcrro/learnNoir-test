import { NavLink, useLocation } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useSidebarGroup } from "../../../libs/utils/useSidebarGroup";
import { useSidebarCategory } from "../../../libs/utils/useSIdebarCategory";
import SidebarTitle from "./SidebarTitle";

const Sidebar = () => {
	const location = useLocation();
	const { themeKey, items } = useSidebarCategory(location.pathname);
	const { grouped } = useSidebarGroup(items);

	return (
		<aside className="w-60 max-lg:w-40 mx-2 shrink-0 shadow-md rounded-md max-md:hidden bg-(--bg-secondary) p-1">
			<div className="px-2 py-4">
				<SidebarTitle themeKey={themeKey} />
			</div>

			<nav className="p-1 space-y-1 ">
				{grouped.map((category) => (
					<Fragment key={category.category}>
						<div className="text-left text-(--text-muted) capitalize">
							{category.category}
						</div>
						{category.items.map((item) => (
							<NavLink
								key={item.id}
								to={item.path}
								className={({ isActive }) =>
									`block rounded-lg px-4 py-2 text-sm transition-all duration-200 ${
										isActive
											? "bg-(--btn-primary-bg) text-(--text-primary) font-medium shadow-sm"
											: "text-(--text-primary) hover:bg-(--btn-primary-hover) hover:text-(--text-primary)"
									}`
								}
							>
								{item.name}
							</NavLink>
						))}
					</Fragment>
				))}
			</nav>
		</aside>
	);
};

export default Sidebar;
