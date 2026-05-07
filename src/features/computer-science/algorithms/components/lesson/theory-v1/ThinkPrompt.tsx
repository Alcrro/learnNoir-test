import { useState, type ReactNode } from "react";
import { Zap, Check } from "lucide-react";

type Props = {
	question: string;
	revealLabel?: string;
	onReveal?: () => void;
	children: ReactNode;
};

export function ThinkPrompt({
	question,
	revealLabel = "I've thought about it →",
	onReveal,
	children,
}: Props) {
	const [revealed, setRevealed] = useState(false);

	const handleReveal = () => {
		setRevealed(true);
		onReveal?.();
	};

	return (
		<>
			<div className={`lt-think-prompt${revealed ? " lt-think-prompt--done" : ""}`}>
				<div className="lt-think-prompt__badge">
					{revealed ? <Check size={10} aria-hidden /> : <Zap size={10} aria-hidden />}
					{revealed ? "Revealed" : "Stop & Think"}
				</div>
				{revealed ? (
					<p className="lt-think-prompt__done-text">Section unlocked — review it below.</p>
				) : (
					<>
						<p className="lt-think-prompt__question">{question}</p>
						<button className="lt-reveal-btn" onClick={handleReveal}>
							{revealLabel}
						</button>
					</>
				)}
			</div>
			{revealed && children}
		</>
	);
}
