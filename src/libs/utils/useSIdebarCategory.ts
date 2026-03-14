import { sidebarMap, type SidebarItem } from "../../content/sidebarData";

export function useSidebarCategory(pathname: string) {
  let themeKey: string | null = null;

  if (pathname.includes("/algorithms")) themeKey = "algorithms";
  else if (pathname.includes("/data-structures")) themeKey = "dataStructure";

  const items: SidebarItem[] = themeKey ? sidebarMap[themeKey] : [];

  return { themeKey: !themeKey ? "Unknown" : themeKey, items };
}
