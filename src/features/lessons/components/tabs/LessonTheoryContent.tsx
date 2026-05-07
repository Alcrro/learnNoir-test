import type { ContentBlock } from "../../api/lessonBlocksApi";
import { ContentNodeRenderer } from "./ContentNodeRenderer";

type AnyNode = { type?: string; nodeType?: string; [key: string]: unknown };

type Props = { blocks: ContentBlock[] };

export function LessonTheoryContent({ blocks }: Props) {
	if (blocks.length === 0)
		return (
			<p className="py-4 text-sm text-(--text-muted)">
				Niciun continut teoretic pentru aceasta lectie.
			</p>
		);

	return (
		<div className="space-y-8 py-2">
			{blocks.map((block) =>
				(block.data.content ?? []).map((node, i) => (
					<ContentNodeRenderer
						key={`${block.id}-${i}`}
						node={node as AnyNode}
					/>
				)),
			)}
		</div>
	);
}
