import * as Sentry from "@sentry/react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { ThemeProvider } from "./context/ThemeProvider.tsx";

Sentry.init({
	dsn: import.meta.env.VITE_SENTRY_DSN as string | undefined,
	environment: import.meta.env.MODE,
	tracesSampleRate: 0.1,
	replaysSessionSampleRate: 0,
	replaysOnErrorSampleRate: 0,
	enabled: !!import.meta.env.VITE_SENTRY_DSN,
});

createRoot(document.getElementById("root")!).render(
	<ThemeProvider>
		<RouterProvider router={router} />
	</ThemeProvider>,
);
