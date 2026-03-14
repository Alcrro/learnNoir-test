import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ReactNode } from "react";
export const ThemeProveier = ({ children }: { children: ReactNode }) => {
	return (
		<NextThemeProvider
			attribute={"class"}
			defaultTheme="system"
			enableSystem
		>
			{children}
		</NextThemeProvider>
	);
};
