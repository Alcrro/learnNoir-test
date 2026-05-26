import type { ContentBlock } from "../../../../api/lessonBlocksApi";
import type { AnyNode } from "../ContentNodeRenderer";

export function buildUpdatedContent(
	block: ContentBlock,
	nodeIdx: number,
	updated: AnyNode,
): Record<string, unknown>[] {
	const currentContent = block.data.content ?? [];
	return currentContent.map((n, i) =>
		i === nodeIdx ? (updated as Record<string, unknown>) : (n as Record<string, unknown>),
	);
}
