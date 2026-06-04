import type { RefObject } from "react";
import type { ContentBlock } from "../../api/lessonBlocksApi";
import UseGetProfile from "../../../profiles/hooks/UseGetProfile";
import { TheoryLevelSection } from "../TheoryLevelSection";
import type { AnyNode } from "../tabs/theory/ContentNodeRenderer";
import { ContentNodeRenderer } from "../tabs/theory/ContentNodeRenderer";

type Props = {
	blocks: ContentBlock[];
	overrides: Map<string, AnyNode>;
	contentRef: RefObject<HTMLDivElement | null>;
	onUpdate: (block: ContentBlock, nodeIdx: number, updated: AnyNode) => void;
};

export function TheoryBlockList({ blocks, overrides, contentRef, onUpdate }: Props) {
	const { isAuthenticated } = UseGetProfile();

	return (
		<main ref={contentRef} className="lesson-theory__main">
			{blocks.length === 0 ? (
				<p className="py-4 text-sm text-(--text-muted)">
					Niciun continut teoretic pentru aceasta lectie.
				</p>
			) : (
				<div className="space-y-8 py-2">
					{blocks.map((block) => (
						<div key={block.id} className="flex flex-col gap-6">
							{(block.data.content ?? []).map((node, ni) => {
								const key = `${block.id}-${ni}`;
								const effectiveNode = overrides.get(key) ?? (node as AnyNode);
								return (
									<ContentNodeRenderer
										key={key}
										node={effectiveNode}
										onUpdate={(updated) => onUpdate(block, ni, updated)}
									/>
								);
							})}
						</div>
					))}
					{isAuthenticated && blocks[0] && (
						<TheoryLevelSection blockId={blocks[0].id} />
					)}
				</div>
			)}
		</main>
	);
}
