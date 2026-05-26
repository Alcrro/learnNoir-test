import { cn } from "../../../../libs/utils/cn";
import type { ExplanationStatus } from "../../../../../../shared/src/theory-level-explanation";
import { STATUS_ICON } from "../../lib/theoryLevelMeta";

type Props = { status: ExplanationStatus };

export function LevelStatusDot({ status }: Props) {
	return (
		<span
			className={cn(
				"absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] font-bold",
				status === "teacher" && "bg-green-500 text-white",
				status === "ai" && "bg-purple-500 text-white",
				status === "empty" && "bg-(--border) text-(--text-muted)",
			)}
		>
			{STATUS_ICON[status]}
		</span>
	);
}
