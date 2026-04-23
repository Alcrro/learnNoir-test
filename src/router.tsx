import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./public/home/Home";
import RouteErrorPage from "./RouteErrorPage";
import { authRoutes } from "./features/auth/router/auth.routes";
import { dashboardRoutes } from "./features/dashboards/router/dashboardRoutes";
import { computerScienceRoutes } from "./features/computer-science/computerScience.routes";
import { mathematicsRoutes } from "./features/mathematics/router/math.routes";
import Subjects from "./features/auth/Subjects";
import SubjectsLayout from "./components/organisms/layout/SubjectsLayout";

export const router = createBrowserRouter([
	{
		element: <App />,
		errorElement: <RouteErrorPage />,
		children: [
			{ path: "/", element: <Home /> },

			authRoutes,
			// { path: "/auth/login", element: <Login /> },
			// { path: "/auth/register", element: <Register /> },
			// authRoutes,
			dashboardRoutes,
			{
				path: "subjects",
				element: <Subjects />,

				children: [
					{ index: true, element: <SubjectsLayout /> },
					computerScienceRoutes,
					mathematicsRoutes,
				],
			},
		],
	},
]);
