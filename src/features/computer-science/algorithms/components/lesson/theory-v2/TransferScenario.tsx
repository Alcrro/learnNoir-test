import { useState, useRef } from "react";
import { Target, CheckCircle2, XCircle } from "lucide-react";
import type { LessonTransferScenario } from "../../../lib/buildAlgorithmLessonTheory";
import { ComponentFeedback } from "./ComponentFeedback";

function ScenarioCard({
	scenario,
	onAnswered,
}: {
	scenario: LessonTransferScenario;
	onAnswered?: () => void;
}) {
	const [chosen, setChosen] = useState<"yes" | "no" | null>(null);
	const isCorrect = chosen === scenario.answer;

	const handleChoose = (value: "yes" | "no") => {
		setChosen(value);
		onAnswered?.();
	};

	return (
		<div className={`lt-transfer__scenario${chosen ? (isCorrect ? " lt-transfer__scenario--correct" : " lt-transfer__scenario--wrong") : ""}`}>
			<p className="lt-transfer__scenario-text">{scenario.scenario}</p>
			{!chosen && (
				<div className="lt-transfer__btns">
					<button className="lt-transfer__btn lt-transfer__btn--yes" onClick={() => handleChoose("yes")}>
						Da, potrivit
					</button>
					<button className="lt-transfer__btn lt-transfer__btn--no" onClick={() => handleChoose("no")}>
						Nu, există ceva mai bun
					</button>
				</div>
			)}
			{chosen && (
				<div className="lt-transfer__feedback">
					<div className="lt-transfer__feedback-icon">
						{isCorrect ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
						<span>{isCorrect ? "Corect!" : "Nu chiar."}</span>
					</div>
					<p className="lt-transfer__feedback-text">{scenario.explanation}</p>
				</div>
			)}
		</div>
	);
}

type Props = {
	scenarios: LessonTransferScenario[];
	lessonId?: string;
	onAttemptRecord?: () => void;
};

export function TransferScenario({ scenarios, lessonId = "", onAttemptRecord }: Props) {
	if (!Array.isArray(scenarios) || scenarios.length === 0) return null;

	// Fire onAttemptRecord once all scenarios have been answered.
	const answeredCount = useRef(0);
	const recorded = useRef(false);

	const handleScenarioAnswered = () => {
		answeredCount.current += 1;
		if (!recorded.current && answeredCount.current >= scenarios.length) {
			recorded.current = true;
			onAttemptRecord?.();
		}
	};

	return (
		<div className="lt-card">
			<div className="lt-card__header">
				<div className="lt-card__icon lt-card__icon--teal">
					<Target size={12} aria-hidden />
				</div>
				<span className="lt-card__title">Când îl folosești?</span>
				<span className="lt-card__sub">judecată activă</span>
			</div>
			<div className="lt-card__body">
				<p className="lt-transfer__intro">
					Cititul listei "good fit / avoid" nu produce transfer. Decide singur:
				</p>
				<div className="lt-transfer__list">
					{scenarios.map((s) => (
						<ScenarioCard
							key={s.id}
							scenario={s}
							onAnswered={handleScenarioAnswered}
						/>
					))}
				</div>
			</div>
			<ComponentFeedback lessonId={lessonId} componentId="transfer" />
		</div>
	);
}
