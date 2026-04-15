import { cn } from "../../../../../../libs/utils/cn";
import type { LessonTheoryModel } from "../../../lib/buildAlgorithmLessonTheory";
import { Activity } from "lucide-react";

export function ComplexityCard(props: {
	complexityCases: LessonTheoryModel["complexityCases"];
	complexityExplainer: LessonTheoryModel["complexityExplainer"];
}) {
	const { complexityCases, complexityExplainer } = props;

	return (
		<div className="card">
			<div className="card-header">
				<div className="card-header-icon icon-amber" style={{ color: "#854F0B" }}>
					<Activity size={12} aria-hidden="true" />
				</div>
				<span className="card-header-title">Complexity</span>
				<span className="card-header-sub">time + space</span>
			</div>
			<div className="card-body">
				<div className="cx-grid">
					{complexityCases.map((c) => (
						<div className="cx-card" key={c.label}>
							<div className="cx-case">{c.label}</div>
							<div className={cn("cx-val", c.tone)}>{c.value}</div>
							<div className="cx-why">{c.why}</div>
							<div className={cn("cx-bar", c.tone)} />
						</div>
					))}
				</div>

				<div
					style={{
						marginTop: 10,
						background: "var(--bg-secondary)",
						borderRadius: "var(--border-radius-md)",
						padding: "10px 12px",
					}}
				>
					<div
						style={{
							fontSize: 10,
							fontWeight: 500,
							color: "var(--text-secondary)",
							textTransform: "uppercase",
							letterSpacing: ".06em",
							marginBottom: 6,
						}}
					>
						Why this complexity?
					</div>
					<p
						style={{
							fontSize: 12,
							color: "var(--text-primary)",
							lineHeight: 1.6,
						}}
					>
						{complexityExplainer}
					</p>
				</div>
			</div>
		</div>
	);
}

