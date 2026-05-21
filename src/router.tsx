import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import RouteErrorPage from "./RouteErrorPage";
import { authRoutes } from "./features/auth/router/auth.routes";
import { dashboardRoutes } from "./features/dashboards/router/dashboardRoutes";
import { computerScienceRoutes } from "./features/computer-science/computerScience.routes";
import { mathematicsRoutes } from "./features/mathematics/router/math.routes";
import { subjectLoader } from "./features/subjects/lib/subjectLoader";
import { slugToText } from "./libs/utils/slugToText";

const Home = lazy(() => import("./public/home/Home"));
const Subjects = lazy(() => import("./features/auth/Subjects"));
const SubjectsLayout = lazy(() => import("./features/subjects/components/layouts/SubjectsLayout"));
const SubjectsPage = lazy(() => import("./features/subjects/pages/SubjectsPage"));
const CategoriesListPage = lazy(() => import("./features/categories/pages/CategoriesListPage"));
const PaymentSuccessPage = lazy(() => import("./features/subscriptions/pages/PaymentSuccessPage").then((m) => ({ default: m.PaymentSuccessPage })));
const PricingPage = lazy(() => import("./features/subscriptions/pages/PricingPage").then((m) => ({ default: m.PricingPage })));

const Fallback = () => null;

const s = (el: React.ReactNode) => <Suspense fallback={<Fallback />}>{el}</Suspense>;

export const router = createBrowserRouter([
	{
		element: <App />,
		errorElement: <RouteErrorPage />,
		children: [
			{ path: "/", element: s(<Home />) },
			{ path: "pricing", element: s(<PricingPage />) },
			{ path: "payment/success", element: s(<PaymentSuccessPage />) },
			authRoutes,
			dashboardRoutes,
			{
				path: "subjects",
				element: s(<Subjects />),
				handle: { crumb: "subjects", subject: "subjects" },
				children: [
					{ index: true, loader: subjectLoader, element: s(<SubjectsLayout />) },
					{
						path: ":subject",
						handle: {
							crumb: (_: unknown, params: { subject?: string }) =>
								params.subject ? slugToText(params.subject) : "Unknown",
						},
						element: s(<SubjectsPage />),
						children: [
							{ index: true, element: s(<CategoriesListPage />) },
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
