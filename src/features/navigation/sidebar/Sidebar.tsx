import { useLocation } from "react-router-dom";
import { useSidebarGroup } from "../../../libs/utils/useSidebarGroup";
import { useSidebarCategory } from "../../../libs/utils/useSIdebarCategory";
import SidebarTitle from "./SidebarTitle";
import SidebarCategory from "../../../components/molecules/SidebarCategory";

const Sidebar = () => {
	const location = useLocation();
	const { themeKey, items } = useSidebarCategory(location.pathname);
	const { grouped } = useSidebarGroup(items);

	return (
		<aside className="w-60 max-lg:w-40 ml-2 shrink-0 rounded-md max-md:hidden p-1 bg-(--bg-sidebar) shadow-(--sidebar-box-shadow)">
			<div className="px-2 py-4">
				<SidebarTitle themeKey={themeKey} />
			</div>

			<nav className="space-y-1 ">
				{grouped.map((category) => (
					<SidebarCategory
						key={category.category}
						category={category.category}
						items={category.items}
					/>
				))}
			</nav>
		</aside>
	);
};

export default Sidebar;
