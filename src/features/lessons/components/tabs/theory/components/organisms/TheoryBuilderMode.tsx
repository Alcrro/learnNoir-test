import type { LessonContentNode } from "@shared/lesson-content";
import { LayoutBuilder } from "../../../../builder/organisms/LayoutBuilder";
import { TheoryBackButton } from "../atoms/TheoryBackButton";

type Props = {
	lessonId: string;
	lessonTitle?: string;
	lessonDescription?: string;
	blockId: string | null;
	subject?: string;
	category?: string;
	moduleSlug?: string;
	initialNodes: LessonContentNode[];
	onSaveSuccess: () => void;
	onBack: () => void;
};

export function TheoryBuilderMode({ lessonId, lessonTitle, lessonDescription, blockId, subject, category, moduleSlug, initialNodes, onSaveSuccess, onBack }: Props) {
	return (
		<div className="flex flex-col gap-4">
			<TheoryBackButton onClick={onBack} />
			<LayoutBuilder
				lessonId={lessonId}
				lessonTitle={lessonTitle}
				lessonDescription={lessonDescription}
				blockId={blockId}
				subject={subject}
				category={category}
				moduleSlug={moduleSlug}
				initialNodes={initialNodes}
				onSaveSuccess={onSaveSuccess}
			/>
		</div>
	);
}
