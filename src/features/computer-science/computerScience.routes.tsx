import { RouteObject } from "react-router-dom";
import { slugToText } from "../../libs/utils/slugToText";
import { validateCategory } from "../../libs/utils/validateCategory";
import { lessonLoader } from "../../libs/utils/routeLoader/lessonLoader";
import AlgorithmPage from "./algorithms/pages/AlgorithmPage";
import ModulesListPage from "../modules/pages/ModulesListPage";
import LessonListPage from "../lessons/pages/LessonListPage";
import { moduleLoader } from "../lessons/utils/moduleLoader";

export const computerScienceRoutes: RouteObject = {
	path: ":category",

	loader: validateCategory,
	handle: {
		crumb: (_: unknown, params: { category?: string }) =>
			params.category ? slugToText(params.category) : "Unknown",
	},
	children: [
		{ index: true, loader: moduleLoader, element: <ModulesListPage /> },
		{
			path: ":module",

			children: [
				{
					index: true,
					element: <LessonListPage />,
					handle: {
						crumb: (_: unknown, params: { module?: string }) =>
							params.module ? slugToText(params.module) : "Unknown",
					},
				},

				{
					path: ":lessonId",
					element: <AlgorithmPage />,
					loader: lessonLoader,
				},
			],
		},
	],
};
