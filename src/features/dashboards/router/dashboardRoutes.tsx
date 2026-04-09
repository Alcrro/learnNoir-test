import { Settings } from "lucide-react";
import { RouteObject } from "react-router-dom";
import Analytics from "../components/Analytics";
import Courses from "../components/Courses";
import Lessons from "../components/Lessons";
import Overview from "../components/Overview";
import Students from "../components/Students";
import { requireAuth } from "../../../hooks/requireAuth";
import Dashboard from "../../../pages/Dashboard";

export const dashboardRoutes: RouteObject = {
	path: "/dashboard",
	loader: requireAuth,
	element: <Dashboard />,
	children: [
		{ index: true, element: <Overview /> },
		{ path: "courses", element: <Courses /> },
		{ path: "lessons", element: <Lessons /> },
		{ path: "settings", element: <Settings /> },
		{ path: "students", element: <Students /> },
		{ path: "analytics", element: <Analytics /> },
	],
};
