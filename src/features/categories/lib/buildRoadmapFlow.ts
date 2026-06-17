import type { Node, Edge } from "@xyflow/react";
import type { Subject } from "../../subjects/data/subjects.data";
import { CATEGORY_META } from "../../subjects/data/subjects.data";

const ESSENTIAL_W = 220;
const SIDE_W = 180;
const HEADER_W = 140;
const ITEM_H = 90;
const HEADER_H = 50;
const CATEGORY_GAP = 50;

// All positions are relative to spine center at x=0
const X = {
	header: -(HEADER_W / 2),
	essential: -(ESSENTIAL_W / 2),
	normal: ESSENTIAL_W / 2 + 30,
	optional: -(ESSENTIAL_W / 2) - 30 - SIDE_W,
};

export type CategoryNodeData = Record<string, unknown> & { label: string };
export type ModuleNodeData = Record<string, unknown> & {
	subject: Subject;
	subjectSlug: string;
};

export function buildRoadmapFlow(
	groups: [string, Subject[]][],
	subjectSlug: string,
): { nodes: Node[]; edges: Edge[]; totalHeight: number } {
	const nodes: Node[] = [];
	const edges: Edge[] = [];
	let currentY = 0;

	for (const [cat, items] of groups) {
		const essential = items.filter((i) => i.importance === "essential");
		const normal = items.filter((i) => i.importance === "normal");
		const optional = items.filter((i) => i.importance === "optional");
		const maxRows = Math.max(essential.length, normal.length, optional.length, 1);
		const headerId = `cat-${cat}`;

		nodes.push({
			id: headerId,
			type: "categoryHeader",
			position: { x: X.header, y: currentY },
			data: { label: CATEGORY_META[cat]?.label ?? cat } satisfies CategoryNodeData,
			width: HEADER_W,
			height: HEADER_H,
		});

		const itemsY = currentY + HEADER_H + 10;

		essential.forEach((item, i) => {
			const id = `mod-${item.id}`;
			nodes.push({
				id,
				type: "moduleCard",
				position: { x: X.essential, y: itemsY + i * ITEM_H },
				data: { subject: item, subjectSlug } satisfies ModuleNodeData,
				width: ESSENTIAL_W,
				height: ITEM_H - 10,
			});
			edges.push({
				id: `e-${headerId}-${id}`,
				source: headerId,
				target: id,
				type: "smoothstep",
				style: { strokeWidth: 1.5 },
			});
		});

		normal.forEach((item, i) => {
			const id = `mod-${item.id}`;
			nodes.push({
				id,
				type: "moduleCard",
				position: { x: X.normal, y: itemsY + i * ITEM_H },
				data: { subject: item, subjectSlug } satisfies ModuleNodeData,
				width: SIDE_W,
				height: ITEM_H - 10,
			});
			edges.push({
				id: `e-${headerId}-${id}`,
				source: headerId,
				target: id,
				type: "smoothstep",
				style: { strokeWidth: 1, strokeDasharray: "5 4" },
			});
		});

		optional.forEach((item, i) => {
			const id = `mod-${item.id}`;
			nodes.push({
				id,
				type: "moduleCard",
				position: { x: X.optional, y: itemsY + i * ITEM_H },
				data: { subject: item, subjectSlug } satisfies ModuleNodeData,
				width: SIDE_W,
				height: ITEM_H - 10,
			});
			edges.push({
				id: `e-${headerId}-${id}`,
				source: headerId,
				target: id,
				type: "smoothstep",
				style: { strokeWidth: 1, strokeDasharray: "5 4", stroke: "#94a3b8" },
			});
		});

		currentY = itemsY + maxRows * ITEM_H + CATEGORY_GAP;
	}

	return { nodes, edges, totalHeight: currentY };
}
