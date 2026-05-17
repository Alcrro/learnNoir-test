import { useState, useRef } from "react";
import { RefreshCw, CheckCircle2, XCircle } from "lucide-react";
import type { LessonRecallQuestion } from "../../../lib/buildAlgorithmLessonTheory";
import { ComponentFeedback } from "./ComponentFeedback";

type Props = {
	questions: LessonRecallQuestion[];
	placedAfter?: string;
	lessonId?: string;
	componentId?: string;
	onAttemptRecord?: () => void;
};

function QuestionCard({
	q,
	onAnswered,
}: {
	q: LessonRecallQuestion;
	onAnswered?: () => void;
}) {
	const [chosen, setChosen] = useState<number | null>(null);
	const answered = chosen !== null;
	const isCorrect = chosen === q.correctIndex;

	const handleChoose = (idx: number) => {
		if (answered) return;
		setChosen(idx);
		onAnswered?.();
	};

	return (
		<div className="lt-recall__q">
			<p className="lt-recall__question">{q.question}</p>
			<div className="lt-recall__options">
				{q.options.map((opt, idx) => {
					let cls = "lt-recall__opt";
					if (answered) {
						if (idx === q.correctIndex) cls += " lt-recall__opt--correct";
						else if (idx === chosen) cls += " lt-recall__opt--wrong";
						else cls += " lt-recall__opt--dim";
					}
					return (
						<button
							key={idx}
							className={cls}
							onClick={() => handleChoose(idx)}
							disabled={answered}
						>
							{opt}
						</button>
					);
				})}
			</div>
			{answered && (
				<div className={`lt-recall__explanation${isCorrect ? " lt-recall__explanation--correct" : " lt-recall__explanation--wrong"}`}>
					<div className="lt-recall__explanation-icon">
						{isCorrect ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
						<span>{isCorrect ? "Corect!" : "Nu."}</span>
					</div>
					<p>{q.explanation}</p>
				</div>
			)}
		</div>
	);
}

export function EmbeddedRecall({
	questions,
	placedAfter = "",
	lessonId = "",
	componentId = "recall",
	onAttemptRecord,
}: Props) {
	if (!Array.isArray(questions) || questions.length === 0) return null;

	// Track how many questions have been answered to fire onAttemptRecord once all are done.
	const answeredCount = useRef(0);
	const recorded = useRef(false);

	const handleQuestionAnswered = () => {
		answeredCount.current += 1;
		if (!recorded.current && answeredCount.current >= questions.length) {
			recorded.current = true;
			onAttemptRecord?.();
		}
	};

	return (
		<div className="lt-card">
			<div className="lt-card__header">
				<div className="lt-card__icon lt-card__icon--purple">
					<RefreshCw size={12} aria-hidden />
				</div>
				<span className="lt-card__title">Check rapid</span>
				{placedAfter && <span className="lt-card__sub">{placedAfter}</span>}
			</div>
			<div className="lt-card__body">
				<div className="lt-recall__list">
					{questions.map((q) => (
						<QuestionCard
							key={q.id}
							q={q}
							onAnswered={handleQuestionAnswered}
						/>
					))}
				</div>
			</div>
			<ComponentFeedback lessonId={lessonId} componentId={componentId} />
		</div>
	);
}
