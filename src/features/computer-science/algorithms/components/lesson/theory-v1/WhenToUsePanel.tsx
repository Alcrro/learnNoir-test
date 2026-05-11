import { type ReactNode } from "react";
import { CheckCircle } from "lucide-react";
import type { LessonTheoryModel } from "../../../lib/buildAlgorithmLessonTheory";
import { NodeFooter } from "./NodeFooter";

type Props = {
	whenGood: LessonTheoryModel["whenGood"];
	whenAvoid: LessonTheoryModel["whenAvoid"];
	editButton?: ReactNode;
	lastUpdated?: string;
	canFeedback?: boolean;
};

export function WhenToUsePanel({ whenGood, whenAvoid, editButton, lastUpdated, canFeedback }: Props) {
	return (
		<div className="lt-card">
			<div className="lt-card__header">
				<div className="lt-card__icon lt-card__icon--teal">
					<CheckCircle size={12} aria-hidden />
				</div>
				<span className="lt-card__title">When to use</span>
				{editButton}
			</div>
			<div className="lt-card__body">
				<div className="lt-use-grid">
					<div className="lt-use-cell lt-use-cell--good">
						<div className="lt-use-cell__label">Good fit</div>
						{whenGood.map((s) => (
							<div className="lt-use-item" key={s}>
								{s}
							</div>
						))}
					</div>
					<div className="lt-use-cell lt-use-cell--avoid">
						<div className="lt-use-cell__label">Avoid when</div>
						{whenAvoid.map((s) => (
							<div className="lt-use-item" key={s}>
								{s}
							</div>
						))}
					</div>
				</div>
			</div>
			<NodeFooter lastUpdated={lastUpdated} canFeedback={canFeedback} />
		</div>
	);
}
