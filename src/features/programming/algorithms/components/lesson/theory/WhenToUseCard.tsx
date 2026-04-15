import type { LessonTheoryModel } from "../../../lib/buildAlgorithmLessonTheory";
import { Target } from "lucide-react";

export function WhenToUseCard(props: {
	whenGood: LessonTheoryModel["whenGood"];
	whenAvoid: LessonTheoryModel["whenAvoid"];
}) {
	const { whenGood, whenAvoid } = props;

	return (
		<div className="card">
			<div className="card-header">
				<div className="card-header-icon icon-teal" style={{ color: "#0f6e56" }}>
					<Target size={12} aria-hidden="true" />
				</div>
				<span className="card-header-title">When to use it</span>
			</div>
			<div className="card-body">
				<div className="use-grid">
					<div className="use-card use-yes">
						<div className="use-label">Good fit when</div>
						{whenGood.map((x) => (
							<div className="use-item" key={x}>
								— {x}
							</div>
						))}
					</div>
					<div className="use-card use-no">
						<div className="use-label">Avoid when</div>
						{whenAvoid.map((x) => (
							<div className="use-item" key={x}>
								— {x}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

