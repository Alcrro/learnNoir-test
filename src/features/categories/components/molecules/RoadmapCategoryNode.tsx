import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import type { CategoryNodeData } from "../../lib/buildRoadmapFlow";

type CategoryNode = Node<CategoryNodeData, "categoryHeader">;

export function RoadmapCategoryNode({ data }: NodeProps<CategoryNode>) {
	return (
		<div className="flex items-center justify-center rounded-full border-2 border-(--border-hover) bg-(--bg-primary) px-5 py-2 text-sm font-bold text-(--text-primary) shadow-md">
			<Handle
				type="target"
				position={Position.Top}
				className="!border-0 !bg-transparent"
			/>
			{data.label}
			<Handle
				type="source"
				position={Position.Bottom}
				className="!border-0 !bg-transparent"
			/>
			<Handle
				type="source"
				id="left"
				position={Position.Left}
				className="!border-0 !bg-transparent"
			/>
			<Handle
				type="source"
				id="right"
				position={Position.Right}
				className="!border-0 !bg-transparent"
			/>
		</div>
	);
}
