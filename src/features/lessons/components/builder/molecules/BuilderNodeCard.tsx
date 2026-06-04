import { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "../../../../../libs/utils/cn";
import { getLevelForNodeType } from "../lib/levelConfig";
import { DragHandle } from "../atoms/DragHandle";
import { LevelBadge } from "../atoms/LevelBadge";
import { NodeTypeBadge } from "../atoms/NodeTypeBadge";
import { NodeContentPanel } from "./NodeContentPanel";
import type { LessonContentNode } from "@shared/lesson-content";

export type BuilderNode = LessonContentNode & { _id: string };

type Props = {
	id: string;
	node: BuilderNode;
	lessonTitle?: string;
	onDelete: (id: string) => void;
	onUpdate: (id: string, updated: LessonContentNode) => void;
};

function getPreview(node: BuilderNode): string {
	const n = node as Record<string, unknown>;
	switch (node.type) {
		case "heading":
		case "paragraph":
			return truncate(String(n.text ?? ""), 60) || "(fără text)";
		case "concept":
			return String(n.title ?? "") || "(fără titlu)";
		case "steps":
			return `${(n.steps as unknown[])?.length ?? 0} pași`;
		case "example":
			return `${(n.initial as unknown[])?.length ?? 0} elemente`;
		case "formula":
			return truncate(String(n.latex ?? ""), 40) || "(fără formulă)";
		case "theorem":
			return truncate(String(n.title ?? n.statement ?? ""), 50) || "(fără titlu)";
		case "proof":
			return `${(n.steps as unknown[])?.length ?? 0} pași de demonstrație`;
		case "code":
		case "code-runner":
			return truncate(String(n.code ?? ""), 40) || "(fără cod)";
		case "complexity":
			return `${(n.cases as unknown[])?.length ?? 0} cazuri`;
		case "think":
		case "predict":
		case "inline-quiz":
			return truncate(String(n.question ?? ""), 60) || "(fără întrebare)";
		case "recall":
			return `${(n.questions as unknown[])?.length ?? 0} întrebări`;
		case "fill-blanks":
			return `${(n.blanks as unknown[])?.length ?? 0} spații de completat`;
		case "drag-sort":
			return `${(n.items as unknown[])?.length ?? 0} elemente de sortat`;
		default:
			return node.type;
	}
}

function truncate(s: string, max: number) {
	return s.length > max ? s.slice(0, max) + "…" : s;
}

export function BuilderNodeCard({ id, node, lessonTitle, onDelete, onUpdate }: Props) {
	const [expanded, setExpanded] = useState(false);
	const { listeners, attributes, setNodeRef, transform, transition, isDragging } = useSortable({ id });
	const level = getLevelForNodeType(node.type);

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={cn(
				"rounded-lg border bg-(--bg-card) transition-shadow",
				"border-(--border)",
				isDragging && "opacity-40 border-dashed shadow-lg",
			)}
		>
			{/* Header row */}
			<div className="flex items-center gap-2 px-3 py-2.5">
				<DragHandle listeners={listeners} attributes={attributes} />

				<div className="flex items-center gap-1.5 shrink-0">
					{level && <LevelBadge levelId={level.id} />}
					<NodeTypeBadge nodeType={node.type} />
				</div>

				<button
					type="button"
					onClick={() => setExpanded((e) => !e)}
					className="flex-1 min-w-0 text-left"
				>
					<span className="truncate text-sm text-(--text-secondary) block">
						{getPreview(node)}
					</span>
				</button>

				<button
					type="button"
					aria-label={expanded ? "Restrânge" : "Expandează"}
					onClick={() => setExpanded((e) => !e)}
					className="shrink-0 text-(--text-muted) hover:text-(--text-primary) transition-colors"
				>
					{expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
				</button>

				<button
					type="button"
					aria-label="Șterge bloc"
					onClick={() => onDelete(id)}
					className="shrink-0 text-(--text-muted) hover:text-red-500 transition-colors"
				>
					<X size={14} />
				</button>
			</div>

			{/* Expanded content panel */}
			{expanded && (
				<div className="px-3 pb-3">
					<NodeContentPanel
						nodeId={id}
						node={node}
						lessonTitle={lessonTitle}
						onUpdate={onUpdate}
						onClose={() => setExpanded(false)}
					/>
				</div>
			)}
		</div>
	);
}
