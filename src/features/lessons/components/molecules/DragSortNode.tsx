import { SortDragExercise } from "../../../../features/computer-science/algorithms/components/lesson/theory-v2/SortDragExercise";
import "../../../../features/computer-science/algorithms/components/lesson/lessonTheory.css";
import type { AnyNode } from "../tabs/theory/node-registry";

export function DragSortNode({ node }: { node: AnyNode }) {
	const items = Array.isArray(node.items) ? (node.items as number[]) : [];
	const title = typeof node.title === "string" ? node.title : undefined;
	const hint = typeof node.hint === "string" ? node.hint : undefined;

	if (items.length === 0) return null;

	return (
		<SortDragExercise
			initialArray={items}
			title={title}
			hint={hint}
		/>
	);
}
