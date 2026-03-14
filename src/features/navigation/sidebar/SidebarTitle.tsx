import { formatThemeKey } from "../../../libs/utils/formatThemeKey";

const SidebarTitle = ({ themeKey }: { themeKey: string }) => {
	const formattedThemeKey = formatThemeKey(themeKey);
	return (
		<h2 className="text-sm font-semibold tracking-wide text-(--text-secondary) uppercase">
			{formattedThemeKey}
		</h2>
	);
};

export default SidebarTitle;
