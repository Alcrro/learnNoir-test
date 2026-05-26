import { useMemo, useState } from "react";
import type { LessonContentNode } from "@shared/lesson-content";
import { lessonBlocksApi } from "../../../api/lessonBlocksApi";
import { getNodeDefault } from "../lib/nodeDefaults";
import { computeCompleteness } from "../lib/completenessScore";
import { getWarningsForAddition, type ValidationWarning } from "../lib/validationWarnings";

export type BuilderNode = LessonContentNode & { _id: string };

function uid(): string {
	return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function toBuilderNode(node: LessonContentNode): BuilderNode {
	return { ...node, _id: uid() };
}

type Params = {
	lessonId: string;
	blockId: string | null;
	initialNodes: LessonContentNode[];
};

export function useLayoutBuilder({ lessonId, blockId, initialNodes }: Params) {
	const [nodes, setNodes] = useState<BuilderNode[]>(() =>
		initialNodes.map(toBuilderNode),
	);
	const [isDirty, setIsDirty] = useState(false);
	const [saving, setSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);

	const completeness = useMemo(() => computeCompleteness(nodes), [nodes]);

	function addNode(nodeType: string): ValidationWarning[] {
		const warnings = getWarningsForAddition(nodes, nodeType);
		setNodes((prev) => [...prev, toBuilderNode(getNodeDefault(nodeType))]);
		setIsDirty(true);
		return warnings;
	}

	function removeNode(id: string) {
		setNodes((prev) => prev.filter((n) => n._id !== id));
		setIsDirty(true);
	}

	function reorderNodes(newNodes: BuilderNode[]) {
		setNodes(newNodes);
		setIsDirty(true);
	}

	function updateNode(id: string, updated: LessonContentNode) {
		setNodes((prev) =>
			prev.map((n) => (n._id === id ? { ...updated, _id: id } : n)),
		);
		setIsDirty(true);
	}

	async function save() {
		setSaving(true);
		setSaveError(null);
		// Strip _id before sending to server
		const payload = nodes.map(({ _id, ...rest }) => rest as Record<string, unknown>);
		try {
			if (blockId === null) {
				await lessonBlocksApi.createContentBlock(lessonId, payload);
			} else {
				await lessonBlocksApi.updateContent(blockId, payload);
			}
			setIsDirty(false);
		} catch (err) {
			const message = err instanceof Error ? err.message : "Eroare la salvare";
			setSaveError(message);
			throw err;
		} finally {
			setSaving(false);
		}
	}

	function reset() {
		setNodes(initialNodes.map(toBuilderNode));
		setIsDirty(false);
		setSaveError(null);
	}

	return { nodes, isDirty, saving, saveError, completeness, addNode, removeNode, reorderNodes, updateNode, save, reset };
}
