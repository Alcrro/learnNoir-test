import type { SidebarItem } from "../../content/sidebarData";

export function useSidebarGroup(items: SidebarItem[]) {
  const grouped = Object.entries(
    items.reduce<Record<string, SidebarItem[]>>((acc, item) => {
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
