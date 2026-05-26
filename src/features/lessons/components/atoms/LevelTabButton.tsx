import { cn } from "../../../../libs/utils/cn";
import type { ExplanationLevel } from "../../api/theoryLevelApi";
import type { ExplanationStatus } from "@shared/theory-level-explanation";
import { LEVEL_LABELS, LEVEL_TOOLTIPS } from "../../lib/theoryLevelMeta";
import { LevelStatusDot } from "./LevelStatusDot";

type Props = {
	level: ExplanationLevel;
	isActive: boolean;
	status: ExplanationStatus;
	showDot: boolean;
	onClick: () => void;
};

export function LevelTabButton({ level, isActive, status, showDot, onClick }: Props) {
	return (
		<button
			onClick={onClick}
			title={LEVEL_TOOLTIPS[level]}
			className={cn(
				"relative shrink-0 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
				isActive
					? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
					: "border-(--border) text-(--text-secondary) hover:bg-(--surface-hover)",
			)}
		>
			{LEVEL_LABELS[level]}
			{showDot && <LevelStatusDot status={status} />}
		</button>
	);
}
