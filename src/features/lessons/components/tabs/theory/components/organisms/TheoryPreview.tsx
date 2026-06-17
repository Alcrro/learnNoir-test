import type { ContentBlock } from "../../../../../api/lessonBlocksApi";
import { LessonTheoryContent } from "../../LessonTheoryContent";
import { TheoryEditLayoutButton } from "../atoms/TheoryEditLayoutButton";

type Props = {
	blocks: ContentBlock[];
	lessonId: string;
	canEdit: boolean;
	onEditLayout: () => void;
};

// AlgorithmLessonTheoryV2 has a hardcoded structure that ignores data.content,
// so builder-saved nodes would never appear through it.
export function TheoryPreview({ blocks, lessonId, canEdit, onEditLayout }: Props) {
	const editLayoutButton = canEdit ? <TheoryEditLayoutButton onClick={onEditLayout} /> : null;

	return (
		<LessonTheoryContent
			blocks={blocks}
			lessonId={lessonId}
			sidebarTop={editLayoutButton}
		/>
	);
}
