import { useState } from "react";
import {
	DndContext,
	DragOverlay,
	closestCenter,
	type DragEndEvent,
	type DragStartEvent,
} from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { BuilderNodeCard, type BuilderNode } from "../molecules/BuilderNodeCard";
import type { LessonContentNode } from "@shared/lesson-content";

type Props = {
	nodes: BuilderNode[];
	lessonTitle?: string;
	onReorder: (newNodes: BuilderNode[]) => void;
	onDelete: (id: string) => void;
	onUpdate: (id: string, updated: LessonContentNode) => void;
};

export function BuilderCanvas({ nodes, lessonTitle, onReorder, onDelete, onUpdate }: Props) {
	const [activeId, setActiveId] = useState<string | null>(null);
	const activeNode = nodes.find((n) => n._id === activeId);

	function handleDragStart(event: DragStartEvent) {
		setActiveId(String(event.active.id));
	}

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		setActiveId(null);
		if (!over || active.id === over.id) return;
		const oldIndex = nodes.findIndex((n) => n._id === active.id);
		const newIndex = nodes.findIndex((n) => n._id === over.id);
		onReorder(arrayMove(nodes, oldIndex, newIndex));
	}

	if (nodes.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-(--border) py-12 text-center">
				<p className="text-sm text-(--text-muted)">
					Niciun bloc adăugat. Apasă „+" pentru a începe.
				</p>
			</div>
		);
	}

	return (
		<DndContext
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={nodes.map((n) => n._id)}
				strategy={verticalListSortingStrategy}
			>
				<div className="flex flex-col gap-2">
					{nodes.map((node) => (
						<BuilderNodeCard
							key={node._id}
							id={node._id}
							node={node}
							lessonTitle={lessonTitle}
							onDelete={onDelete}
							onUpdate={onUpdate}
						/>
					))}
				</div>
			</SortableContext>

			<DragOverlay>
				{activeNode && (
					<div className="opacity-80 rotate-1 shadow-xl">
						<BuilderNodeCard
							id={activeNode._id}
							node={activeNode}
							onDelete={() => {}}
							onUpdate={() => {}}
						/>
					</div>
				)}
			</DragOverlay>
		</DndContext>
	);
}
