import type { ReactNode } from "react";
import { cn } from "../../../../../../libs/utils/cn";

interface ControlBtnProps {
	onClick: () => void;
	disabled?: boolean;
	title?: string;
	children: ReactNode;
}

export function ControlBtn({ onClick, disabled, title, children }: ControlBtnProps) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			title={title}
			className={cn(
				"flex items-center justify-center w-9 h-9 rounded-lg border transition-colors",
				"border-(--border) text-(--text-secondary)",
				"hover:text-(--text-primary) hover:border-(--text-muted)",
				"disabled:opacity-30 disabled:cursor-not-allowed",
			)}
		>
			{children}
		</button>
	);
}
