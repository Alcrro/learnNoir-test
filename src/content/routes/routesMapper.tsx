import type { JSX } from "react";
import type { ActionFunction, LoaderFunction } from "react-router-dom";
import LearnAlgorithmsLayout from "../../components/layouts/LearnAlgorithmsLayout";

type RouteObject = {
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
