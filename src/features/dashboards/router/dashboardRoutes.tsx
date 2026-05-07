import { RouteObject } from "react-router-dom";
import Analytics from "../components/Analytics";
import Courses from "../components/Courses";
import Settings from "../components/Settings";
import LessonsPage from "../pages/LessonsPage";
import OverviewPage from "../pages/OverviewPage";
import StudentsPage from "../pages/StudentsPage";
import { requireAuth } from "../../../hooks/requireAuth";
import Dashboard from "../../../pages/Dashboard";

export const dashboardRoutes: RouteObject = {
	path: "/dashboard",
	loader: requireAuth,
	element: <Dashboard />,
	children: [
		{ index: true, element: <OverviewPage /> },
		{ path: "courses", element: <Courses /> },
		{ path: "lessons", element: <LessonsPage /> },
		{ path: "settings", element: <Settings /> },
		{ path: "students", element: <StudentsPage /> },
		{ path: "analytics", element: <Analytics /> },
	],
};
