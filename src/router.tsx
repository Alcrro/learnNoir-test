import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./public/home/Home";
import AlgorithmPage from "./features/programming/pages/AlgorithmPage";
import LearnAlgorithmsLayout from "./components/layouts/LearnAlgorithmsLayout";
import { validateCategory } from "./libs/utils/validateCategory";
import { validateItem } from "./libs/utils/validateItem";
import RouteErrorPage from "./RouteErrorPage";

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <RouteErrorPage />,
    children: [
      { path: "/", element: <Home /> },

      {
        path: "learn",
        children: [
          {
            path: "programming",
            children: [
              {
                path: ":category",
                element: <LearnAlgorithmsLayout />,
                loader: validateCategory,
                children: [
                  {
                    path: ":itemId",
                    element: <AlgorithmPage />,
                    loader: validateItem,
                  },
                ],
              },
            ],
          },
          {
            path: "mathematics",
          },
        ],
      },
    ],
  },
]);
