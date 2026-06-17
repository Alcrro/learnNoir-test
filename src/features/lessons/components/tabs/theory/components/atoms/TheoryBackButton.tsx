type Props = {
	onClick: () => void;
};

export function TheoryBackButton({ onClick }: Props) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="self-start text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors"
		>
			← Înapoi la preview
		</button>
	);
}
