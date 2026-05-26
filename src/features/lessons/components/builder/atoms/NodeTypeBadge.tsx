import { cn } from "../../../../../libs/utils/cn";

type Props = {
	nodeType: string;
	className?: string;
};

export function NodeTypeBadge({ nodeType, className }: Props) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded px-1.5 py-0.5 text-xs font-mono",
				"bg-(--surface-2) text-(--text-secondary)",
				className,
			)}
		>
			{nodeType}
		</span>
	);
}
