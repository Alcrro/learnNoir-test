import { type ReactNode } from "react";
import { Info, Lightbulb } from "lucide-react";
import type { LessonTheoryModel } from "../../../lib/buildAlgorithmLessonTheory";
import { NodeFooter } from "./NodeFooter";

type Props = {
	keyIdea: LessonTheoryModel["keyIdea"];
	analogy?: string;
	editButton?: ReactNode;
	lastUpdated?: string;
	canFeedback?: boolean;
};

export function ConceptReveal({ keyIdea, analogy, editButton, lastUpdated, canFeedback }: Props) {
	return (
		<div className="lt-card">
			<div className="lt-card__header">
				<div className="lt-card__icon lt-card__icon--blue">
					<Info size={12} aria-hidden />
				</div>
				<span className="lt-card__title">Central idea</span>
				{editButton}
			</div>
			<div className="lt-card__body">
				<div className="lt-key-idea">
					<div className="lt-key-idea__label">One principle</div>
					<p>{keyIdea}</p>
				</div>
				{analogy && (
					<div className="lt-analogy">
						<div className="lt-analogy__label">
							<Lightbulb size={10} aria-hidden />
							Analogy — how to remember
						</div>
						<p>{analogy}</p>
					</div>
				)}
			</div>
			<NodeFooter lastUpdated={lastUpdated} canFeedback={canFeedback} />
		</div>
	);
}
