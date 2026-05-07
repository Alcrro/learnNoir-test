import { ListOrdered } from "lucide-react";
import type { LessonTheoryModel } from "../../../lib/buildAlgorithmLessonTheory";

type Props = {
	steps: LessonTheoryModel["steps"];
};

export function StepsReveal({ steps }: Props) {
	return (
		<div className="lt-card">
			<div className="lt-card__header">
				<div className="lt-card__icon lt-card__icon--teal">
					<ListOrdered size={12} aria-hidden />
				</div>
				<span className="lt-card__title">How it works</span>
				<span className="lt-card__sub">{steps.length} steps</span>
			</div>
			<div className="lt-card__body">
				<div className="lt-steps">
					{steps.map((s, i) => (
						<div className="lt-step" key={s.title}>
							<div className="lt-step__num">{i + 1}</div>
							<div>
								<div className="lt-step__title">{s.title}</div>
								<div className="lt-step__desc">{s.description}</div>
								{s.codeHint && <span className="lt-step__code">{s.codeHint}</span>}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
