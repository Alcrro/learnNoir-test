import type { FC, ReactNode } from "react";
import DefaultButton from "./DefaultButton";

type ToggleThemeButtonProps = {
	title: string;
	onclick: () => void;
	children: ReactNode;
};
export const ToggleThemeButton: FC<ToggleThemeButtonProps> = ({
	title,
	onclick,
	children,
}) => {
	return (
		<DefaultButton
			variant="icon"
			title={title}
			onClick={onclick}
		>
			{children}
		</DefaultButton>
	);
};
