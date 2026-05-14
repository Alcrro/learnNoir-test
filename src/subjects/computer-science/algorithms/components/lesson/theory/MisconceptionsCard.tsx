import type { LessonTheoryModel } from "../../../lib/buildAlgorithmLessonTheory";
import { AlertTriangle } from "lucide-react";

export function MisconceptionsCard(props: { misconceptions: LessonTheoryModel["misconceptions"] }) {
	const { misconceptions } = props;

	return (
		<div className="card">
			<div className="card-header">
				<div className="card-header-icon" style={{ background: "#FCEBEB", color: "#a32d2d" }}>
					<AlertTriangle size={12} aria-hidden="true" />
				</div>
				<span className="card-header-title">Common mistakes</span>
				<span className="card-header-sub">avoid these</span>
			</div>
			<div className="card-body">
				{misconceptions.map((m) => (
					<div className="misc-item" key={m.title}>
						<div className="misc-label">{m.title}</div>
						<p>{m.body}</p>
					</div>
				))}
			</div>
		</div>
	);
}

