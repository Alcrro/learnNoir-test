import type { CSSProperties } from "react";
import { STEP_COLORS } from "../lib/stepColors";

interface TempRowProps {
	tempValue: number | null | undefined;
}

export function TempRow({ tempValue }: TempRowProps) {
	const amber = STEP_COLORS.amber;
	const hasValue = tempValue != null;

	const style: CSSProperties = {
		borderColor: hasValue ? amber : "var(--border)",
		color: hasValue ? amber : "transparent",
		backgroundColor: hasValue ? `${amber}18` : "transparent",
		boxShadow: hasValue ? `0 0 10px ${amber}40` : "none",
		borderStyle: hasValue ? "solid" : "dashed",
	};

	return (
		<div className="flex flex-col gap-2">
			<span className="font-mono text-xs text-(--text-secondary)">int temp</span>
			<div className="flex items-center gap-1.5">
				<div
					className="w-10 h-10 flex items-center justify-center rounded-lg border-2 font-bold text-sm transition-all duration-200"
					style={style}
				>
					{tempValue ?? ""}
				</div>
				{!hasValue && (
					<span className="text-[10px] font-mono italic text-(--text-muted)">empty</span>
				)}
			</div>
		</div>
	);
}
