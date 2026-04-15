import { useLocation } from "react-router-dom";
import { useSidebarGroup } from "../../../../libs/utils/useSidebarGroup";
import { useSidebarCategory } from "../../../../libs/utils/useSidebarCategory";
import SidebarTitle from "./SidebarTitle";
import SidebarCategory from "../../../../components/molecules/SidebarCategory";

const Sidebar = () => {
	const location = useLocation();
	const { themeKey, items } = useSidebarCategory(location.pathname);
	const { grouped } = useSidebarGroup(items);

	return (
		<aside className="min-w-30 shrink-0 rounded-md max-md:hidden p-1 bg-(--bg-sidebar) rounded-l-md border-r border-(--border)">
			<div className="px-2 py-4 border-b border-(--border) mb-4">
				<SidebarTitle themeKey={themeKey} />
				<div className="total_progress py-2">
					<div className="progress_bar w-full h-2 border border-(--border-strong) rounded-md"></div>
					<div className="info text-(--text-muted) text-sm">
						<span>0 </span>
						<span>of </span>
						<span>{items.length} lessons</span>
					</div>
				</div>
			</div>

			<nav className="space-y-1 ml-2">
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
