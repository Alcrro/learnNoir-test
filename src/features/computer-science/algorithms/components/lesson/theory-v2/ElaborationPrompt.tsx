import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { ComponentFeedback } from "./ComponentFeedback";

type Props = {
	question: string;
	answer: string;
	lessonId?: string;
	onAttemptRecord?: () => void;
};

export function ElaborationPrompt({ question, answer, lessonId = "", onAttemptRecord }: Props) {
	const [open, setOpen] = useState(false);

	const handleToggle = () => {
		if (!open) onAttemptRecord?.();
		setOpen((v) => !v);
	};

	return (
		<div className="lt-elaboration">
			<button className="lt-elaboration__trigger" onClick={handleToggle}>
				<HelpCircle size={13} className="lt-elaboration__icon" aria-hidden />
				<span>{question}</span>
				<ChevronDown
					size={13}
					className={`lt-elaboration__chevron${open ? " lt-elaboration__chevron--open" : ""}`}
					aria-hidden
				/>
			</button>
			{open && <div className="lt-elaboration__answer">{answer}</div>}
			<ComponentFeedback lessonId={lessonId} componentId="elaboration" />
		</div>
	);
}
