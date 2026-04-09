import { RouteObject } from "react-router-dom";
import MathPage from "../pages/MathPage";

export const mathematics: RouteObject = {
	path: "mathematics",
	handle: { crumb: "Mathematics" },
	children: [
		{
			path: "thales",
			handle: { crumb: "Thales" },
			element: <MathPage />,
		},
	],
};
