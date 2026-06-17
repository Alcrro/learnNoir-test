import type { CSSProperties } from "react";

interface ArrayBoxProps {
	color: string;
	isEmpty: boolean;
	value: number;
}

export function ArrayBox({ color, isEmpty, value }: ArrayBoxProps) {
	const style: CSSProperties = {
		borderColor: isEmpty ? `${color}40` : color,
		color: isEmpty ? "transparent" : color,
		backgroundColor: isEmpty ? "transparent" : `${color}18`,
		boxShadow: isEmpty ? "none" : `0 0 8px ${color}30`,
		borderStyle: isEmpty ? "dashed" : "solid",
		opacity: isEmpty ? 0.5 : 1,
	};

	return (
		<div
			className="w-10 h-10 flex items-center justify-center rounded-lg border-2 font-bold text-sm transition-all duration-200"
			style={style}
		>
			{isEmpty ? "" : value}
		</div>
	);
}
