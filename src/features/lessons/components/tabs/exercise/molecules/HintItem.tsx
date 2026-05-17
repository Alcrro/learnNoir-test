import { Eye } from "lucide-react";
import { cn } from "../../../../../../libs/utils/cn";

type Props = {
	index: number;
	text: string;
	revealed: boolean;
	onReveal: () => void;
};

export function HintItem({ index, text, revealed, onReveal }: Props) {
	return (
		<div className="rounded-lg border border-(--border) overflow-hidden">
			<div className="flex items-center gap-2 px-3 py-2 bg-(--surface)">
				<span className="text-xs font-semibold text-(--text-muted)">Hint {index + 1}</span>
				{!revealed && (
					<button
						onClick={onReveal}
						className="ml-auto flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300 transition-colors"
					>
						<Eye className="h-3 w-3" />
						Dezvăluie
					</button>
				)}
			</div>
			<div className="px-3 py-2.5 text-sm text-(--text-secondary) leading-relaxed">
				{revealed ? (
					text
				) : (
					<span
						className={cn(
							"cursor-pointer select-none rounded transition-all duration-200",
							"text-transparent bg-(--border) blur-[4px] hover:blur-[3px]",
						)}
						onClick={onReveal}
					>
						{text}
					</span>
				)}
			</div>
		</div>
	);
}
