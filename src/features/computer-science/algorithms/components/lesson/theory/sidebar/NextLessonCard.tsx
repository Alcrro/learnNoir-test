import type { LessonTheoryModel } from "../../../../lib/buildAlgorithmLessonTheory";

export function NextLessonCard(props: { nextLesson: NonNullable<LessonTheoryModel["nextLesson"]> }) {
	const { nextLesson } = props;

	return (
		<div className="next-card">
			<div className="next-icon">→</div>
			<div>
				<div className="next-label">Next lesson</div>
				<div className="next-title">{nextLesson.name}</div>
			</div>
			<div className="next-arrow">›</div>
		</div>
	);
}

