import { useState } from "react";
import { NextLessonCard } from "../../../../../features/computer-science/algorithms/components/lesson/theory/sidebar/NextLessonCard";
import { PrerequisitesCard } from "../../../../../features/computer-science/algorithms/components/lesson/theory/sidebar/PrerequisitesCard";
import { RelatedLessonsCard } from "../../../../../features/computer-science/algorithms/components/lesson/theory/sidebar/RelatedLessonsCard";
import { ContentBlock } from "../../../api/lessonBlocksApi";
import { useLessonReadProgress } from "../../../hooks/useLessonReadProgress";
import { useLessonSidebarData } from "../../../hooks/useLessonSidebarData";
import { useUpdateBlockContent } from "../../../hooks/useUpdateBlockContent";
import { AnyNode, ContentNodeRenderer } from "./ContentNodeRenderer";

type Props = { blocks: ContentBlock[]; lessonId: string };

export function LessonTheoryContent({ blocks, lessonId }: Props) {
	const [overrides, setOverrides] = useState<Map<string, AnyNode>>(new Map());
	const { mutate: saveContent } = useUpdateBlockContent(lessonId);
	const { prerequisites, relatedLessons, nextLesson } =
		useLessonSidebarData(lessonId);
	const { scrollProgress, isCompleted, contentRef } =
		useLessonReadProgress(lessonId);

	function handleUpdate(block: ContentBlock, nodeIdx: number, updated: AnyNode) {
		setOverrides((prev) => {
			const next = new Map(prev);
			next.set(`${block.id}-${nodeIdx}`, updated);
			return next;
		});

		const currentContent = block.data.content ?? [];
		const newContent = currentContent.map((n, i) => {
			if (i !== nodeIdx) return n;
			const key = `${block.id}-${i}`;
			return (overrides.get(key) ?? updated) as Record<string, unknown>;
		});
		newContent[nodeIdx] = updated as Record<string, unknown>;

		saveContent({ blockId: block.id, content: newContent });
	}

	return (
		<div className="lesson-theory">
			<div className="mb-4 flex items-center gap-3 rounded-lg border border-(--border) bg-(--surface) px-4 py-2.5">
				<div className="flex-1 h-1.5 rounded-full bg-(--border) overflow-hidden">
					<div
						className="h-1.5 rounded-full bg-blue-500 transition-all duration-300"
						style={{ width: `${scrollProgress}%` }}
					/>
				</div>
				<span className="shrink-0 text-xs text-(--text-muted) tabular-nums">
					{isCompleted ? "Completat · 100%" : `Citit · ${scrollProgress}%`}
				</span>
			</div>

			<div className="lesson-theory__layout">
				<main
					ref={contentRef}
					className="lesson-theory__main"
				>
					{blocks.length === 0 ? (
						<p className="py-4 text-sm text-(--text-muted)">
							Niciun continut teoretic pentru aceasta lectie.
						</p>
					) : (
						<div className="space-y-8 py-2">
							{blocks.map((block) =>
								(block.data.content ?? []).map((node, ni) => {
									const key = `${block.id}-${ni}`;
									const effectiveNode = overrides.get(key) ?? (node as AnyNode);
									return (
										<ContentNodeRenderer
											key={key}
											node={effectiveNode}
											onUpdate={(updated) => handleUpdate(block, ni, updated)}
										/>
									);
								}),
							)}
						</div>
					)}
				</main>

				<aside className="lesson-theory__sidebar">
					{prerequisites.length > 0 && (
						<PrerequisitesCard prerequisites={prerequisites} />
					)}
					<RelatedLessonsCard relatedLessons={relatedLessons} />
					{nextLesson && <NextLessonCard nextLesson={nextLesson} />}
				</aside>
			</div>
		</div>
	);
}
