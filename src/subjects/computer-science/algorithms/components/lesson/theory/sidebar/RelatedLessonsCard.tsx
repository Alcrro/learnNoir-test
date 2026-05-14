import type { LessonTheoryModel } from "../../../../lib/buildAlgorithmLessonTheory";

export function RelatedLessonsCard(props: { relatedLessons: LessonTheoryModel["relatedLessons"] }) {
	const { relatedLessons } = props;

	return (
		<div className="sb-card">
			<div className="sb-header">Related lessons</div>
			<div className="sb-body">
				{relatedLessons.length ? (
					relatedLessons.map((r) => (
						<div className="related-item" key={r.name}>
							<div className="rel-left">
								<span className="rel-name">{r.name}</span>
								<span className="rel-why">{r.why}</span>
							</div>
							<span className="rel-arrow">›</span>
						</div>
					))
				) : (
					<div className="rel-why">No related lessons yet.</div>
				)}
			</div>
		</div>
	);
}

