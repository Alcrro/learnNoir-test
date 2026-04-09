import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./public/home/Home";
import RouteErrorPage from "./RouteErrorPage";
import { authRoutes } from "./features/auth/router/auth.routes";
import { dashboardRoutes } from "./features/dashboards/router/dashboardRoutes";
import { programmingRoutes } from "./features/programming/programming.routes";
import { mathematics } from "./features/mathematics/router/math.routes";
import Subjects from "./features/auth/Subjects";

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
				children: [programmingRoutes, mathematics],
			},
		],
	},
]);
