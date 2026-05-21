import { useState } from "react";
import { Activity, ChevronRight, CheckCircle2 } from "lucide-react";
import type {
	LessonComplexityDerivationStep,
	LessonTheoryComplexityCase,
} from "../../../lib/buildAlgorithmLessonTheory";
import { ComponentFeedback } from "./ComponentFeedback";

type Props = {
	estimateQuestion: string;
	estimateOptions: string[];
	derivationSteps: LessonComplexityDerivationStep[];
	complexityCases: LessonTheoryComplexityCase[];
	complexityExplainer?: string;
	lessonId?: string;
	onAttemptRecord?: () => void;
};

export function ComplexityDerivation({
	estimateQuestion,
	estimateOptions,
	derivationSteps,
	complexityCases,
	complexityExplainer,
	lessonId = "",
	onAttemptRecord,
}: Props) {
	const [estimateChosen, setEstimateChosen] = useState<string | null>(null);
	const [derivationStep, setDerivationStep] = useState(0);
	const [derivationStarted, setDerivationStarted] = useState(false);
	const [derivationDone, setDerivationDone] = useState(false);

	const currentDeriv = derivationSteps[derivationStep];

	const goNextDeriv = () => {
		if (derivationStep < derivationSteps.length - 1) {
			setDerivationStep((s) => s + 1);
		} else {
			setDerivationDone(true);
			onAttemptRecord?.();
		}
	};

	return (
		<div className="lt-card">
			<div className="lt-card__header">
				<div className="lt-card__icon lt-card__icon--amber">
					<Activity size={12} aria-hidden />
				</div>
				<span className="lt-card__title">Complexity</span>
				<span className="lt-card__sub">derivă, nu memora</span>
			</div>
			<div className="lt-card__body">
				{/* Phase A: estimate */}
				{!estimateChosen && (
					<div className="lt-deriv__estimate">
						<p className="lt-deriv__estimate-q">{estimateQuestion}</p>
						<div className="lt-deriv__estimate-opts">
							{estimateOptions.map((opt) => (
								<button key={opt} className="lt-deriv__opt" onClick={() => setEstimateChosen(opt)}>
									{opt}
								</button>
							))}
						</div>
					</div>
				)}

				{/* Phase B: feedback + start derivation */}
				{estimateChosen && !derivationStarted && (
					<div className="lt-deriv__feedback">
						<p className="lt-deriv__feedback-text">
							Ai ales <strong>{estimateChosen}</strong>. Hai să derivăm împreună și să vedem de ce.
						</p>
						<button className="lt-reveal-btn" onClick={() => setDerivationStarted(true)}>
							Derivă pas cu pas →
						</button>
					</div>
				)}

				{/* Phase C: step-by-step derivation */}
				{derivationStarted && !derivationDone && (
					<div className="lt-deriv__steps">
						<div className="lt-deriv__step">
							<div className="lt-deriv__step-label">{currentDeriv.label}</div>
							<p className="lt-deriv__step-content">{currentDeriv.content}</p>
							<div className="lt-deriv__formula">{currentDeriv.formula}</div>
						</div>
						<div className="lt-deriv__nav">
							<span className="lt-deriv__progress">
								{derivationStep + 1} / {derivationSteps.length}
							</span>
							<button className="lt-reveal-btn" onClick={goNextDeriv}>
								{derivationStep < derivationSteps.length - 1 ? (
									<>Continuă <ChevronRight size={13} /></>
								) : (
									<>Finalizează ✓</>
								)}
							</button>
						</div>
					</div>
				)}

				{/* Phase D: final result */}
				{derivationDone && (
					<>
						<div className="lt-deriv__result">
							<CheckCircle2 size={14} className="lt-deriv__result-icon" />
							<span>Ai derivat complexitatea — acum o înțelegi, nu doar o știi.</span>
						</div>
						<div className="lt-cx-grid" style={{ marginTop: "12px" }}>
							{complexityCases.map((c) => (
								<div className="lt-cx-cell" key={c.label}>
									<div className="lt-cx-cell__label">{c.label}</div>
									<div className={`lt-cx-cell__val lt-cx-cell__val--${c.tone}`}>{c.value}</div>
									<div className="lt-cx-cell__why">{c.why}</div>
									<div className={`lt-cx-bar lt-cx-bar--${c.tone}`} />
								</div>
							))}
						</div>
						{complexityExplainer && (
							<div className="lt-explainer" style={{ marginTop: "10px" }}>
								<div className="lt-explainer__label">De ce această complexitate?</div>
								<p>{complexityExplainer}</p>
							</div>
						)}
					</>
				)}
			</div>
			<ComponentFeedback lessonId={lessonId} componentId="interactive_exercise" />
		</div>
	);
}

