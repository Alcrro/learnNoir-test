import SidebarItem, { type SidebarItemProps } from "./SidebarItem";

type SidebarCategoryProps = {
	category: string;
	items: SidebarItemProps[];
};

const SidebarCategory = ({ category, items }: SidebarCategoryProps) => {
	return (
		<div className="space-y-2">
			<div className="text-left text-(--text-muted) capitalize text-xs px-2">
				{category} - {items.length}
			</div>

			<div className="flex flex-col gap-1 bg-(--bg-cards) rounded-md">
				{items.map((item) => (
					<div
						className="flex gap-2 items-center"
						key={item.id}
					>
						<div className="item-status size-2 rounded-full bg-(--text-muted)"></div>
						<SidebarItem {...item} />
					</div>
				))}
			</div>
		</div>
	);
};

export default SidebarCategory;
