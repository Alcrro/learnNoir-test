import SidebarItem, { type SidebarItemProps } from "./SidebarItem";

type SidebarCategoryProps = {
	category: string;
	items: SidebarItemProps[];
};

const SidebarCategory = ({ category, items }: SidebarCategoryProps) => {
	return (
		<div className="space-y-2">
			<div className="text-left text-(--text-muted) capitalize text-xs px-2">
				{category}
			</div>

			<div className="flex flex-col gap-1 bg-(--bg-color) rounded-md">
				{items.map((item) => (
					<SidebarItem
						key={item.id}
						{...item}
					/>
				))}
			</div>
		</div>
	);
};

export default SidebarCategory;
