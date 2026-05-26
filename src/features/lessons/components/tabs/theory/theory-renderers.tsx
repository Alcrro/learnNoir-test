import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard } from "lucide-react";
import { LessonTheoryContent } from "./LessonTheoryContent";
import { useLessonTabContext } from "../../../context/LessonTabContext";
import { useLessonContext } from "../../../context/LessonContext";
import { lessonQueryKeys } from "../../../lib/lessonQueryKeys";
import { LayoutBuilder } from "../../builder/organisms/LayoutBuilder";
import type { LessonContentNode } from "@shared/lesson-content";

export function TheoryTabContent() {
	const { lessonId, contentBlocks } = useLessonTabContext();
	const { canEdit } = useLessonContext();
	const queryClient = useQueryClient();
	const [isBuilderMode, setIsBuilderMode] = useState(false);

	const contentBlock = contentBlocks[0] ?? null;
	const hasContent = (contentBlock?.data?.content?.length ?? 0) > 0;

	function invalidateBlocks() {
		queryClient.invalidateQueries({ queryKey: lessonQueryKeys.blocks(lessonId) });
	}

	// Professor, no content yet → show builder directly
	if (canEdit && !hasContent) {
		return (
			<LayoutBuilder
				lessonId={lessonId}
				blockId={contentBlock?.id ?? null}
				initialNodes={[]}
				onSaveSuccess={invalidateBlocks}
			/>
		);
	}

	// Professor in builder mode
	if (canEdit && isBuilderMode) {
		return (
			<div className="flex flex-col gap-4">
				<button
					type="button"
					onClick={() => setIsBuilderMode(false)}
					className="self-start text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors"
				>
					← Înapoi la preview
				</button>
				<LayoutBuilder
					lessonId={lessonId}
					blockId={contentBlock?.id ?? null}
					initialNodes={(contentBlock?.data?.content ?? []) as LessonContentNode[]}
					onSaveSuccess={() => { setIsBuilderMode(false); invalidateBlocks(); }}
				/>
			</div>
		);
	}

	// "Edit Layout" button — shown above content for professors
	const editButton = canEdit && (
		<div className="flex justify-end mb-3">
			<button
				type="button"
				onClick={() => setIsBuilderMode(true)}
				className="flex items-center gap-1.5 rounded-lg border border-(--border) px-3 py-1.5 text-sm text-(--text-secondary) hover:bg-(--surface-hover) transition-colors"
			>
				<LayoutDashboard size={14} />
				Edit Layout
			</button>
		</div>
	);

	// Preview: all lesson types render via ContentNodeRenderer (node registry).
	// AlgorithmLessonTheoryV2 has a hardcoded structure that ignores data.content,
	// so builder-saved nodes would never appear through it.
	return (
		<>
			{editButton}
			<LessonTheoryContent blocks={contentBlocks} lessonId={lessonId} />
		</>
	);
}
