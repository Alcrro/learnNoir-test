import { useState } from "react";
import type { ContentBlock } from "../../api/lessonBlocksApi";
import { ContentNodeRenderer, type AnyNode } from "./ContentNodeRenderer";
import { useUpdateBlockContent } from "../../hooks/useUpdateBlockContent";

type Props = { blocks: ContentBlock[]; lessonId: string };

export function LessonTheoryContent({ blocks, lessonId }: Props) {
	const [overrides, setOverrides] = useState<Map<string, AnyNode>>(new Map());
	const { mutate: saveContent } = useUpdateBlockContent(lessonId);

	if (blocks.length === 0)
		return (
			<p className="py-4 text-sm text-(--text-muted)">
				Niciun continut teoretic pentru aceasta lectie.
			</p>
		);

	function handleUpdate(block: ContentBlock, nodeIdx: number, updated: AnyNode) {
		// Optimistic local update
		setOverrides((prev) => {
			const next = new Map(prev);
			next.set(`${block.id}-${nodeIdx}`, updated);
			return next;
		});

		// Build the full updated content array for this block
		const currentContent = block.data.content ?? [];
		const newContent = currentContent.map((n, i) => {
			if (i !== nodeIdx) return n;
			const key = `${block.id}-${i}`;
			return (overrides.get(key) ?? updated) as Record<string, unknown>;
		});
		// Replace the node at nodeIdx with the freshly edited one
		newContent[nodeIdx] = updated as Record<string, unknown>;

		saveContent({ blockId: block.id, content: newContent });
	}

	return (
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
	);
}
