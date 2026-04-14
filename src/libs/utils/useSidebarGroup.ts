type GroupableItem = {
	group?: string;
};

export function useSidebarGroup<T extends GroupableItem>(items: T[]) {
	const grouped = Object.entries(
		items.reduce<Record<string, T[]>>((acc, item) => {
			const key = item.group ?? "default";

			if (!acc[key]) acc[key] = [];

			acc[key].push(item);
			return acc;
		}, {}),
	).map(([category, items]) => ({
		category,
		items,
	}));

	return { grouped };
}
