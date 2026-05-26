import { cn } from "../../../../../libs/utils/cn";
import { LEVELS, type LevelId } from "../lib/levelConfig";

type Props = {
	levelId: LevelId;
	size?: "sm" | "md";
};

export function LevelBadge({ levelId, size = "sm" }: Props) {
	const level = LEVELS.find((l) => l.id === levelId);
	if (!level) return null;

	return (
		<span
			className={cn(
				"inline-flex items-center rounded font-medium",
				level.color,
				size === "sm" ? "px-1.5 py-0.5 text-xs" : "px-2 py-1 text-sm",
			)}
			title={level.description}
		>
			{level.badge}
		</span>
	);
}
