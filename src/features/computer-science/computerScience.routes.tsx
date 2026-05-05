import { RouteObject } from "react-router-dom";
import { slugToText } from "../../libs/utils/slugToText";
import { validateCategory } from "../../libs/utils/validateCategory";
import ModulesListPage from "../modules/pages/ModulesListPage";
import LessonListPage from "../lessons/pages/LessonListPage";
import LessonPage from "../lessons/pages/LessonPage";
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
					// :lessonId holds the lesson slug — resolved to a full lesson via GET /lessons/slug/:slug
					path: ":lessonId",
					element: <LessonPage />,
					handle: {
						crumb: (_: unknown, params: { lessonId?: string }) =>
							params.lessonId ? slugToText(params.lessonId) : "Unknown",
					},
				},
			],
		},
	],
};
