import { useState } from "react";
import { Zap, ArrowRight } from "lucide-react";

type Props = {
	question: string;
	onContinue?: () => void;
	onAttemptRecord?: () => void;
};

export function PredictPrompt({ question, onContinue, onAttemptRecord }: Props) {
	const [answered, setAnswered] = useState(false);

	const handleContinue = () => {
		setAnswered(true);
		onAttemptRecord?.();
		onContinue?.();
	};

	if (answered) return null;

	return (
		<div className="lt-predict">
			<div className="lt-predict__badge">
				<Zap size={10} aria-hidden />
				Înainte să începem
			</div>
			<p className="lt-predict__question">{question}</p>
			<p className="lt-predict__hint">
				Nu există răspuns greșit — scopul e să gândești înainte să citești.
			</p>
			<button className="lt-reveal-btn" onClick={handleContinue}>
				Am gândit — continuă
				<ArrowRight size={13} />
			</button>
		</div>
	);
}
