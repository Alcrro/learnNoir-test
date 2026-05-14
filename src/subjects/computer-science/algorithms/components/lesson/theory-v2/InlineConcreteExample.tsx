import { useState } from "react";
import { ChevronRight, ChevronLeft, Eye } from "lucide-react";
import type { LessonConcreteStep } from "../../../lib/buildAlgorithmLessonTheory";
import { ComponentFeedback } from "./ComponentFeedback";

type Props = {
	title?: string;
	steps: LessonConcreteStep[];
	lessonId?: string;
};

export function InlineConcreteExample({ title = "Exemplu concret", steps, lessonId = "" }: Props) {
	const [currentStep, setCurrentStep] = useState(0);
	const [allSeen, setAllSeen] = useState(false);

	const step = steps[currentStep];
	const isFirst = currentStep === 0;
	const isLast = currentStep === steps.length - 1;

	const goNext = () => {
		const next = currentStep + 1;
		setCurrentStep(next);
		if (next === steps.length - 1) setAllSeen(true);
	};

	const goPrev = () => setCurrentStep((s) => Math.max(0, s - 1));

	return (
		<div className="lt-card">
			<div className="lt-card__header">
				<div className="lt-card__icon lt-card__icon--purple">
					<Eye size={12} aria-hidden />
				</div>
				<span className="lt-card__title">{title}</span>
				<span className="lt-card__sub">
					{currentStep + 1} / {steps.length}
				</span>
			</div>
			<div className="lt-card__body">
				<div className="lt-concrete__array">
					{step.array.map((val, idx) => {
						const isHighlighted = step.highlight && (idx === step.highlight[0] || idx === step.highlight[1]);
						const isSwapped = step.swapped && isHighlighted;
						return (
							<div
								key={idx}
								className={[
									"lt-concrete__cell",
									isHighlighted ? "lt-concrete__cell--active" : "",
									isSwapped ? "lt-concrete__cell--swapped" : "",
								].join(" ")}
							>
								<span className="lt-concrete__val">{val}</span>
								<span className="lt-concrete__idx">{idx}</span>
							</div>
						);
					})}
				</div>

				<div className="lt-concrete__label">{step.label}</div>
				<p className="lt-concrete__desc">{step.description}</p>

				<div className="lt-concrete__nav">
					<button className="lt-concrete__btn" onClick={goPrev} disabled={isFirst}>
						<ChevronLeft size={14} />
						Înapoi
					</button>

					<div className="lt-concrete__dots">
						{steps.map((_, i) => (
							<div
								key={i}
								className={`lt-concrete__dot${i === currentStep ? " lt-concrete__dot--active" : ""}`}
							/>
						))}
					</div>

					{!isLast ? (
						<button className="lt-concrete__btn lt-concrete__btn--primary" onClick={goNext}>
							Pasul următor
							<ChevronRight size={14} />
						</button>
					) : (
						<div className="lt-concrete__done">Exemplu complet ✓</div>
					)}
				</div>

				{allSeen && (
					<div className="lt-concrete__insight">
						Ai observat pattern-ul? Cel mai mare element "plutește" spre dreapta la fiecare trecere.
					</div>
				)}
			</div>
			<ComponentFeedback lessonId={lessonId} componentId="concrete_example" />
		</div>
	);
}

