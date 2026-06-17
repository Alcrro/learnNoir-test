import { LayoutDashboard } from "lucide-react";

type Props = {
	onClick: () => void;
};

export function TheoryEditLayoutButton({ onClick }: Props) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-(--border) px-3 py-2 text-xs text-(--text-secondary) hover:bg-(--surface-hover) transition-colors"
		>
			<LayoutDashboard size={13} />
			Edit Layout
		</button>
	);
}
