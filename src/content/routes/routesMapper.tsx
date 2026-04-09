import type { JSX } from "react";
import type { ActionFunction, LoaderFunction } from "react-router-dom";
import LearnAlgorithmsLayout from "../../features/programming/algorithms/components/layout/LearnAlgorithmsLayout";

export type RouteObject = {
	path?: string;
	element?: JSX.Element;
	children?: RouteObject[];
	loader?: LoaderFunction;
	action?: ActionFunction;
	errorElement?: React.ReactNode;
	index?: boolean;
};
export const algorithmsRoutesMapper: RouteObject[] = [
	{
		path: "algorithms",
		element: <LearnAlgorithmsLayout />,
		children: [],
	},
];
