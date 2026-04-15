import type { LessonTheoryModel } from "../../../lib/buildAlgorithmLessonTheory";
import { Info } from "lucide-react";

export function KeyIdeaCard(props: { keyIdea: LessonTheoryModel["keyIdea"]; analogy?: string }) {
	const { keyIdea, analogy } = props;

	return (
		<div className="card">
			<div className="card-header">
				<div className="card-header-icon icon-blue" style={{ color: "#185FA5" }}>
					<Info size={12} aria-hidden="true" />
				</div>
				<span className="card-header-title">Central idea</span>
			</div>
			<div className="card-body">
				<div className="key-idea">
					<div className="key-idea-label">One principle</div>
					<p>{keyIdea}</p>
				</div>
				<div className="analogy">
					<div className="analogy-label">Analogy — how to remember</div>
					<p>{analogy}</p>
				</div>
			</div>
		</div>
	);
}

