export type ConfidenceLevel = "low" | "medium" | "high";

type Option = { key: ConfidenceLevel; label: string; emoji: string };

const OPTIONS: Option[] = [
	{ key: "low", label: "Shaky", emoji: "😅" },
	{ key: "medium", label: "Getting it", emoji: "🤔" },
	{ key: "high", label: "Got it", emoji: "✓" },
];

type Props = {
	value: ConfidenceLevel | null;
	onChange: (v: ConfidenceLevel) => void;
};

export function ConfidenceRating({ value, onChange }: Props) {
	return (
		<div className="lt-confidence">
			<div className="lt-confidence__label">How well do you understand the steps?</div>
			<div className="lt-confidence__options">
				{OPTIONS.map((o) => (
					<button
						key={o.key}
						className={[
							"lt-confidence__option",
							`lt-confidence__option--${o.key}`,
							value === o.key ? "lt-confidence__option--active" : "",
						]
							.filter(Boolean)
							.join(" ")}
						onClick={() => onChange(o.key)}
					>
						{o.emoji} {o.label}
					</button>
				))}
			</div>
		</div>
	);
}
