type Props = {
	variant: "generate" | "regenerate";
	isPending: boolean;
	disabled: boolean;
	onClick: () => void;
};

const CONFIG = {
	generate: {
		label: "Genereaza naratie",
		pendingLabel: "Se genereaza...",
		className: "rounded-lg bg-(--accent) px-5 py-2 text-sm font-medium text-white disabled:opacity-50",
	},
	regenerate: {
		label: "Regenereaza naratie",
		pendingLabel: "Se regenereaza...",
		className: "self-start text-xs text-(--text-muted) underline underline-offset-2 disabled:opacity-50",
	},
} as const;

export function AudioGenerateButton({ variant, isPending, disabled, onClick }: Props) {
	const { label, pendingLabel, className } = CONFIG[variant];
	return (
		<button type="button" onClick={onClick} disabled={disabled} className={className}>
			{isPending ? pendingLabel : label}
		</button>
	);
}
