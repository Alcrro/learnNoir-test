import { useMemo } from "react";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { RoadmapLegend } from "../atoms/RoadmapLegend";
import { RoadmapCategoryNode } from "../molecules/RoadmapCategoryNode";
import { RoadmapModuleNode } from "../molecules/RoadmapModuleNode";
import { buildRoadmapFlow } from "../../lib/buildRoadmapFlow";
import { CATEGORY_ORDER } from "../../lib/categoryOrder";
import type { Subject } from "../../../subjects/data/subjects.data";

const nodeTypes = {
	categoryHeader: RoadmapCategoryNode,
	moduleCard: RoadmapModuleNode,
};

interface RoadmapViewProps {
	items: Subject[];
	subjectSlug: string;
}

export function RoadmapView({ items, subjectSlug }: RoadmapViewProps) {
	const { nodes, edges, totalHeight } = useMemo(() => {
		const sorted = [...items].sort((a, b) => {
			const ao = CATEGORY_ORDER[a.category] ?? 99;
			const bo = CATEGORY_ORDER[b.category] ?? 99;
			return ao - bo;
		});

		const groups = new Map<string, Subject[]>();
		for (const item of sorted) {
			const existing = groups.get(item.category) ?? [];
			existing.push(item);
			groups.set(item.category, existing);
		}

		return buildRoadmapFlow([...groups.entries()], subjectSlug);
	}, [items, subjectSlug]);

	// Start viewport centered on spine (x≈0), top of graph, comfortable zoom
	const defaultViewport = useMemo(() => {
		// Spine is at x=0; offset to center it in the container (approx 900px wide container)
		return { x: 450, y: 20, zoom: 0.85 };
	}, []);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<RoadmapLegend />
				<span className="text-xs text-(--text-tertiary)">
					{items.length} modules · scroll to pan · Ctrl+scroll to zoom
				</span>
			</div>

			<div className="h-[700px] w-full overflow-hidden rounded-xl border border-(--border)">
				<ReactFlow
					nodes={nodes}
					edges={edges}
					nodeTypes={nodeTypes}
					defaultViewport={defaultViewport}
					nodesDraggable={false}
					nodesConnectable={false}
					panOnDrag
					panOnScroll
					zoomOnScroll={false}
					zoomOnPinch
					zoomActivationKeyCode="Control"
					minZoom={0.2}
					maxZoom={2}
					translateExtent={[
						[-500, -80],
						[600, totalHeight + 150],
					]}
					proOptions={{ hideAttribution: true }}
				>
					<Background gap={24} size={1} color="var(--border)" />
					<Controls showInteractive={false} position="bottom-right" />
				</ReactFlow>
			</div>
		</div>
	);
}
