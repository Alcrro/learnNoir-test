import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Toaster } from "../components/atoms/Toaster";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	return (
		<NextThemeProvider
			attribute={"class"}
			defaultTheme="light"
			enableSystem={false}
		>
			{children}
			<Toaster />
		</NextThemeProvider>
	);
};
