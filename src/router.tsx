import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./public/home/Home";
import RouteErrorPage from "./RouteErrorPage";
import { authRoutes } from "./features/auth/router/auth.routes";
import { dashboardRoutes } from "./features/dashboards/router/dashboardRoutes";
import { computerScienceRoutes } from "./subjects/computer-science/computerScience.routes";
import { mathematicsRoutes } from "./subjects/mathematics/router/math.routes";
import Subjects from "./features/auth/Subjects";
import SubjectsLayout from "./features/subjects/components/layouts/SubjectsLayout";
import SubjectsPage from "./features/subjects/pages/SubjectsPage";
import CategoriesListPage from "./features/categories/pages/CategoriesListPage";
import { subjectLoader } from "./features/subjects/lib/subjectLoader";
import { slugToText } from "./libs/utils/slugToText";
import { PaymentSuccessPage } from "./features/subscriptions/pages/PaymentSuccessPage";

export const router = createBrowserRouter([
	{
		element: <App />,
		errorElement: <RouteErrorPage />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "payment/success", element: <PaymentSuccessPage /> },
			authRoutes,
			dashboardRoutes,
			{
				path: "subjects",
				element: <Subjects />,
				handle: { crumb: "subjects", subject: "subjects" },
				children: [
					{ index: true, loader: subjectLoader, element: <SubjectsLayout /> },
					{
						path: ":subject",
						handle: {
							crumb: (_: unknown, params: { subject?: string }) =>
								params.subject ? slugToText(params.subject) : "Unknown",
						},

						element: <SubjectsPage />,
						children: [
							{ index: true, element: <CategoriesListPage /> },
							{
								children: [computerScienceRoutes, mathematicsRoutes],
							},
						],
					},
				],
			},
		],
	},
]);
