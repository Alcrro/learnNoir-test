import type { LessonTheoryModel } from "../../../../lib/buildAlgorithmLessonTheory";

export function MemoryTipCard(props: {
	title: LessonTheoryModel["title"];
	sidebarCards: LessonTheoryModel["sidebarCards"];
}) {
	const { title, sidebarCards } = props;

	return (
		<div className="sb-card">
			<div className="sb-header">How to remember</div>
			<div className="sb-body">
				<div className="mem-tip">
					<div className="mem-tip-label">Mnemonic technique</div>
					<p>
						<strong>{title.charAt(0)}</strong>
						{title.slice(1)} — {sidebarCards[2]?.items?.[0]}
					</p>
				</div>
				<div
					style={{
						marginTop: 8,
						fontSize: 11,
						color: "var(--color-text-secondary)",
						lineHeight: 1.5,
					}}
				>
					Remember one rule of thumb:{" "}
					<strong style={{ fontSize: 14, color: "var(--color-text-primary)" }}>
						nested loops
					</strong>{" "}
					often suggest \(n²\).
				</div>
			</div>
		</div>
	);
}

