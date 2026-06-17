import type { LessonContentNode } from "@shared/lesson-content";
import { useTheoryTabState } from "../../../hooks/useTheoryTabState";
import { TheoryEmptyBuilder } from "./components/organisms/TheoryEmptyBuilder";
import { TheoryBuilderMode } from "./components/organisms/TheoryBuilderMode";
import { TheoryPreview } from "./components/organisms/TheoryPreview";

export function TheoryTabContent() {
	const {
		lessonId, canEdit, contentBlocks, contentBlock,
		hasContent, isBuilderMode, setIsBuilderMode,
		invalidateBlocks, builderBaseProps,
	} = useTheoryTabState();

	const showEmptyBuilder = canEdit && !hasContent;
	const showBuilderMode = canEdit && isBuilderMode;

	if (showEmptyBuilder) {
		return <TheoryEmptyBuilder {...builderBaseProps} onSaveSuccess={invalidateBlocks} />;
	}

	if (showBuilderMode) {
		return (
			<TheoryBuilderMode
				{...builderBaseProps}
				initialNodes={(contentBlock?.data?.content ?? []) as LessonContentNode[]}
				onSaveSuccess={() => { setIsBuilderMode(false); invalidateBlocks(); }}
				onBack={() => setIsBuilderMode(false)}
			/>
		);
	}

	return (
		<TheoryPreview
			blocks={contentBlocks}
			lessonId={lessonId}
			canEdit={canEdit}
			onEditLayout={() => setIsBuilderMode(true)}
		/>
	);
}
