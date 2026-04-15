import { cn } from "../../../../../../../libs/utils/cn";
import type { LessonTheoryModel } from "../../../../lib/buildAlgorithmLessonTheory";

export function PrerequisitesCard(props: {
	prerequisites: LessonTheoryModel["prerequisites"];
	prereqNote?: LessonTheoryModel["prereqNote"];
}) {
	const { prerequisites, prereqNote } = props;

	return (
		<div className="sb-card">
			<div className="sb-header">What you should know first</div>
			<div className="sb-body">
				{prerequisites.map((p) => (
					<div className="prereq-item" key={p.name}>
						<div
							className={cn(
								"prereq-status",
								p.status === "done" ? "ps-done" : "ps-missing",
							)}
						>
							{p.status === "done" ? <div className="checkmark" /> : null}
						</div>
						<div className="prereq-name">{p.name}</div>
						<span
							className="prereq-tag"
							style={p.status === "recommended" ? { color: "#854F0B" } : undefined}
						>
							{p.status === "done" ? "✓ done" : "recommended"}
						</span>
					</div>
				))}

				{prereqNote ? (
					<div
						style={{
							marginTop: 6,
							padding: "8px 10px",
							background: "#FAEEDA",
							borderRadius: "var(--border-radius-md)",
						}}
					>
						<p style={{ fontSize: 11, color: "#854F0B", lineHeight: 1.5 }}>{prereqNote}</p>
					</div>
				) : null}
			</div>
		</div>
	);
}

