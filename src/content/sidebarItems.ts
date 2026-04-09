import {
	LayoutDashboard,
	BookOpen,
	FileText,
	Users,
	BarChart,
	Settings,
	LogOut,
} from "lucide-react";

type SidebarItem = {
	id: string;
	label: string;
	path: string;
	icon: keyof typeof Icons;
	roles?: ("teacher" | "student" | "admin")[];
	group?: "main" | "teaching" | "management";
};
export const sidebarItems: SidebarItem[] = [
	{
		id: "dashboard",
		label: "Overview",
		path: "/dashboard",
		icon: "dashboard",
		group: "main",
	},

	{
		id: "courses",
		label: "Courses",
		path: "/dashboard/courses",
		icon: "courses",
		group: "teaching",
		roles: ["teacher"],
	},

	{
		id: "lessons",
		label: "Lessons",
		path: "/dashboard/lessons",
		icon: "lessons",
		group: "teaching",
		roles: ["teacher"],
	},

	{
		id: "students",
		label: "Students",
		path: "/dashboard/students",
		icon: "students",
		group: "management",
		roles: ["teacher"],
	},

	{
		id: "analytics",
		label: "Analytics",
		path: "/dashboard/analytics",
		icon: "analytics",
		group: "management",
		roles: ["teacher"],
	},

	{
		id: "settings",
		label: "Settings",
		path: "/dashboard/settings",
		icon: "settings",
		group: "main",
	},

	{
		id: "logout",
		label: "Logout",
		path: "/logout",
		icon: "logout",
		group: "main",
	},
];

export const Icons = {
	dashboard: LayoutDashboard,
	courses: BookOpen,
	lessons: FileText,
	students: Users,
	analytics: BarChart,
	settings: Settings,
	logout: LogOut,
};
