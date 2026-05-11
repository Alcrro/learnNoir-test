import { Loader2, Sparkles } from "lucide-react";

type Props = {
	onClick: () => void;
	disabled: boolean;
	loading: boolean;
};

export function AISuggestButton({ onClick, disabled, loading }: Props) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled || loading}
			className="flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-medium transition disabled:opacity-40 enabled:cursor-pointer enabled:text-[var(--blue)] enabled:hover:bg-[var(--blue)]/10 disabled:text-[var(--text-muted)]"
		>
			{loading ? (
				<Loader2 className="h-3.5 w-3.5 animate-spin" />
			) : (
				<Sparkles className="h-3.5 w-3.5" />
			)}
			{loading ? "Thinking…" : "Suggest with AI"}
		</button>
	);
}
