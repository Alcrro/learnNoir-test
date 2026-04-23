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
	description: string;
	roles?: ("teacher" | "student" | "admin")[];
	group?: "main" | "teaching" | "management";
};
export const sidebarItems: SidebarItem[] = [
	{
		id: "dashboard",
		label: "Overview",
		path: "/dashboard",
		icon: "dashboard",
		description: "Command center",
		group: "main",
	},

	{
		id: "courses",
		label: "Courses",
		path: "/dashboard/courses",
		icon: "courses",
		description: "Tracks and cohorts",
		group: "teaching",
		roles: ["teacher", "student"],
	},

	{
		id: "lessons",
		label: "Lessons",
		path: "/dashboard/lessons",
		icon: "lessons",
		description: "Live, draft and review",
		group: "teaching",
		roles: ["teacher", "student"],
	},

	{
		id: "students",
		label: "Students",
		path: "/dashboard/students",
		icon: "students",
		description: "Individual progress",
		group: "management",
		roles: ["teacher"],
	},

	{
		id: "analytics",
		label: "Analytics",
		path: "/dashboard/analytics",
		icon: "analytics",
		description: "Progress intelligence",
		group: "management",
		roles: ["teacher", "student"],
	},

	{
		id: "settings",
		label: "Settings",
		path: "/dashboard/settings",
		icon: "settings",
		description: "Workspace preferences",
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
