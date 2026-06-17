import { LayoutBuilder } from "../../../../builder/organisms/LayoutBuilder";

type Props = {
	lessonId: string;
	lessonTitle?: string;
	lessonDescription?: string;
	blockId: string | null;
	subject?: string;
	category?: string;
	moduleSlug?: string;
	onSaveSuccess: () => void;
};

export function TheoryEmptyBuilder({ lessonId, lessonTitle, lessonDescription, blockId, subject, category, moduleSlug, onSaveSuccess }: Props) {
	return (
		<LayoutBuilder
			lessonId={lessonId}
			lessonTitle={lessonTitle}
			lessonDescription={lessonDescription}
			blockId={blockId}
			subject={subject}
			category={category}
			moduleSlug={moduleSlug}
			initialNodes={[]}
			onSaveSuccess={onSaveSuccess}
		/>
	);
}
