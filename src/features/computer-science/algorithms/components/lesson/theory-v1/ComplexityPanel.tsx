import { type ReactNode } from "react";
import { Activity } from "lucide-react";
import type { LessonTheoryModel } from "../../../lib/buildAlgorithmLessonTheory";
import { ConfidenceRating, type ConfidenceLevel } from "./ConfidenceRating";
import { NodeFooter } from "./NodeFooter";

type Props = {
	complexityCases: LessonTheoryModel["complexityCases"];
	complexityExplainer: LessonTheoryModel["complexityExplainer"];
	stepsRevealed: boolean;
	confidence: ConfidenceLevel | null;
	onConfidence: (v: ConfidenceLevel) => void;
	editButton?: ReactNode;
	lastUpdated?: string;
	canFeedback?: boolean;
};

export function ComplexityPanel({
	complexityCases,
	complexityExplainer,
	stepsRevealed,
	confidence,
	onConfidence,
	editButton,
	lastUpdated,
	canFeedback,
}: Props) {
	return (
		<div className="lt-card">
			<div className="lt-card__header">
				<div className="lt-card__icon lt-card__icon--amber">
					<Activity size={12} aria-hidden />
				</div>
				<span className="lt-card__title">Complexity</span>
				<span className="lt-card__sub">time + space</span>
				{editButton}
			</div>
			<div className="lt-card__body">
				<div className="lt-cx-grid">
					{complexityCases.map((c) => (
						<div className="lt-cx-cell" key={c.label}>
							<div className="lt-cx-cell__label">{c.label}</div>
							<div className={`lt-cx-cell__val lt-cx-cell__val--${c.tone}`}>{c.value}</div>
							<div className="lt-cx-cell__why">{c.why}</div>
							<div className={`lt-cx-bar lt-cx-bar--${c.tone}`} />
						</div>
					))}
				</div>
				<div className="lt-explainer">
					<div className="lt-explainer__label">Why this complexity?</div>
					<p>{complexityExplainer}</p>
				</div>
				{stepsRevealed && <ConfidenceRating value={confidence} onChange={onConfidence} />}
			</div>
			<NodeFooter lastUpdated={lastUpdated} canFeedback={canFeedback} />
		</div>
	);
}
