import { Info } from "lucide-react";
import type { ConceptBlock, ConceptSection } from "@shared/lesson-content";
import { InlineQuizNode } from "./InlineQuizNode";
import { ComponentFeedback } from "../../../../features/computer-science/algorithms/components/lesson/theory-v2/ComponentFeedback";
import { useLessonContext } from "../../context/LessonContext";
import "../../../../features/computer-science/algorithms/components/lesson/lessonTheory.css";

type SectionCardProps = { section: ConceptSection; lessonId: string; componentId: string };

function ConceptSectionCard({ section, lessonId, componentId }: SectionCardProps) {
	return (
		<div className="lt-concept-section-wrap">
			<div className="lt-card">
				<div className="lt-card__header">
					<div className="lt-card__icon lt-card__icon--blue">
						<Info size={12} aria-hidden />
					</div>
					<span className="lt-card__title">{section.label}</span>
				</div>
				<div className="lt-card__body">
					<div className="lt-key-idea">
						<p>{section.text}</p>
					</div>
				</div>
				<ComponentFeedback lessonId={lessonId} componentId={componentId} />
			</div>
			{section.quiz && (
				<InlineQuizNode node={{ type: "inline-quiz", ...section.quiz }} />
			)}
		</div>
	);
}

type Props = { node: ConceptBlock };

export function ConceptNode({ node }: Props) {
	const { lessonId } = useLessonContext();
	return (
		<div className="space-y-3">
			<p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">{node.title}</p>
			{node.sections.map((section, i) => (
				<ConceptSectionCard
					key={i}
					section={section}
					lessonId={lessonId}
					componentId={`concept-${node.title.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")}-${i}`}
				/>
			))}
		</div>
	);
}
