import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { ThemeProveier } from "./context/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<ThemeProveier>
		<RouterProvider router={router} />,
	</ThemeProveier>,
);
