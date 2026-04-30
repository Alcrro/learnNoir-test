import { RouteObject } from "react-router-dom";
import MathLayout from "../components/layouts/MathLayout";
import ModulesLayout from "../../modules/components/layouts/ModulesLayout";
import { slugToText } from "../../../libs/utils/slugToText";
import { validateModule } from "../../../libs/utils/validateModules";
import ModulesPage from "../../modules/pages/ModulesPage";

export const mathematicsRoutes: RouteObject = {
	path: "mathematics",
	handle: { crumb: "Mathematics", subject: "mathematics" },
	element: <MathLayout />,
	children: [
		{ index: true, element: <ModulesLayout /> },
		{
			children: [
				{
					index: true,
					loader: validateModule,
					handle: {
						crumb: (_: unknown, params: { modulesId?: string }) =>
							params.modulesId ? slugToText(params.modulesId) : "Unknown",
					},
					path: ":modulesId",
					element: <ModulesPage />,
				},
			],
		},
	],
};
