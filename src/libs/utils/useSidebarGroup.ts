import type { SidebarItem } from "../../content/sidebarData";

type SidebarGroup = SidebarItem & { progress: number };
export function useSidebarGroup(items: SidebarItem[]) {
	const grouped = Object.entries(
		items.reduce<Record<string, SidebarGroup[]>>((acc, item) => {
			const key = item.group ?? "default";

			if (!acc[key]) acc[key] = [];

			acc[key].push({ ...item, progress: 0 });
			return acc;
		}, {}),
	).map(([category, items]) => ({
		category,
		items,
	}));

	return { grouped };
}
