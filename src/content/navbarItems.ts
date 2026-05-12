import { BookOpen, Compass, LayoutDashboard } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavigationItem = {
	label: string;
	to: string;
	icon: LucideIcon;
	description: string;
	protected?: boolean;
};

export const NAV_LINK_BASE =
	"inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200";

export const navigationItems: NavigationItem[] = [
	{
		label: "Discover",
		to: "/",
		icon: Compass,
		description: "Landing and entry point",
	},
	{
		label: "Subjects",
		to: "/subjects",
		icon: BookOpen,
		description: "Browse learning tracks",
	},
	{
		label: "Dashboard",
		to: "/dashboard",
		icon: LayoutDashboard,
		description: "Progress and workspace",
		protected: true,
	},
];
