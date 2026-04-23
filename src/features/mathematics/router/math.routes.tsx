import { RouteObject } from "react-router-dom";
import MathPage from "../pages/MathPage";
import MathLayout from "../components/layouts/MathLayout";

export const mathematicsRoutes: RouteObject = {
	path: "mathematics",
	handle: { crumb: "Mathematics", subject: "mathematics" },
	element: <MathLayout />,
	children: [
		{
			path: "thales",
			handle: { crumb: "Thales" },
			element: <MathPage />,
		},
	],
};
