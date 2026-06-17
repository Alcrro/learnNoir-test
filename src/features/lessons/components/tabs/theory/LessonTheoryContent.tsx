import { useState, useMemo, type ReactNode } from "react";
import type { ContentBlock } from "../../../api/lessonBlocksApi";
import { useLessonReadProgress } from "../../../hooks/useLessonReadProgress";
import { useLessonSidebarData } from "../../../hooks/useLessonSidebarData";
import { useUpdateBlockContent } from "../../../hooks/useUpdateBlockContent";
import { useLessonTranslationStore } from "../../../store/useLessonTranslationStore";
import { useLessonTranslationQuery } from "../../../hooks/useLessonTranslationQuery";
import type { AnyNode } from "./ContentNodeRenderer";
import { buildUpdatedContent } from "./lib/buildUpdatedContent";
import { ReadProgressBar } from "../../atoms/ReadProgressBar";
import { TheoryBlockList } from "../../molecules/TheoryBlockList";
import { TheorySidebar } from "../../organisms/TheorySidebar";
import type { TranslatedBlockPayload } from "@shared/lesson-translation";

type Props = { blocks: ContentBlock[]; lessonId: string; sidebarTop?: ReactNode };

export function LessonTheoryContent({ blocks, lessonId, sidebarTop }: Props) {
	const [overrides, setOverrides] = useState<Map<string, AnyNode>>(new Map());
	const { mutate: saveContent } = useUpdateBlockContent(lessonId);
	const { prerequisites, relatedLessons, nextLesson } =
		useLessonSidebarData(lessonId);
	const { scrollProgress, isCompleted, hasScrollableContent, contentRef } =
		useLessonReadProgress(lessonId);

	const activeLang = useLessonTranslationStore((s) => s.getLang(lessonId));
	const { data: translation } = useLessonTranslationQuery(lessonId, activeLang);

	const translatedBlocksMap = useMemo<Map<string, TranslatedBlockPayload>>(() => {
		if (!translation) return new Map();
		return new Map(translation.blocks.map((b) => [b.blockId, b]));
	}, [translation]);

	function handleUpdate(block: ContentBlock, nodeIdx: number, updated: AnyNode) {
		setOverrides((prev) => new Map(prev).set(`${block.id}-${nodeIdx}`, updated));
		saveContent({
			blockId: block.id,
			content: buildUpdatedContent(block, nodeIdx, updated),
		});
	}

	return (
		<div className="lesson-theory">
			{hasScrollableContent && (
				<ReadProgressBar
					progress={scrollProgress}
					isCompleted={isCompleted}
				/>
			)}
			<div className="lesson-theory__layout">
				<TheoryBlockList
					blocks={blocks}
					overrides={overrides}
					contentRef={contentRef}
					onUpdate={handleUpdate}
					translatedBlocksMap={translatedBlocksMap}
				/>
				<aside className="lesson-theory__sidebar">
					{sidebarTop}
					<TheorySidebar
						prerequisites={prerequisites}
						relatedLessons={relatedLessons}
						nextLesson={nextLesson}
					/>
				</aside>
			</div>
		</div>
	);
}
