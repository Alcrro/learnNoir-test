import { LayoutGrid, GitBranch } from "lucide-react";
import { cn } from "../../libs/utils/cn";

type ViewMode = "grid" | "roadmap";

interface ViewToggleProps {
	value: ViewMode;
	onChange: (mode: ViewMode) => void;
	disabled?: boolean;
}

export function ViewToggle({ value, onChange, disabled = false }: ViewToggleProps) {
	return (
		<div
			className={cn(
				"flex items-center gap-1 rounded-lg border border-(--border) bg-(--bg-primary) p-1",
				disabled && "pointer-events-none opacity-40",
			)}
		>
			<button
				onClick={() => onChange("grid")}
				className={cn(
					"flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
					value === "grid"
						? "bg-(--bg-secondary) text-(--text-primary) shadow-sm"
						: "text-(--text-secondary) hover:text-(--text-primary)",
				)}
				aria-pressed={value === "grid"}
			>
				<LayoutGrid className="h-4 w-4" />
				Grid
			</button>
			<button
				onClick={() => onChange("roadmap")}
				className={cn(
					"flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
					value === "roadmap"
						? "bg-(--bg-secondary) text-(--text-primary) shadow-sm"
						: "text-(--text-secondary) hover:text-(--text-primary)",
				)}
				aria-pressed={value === "roadmap"}
			>
				<GitBranch className="h-4 w-4" />
				Roadmap
			</button>
		</div>
	);
}
