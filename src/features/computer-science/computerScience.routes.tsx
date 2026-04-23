import { RouteObject } from "react-router-dom";
import LearnAlgorithmsLayout from "./algorithms/components/layout/LearnAlgorithmsLayout";
import { slugToText } from "../../libs/utils/slugToText";
import { validateCategory } from "../../libs/utils/validateCategory";
import { validateItem } from "../../libs/utils/validateItem";
import AlgorithmPage from "./algorithms/pages/AlgorithmPage";
import ComputerScience from "./pages/ComputerScience";
import AlgorithmsListPage from "./algorithms/pages/AlgorithmsListPage";

export const computerScienceRoutes: RouteObject = {
	path: "computer-science",
	handle: { crumb: "computer-science", subject: "computer-science" },
	element: <ComputerScience />,
	children: [
		{
			path: ":category",
			element: <LearnAlgorithmsLayout />,
			loader: validateCategory,
			handle: {
				crumb: (_: unknown, params: { category?: string }) =>
					params.category ? slugToText(params.category) : "Unknown",
			},
			children: [
				{ index: true, element: <AlgorithmsListPage /> },
				{
					path: ":lessonId",
					element: <AlgorithmPage />,
					loader: validateItem,
					handle: {
						crumb: (_: unknown, params: { lessonId?: string }) =>
							params.lessonId ? slugToText(params.lessonId) : "Unknown",
					},
				},
			],
		},
	],
};
