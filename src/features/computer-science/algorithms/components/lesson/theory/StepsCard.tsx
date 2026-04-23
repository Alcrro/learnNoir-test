import type { LessonTheoryModel } from "../../../lib/buildAlgorithmLessonTheory";
import { ListOrdered } from "lucide-react";

export function StepsCard(props: { steps: LessonTheoryModel["steps"] }) {
	const { steps } = props;

	return (
		<div className="card">
			<div className="card-header">
				<div className="card-header-icon icon-teal" style={{ color: "#0f6e56" }}>
					<ListOrdered size={12} aria-hidden="true" />
				</div>
				<span className="card-header-title">How it works</span>
				<span className="card-header-sub">{steps.length} steps</span>
			</div>
			<div className="card-body">
				<div className="steps">
					{steps.map((s, idx) => (
						<div className="step-row" key={s.title}>
							<div className="step-num">{idx + 1}</div>
							<div className="step-content">
								<div className="step-title">{s.title}</div>
								<div className="step-desc">{s.description}</div>
								{s.codeHint ? <span className="step-code">{s.codeHint}</span> : null}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

