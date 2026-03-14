import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { ToggleThemeButton } from "../atoms/DarkThemeButton";

export const ToggleTheme = () => {
	const { theme, setTheme } = useTheme();

	return (
		<ToggleThemeButton
			title="dark theme"
			onclick={() => setTheme(theme === "light" ? "dark" : "light")}
		>
			{theme === "light" ? (
				<MoonIcon className="text-(--text-primary)" />
			) : (
				<SunIcon className="text-(--text-primary)" />
			)}
		</ToggleThemeButton>
	);
};
