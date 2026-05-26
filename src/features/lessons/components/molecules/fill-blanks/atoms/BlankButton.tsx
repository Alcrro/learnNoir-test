type Props = {
	id: number;
	answer: string | undefined;
	correct: string;
	isOpen: boolean;
	onToggle: (id: number) => void;
};

export function BlankButton({ id, answer, correct, isOpen, onToggle }: Props) {
	const answered = answer !== undefined;
	const isCorrect = answered && answer === correct;

	const borderColor = answered
		? isCorrect ? "var(--lt-code-blank-correct)" : "var(--lt-code-blank-wrong)"
		: "var(--lt-code-blank-idle)";
	const textColor = borderColor;

	return (
		<button
			type="button"
			onClick={() => { if (!answered) onToggle(id); }}
			style={{
				display: "inline-block",
				padding: "0 8px",
				margin: "0 2px",
				borderRadius: 4,
				border: `1px ${answered ? "solid" : "dashed"} ${borderColor}`,
				background: isOpen ? `color-mix(in srgb, ${borderColor} 15%, transparent)` : "transparent",
				color: textColor,
				fontFamily: "inherit",
				fontSize: "inherit",
				lineHeight: "inherit",
				cursor: answered ? "default" : "pointer",
				whiteSpace: "nowrap",
				transition: "background 0.15s",
			}}
		>
			{answered ? answer : "___"}
		</button>
	);
}
