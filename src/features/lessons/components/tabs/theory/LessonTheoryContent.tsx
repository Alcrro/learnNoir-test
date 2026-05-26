import { useState } from "react";
import type { ContentBlock } from "../../../api/lessonBlocksApi";
import { useLessonReadProgress } from "../../../hooks/useLessonReadProgress";
import { useLessonSidebarData } from "../../../hooks/useLessonSidebarData";
import { useUpdateBlockContent } from "../../../hooks/useUpdateBlockContent";
import type { AnyNode } from "./ContentNodeRenderer";
import { buildUpdatedContent } from "./lib/buildUpdatedContent";
import { ReadProgressBar } from "../../atoms/ReadProgressBar";
import { TheoryBlockList } from "../../molecules/TheoryBlockList";
import { TheorySidebar } from "../../organisms/TheorySidebar";

type Props = { blocks: ContentBlock[]; lessonId: string };

export function LessonTheoryContent({ blocks, lessonId }: Props) {
	const [overrides, setOverrides] = useState<Map<string, AnyNode>>(new Map());
	const { mutate: saveContent } = useUpdateBlockContent(lessonId);
	const { prerequisites, relatedLessons, nextLesson } =
		useLessonSidebarData(lessonId);
	const { scrollProgress, isCompleted, hasScrollableContent, contentRef } =
		useLessonReadProgress(lessonId);

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
				/>
				<TheorySidebar
					prerequisites={prerequisites}
					relatedLessons={relatedLessons}
					nextLesson={nextLesson}
				/>
			</div>
		</div>
	);
}
