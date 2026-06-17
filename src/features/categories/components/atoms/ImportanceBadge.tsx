import { cn } from "../../../../libs/utils/cn";

type Importance = "essential" | "normal" | "optional";

const CONFIG: Record<Importance, { label: string; className: string }> = {
	essential: {
		label: "Essential",
		className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
	},
	normal: {
		label: "Normal",
		className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
	},
	optional: {
		label: "Optional",
		className: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
	},
};

interface ImportanceBadgeProps {
	importance: Importance;
	className?: string;
}

export function ImportanceBadge({ importance, className }: ImportanceBadgeProps) {
	const { label, className: colorClass } = CONFIG[importance];
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
				colorClass,
				className,
			)}
		>
			{label}
		</span>
	);
}
