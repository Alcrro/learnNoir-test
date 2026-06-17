import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";
import { useNavigate } from "react-router-dom";
import { ImportanceBadge } from "../atoms/ImportanceBadge";
import { cn } from "../../../../libs/utils/cn";
import type { ModuleNodeData } from "../../lib/buildRoadmapFlow";

type ModuleNode = Node<ModuleNodeData, "moduleCard">;

export function RoadmapModuleNode({ data }: NodeProps<ModuleNode>) {
	const { subject, subjectSlug } = data;
	const navigate = useNavigate();
	const href = `/subjects/${subjectSlug}/${subject.category}/${subject.id}`;
	const isCompleted =
		subject.completedLessons > 0 && subject.completedLessons >= subject.totalLessons;

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={() => navigate(href)}
			onKeyDown={(e) => e.key === "Enter" && navigate(href)}
			style={{ pointerEvents: "all" }}
			className={cn(
				"group cursor-pointer rounded-lg border bg-(--bg-primary) p-3 shadow-sm transition-shadow hover:shadow-md",
				subject.importance === "essential"
					? "border-(--border-hover)"
					: "border-(--border)",
				isCompleted && "opacity-60",
			)}
		>
			<Handle type="target" position={Position.Top} className="!border-0 !bg-transparent" />
			<Handle type="target" position={Position.Left} className="!border-0 !bg-transparent" />
			<Handle type="target" position={Position.Right} className="!border-0 !bg-transparent" />

			<div className="flex items-start justify-between gap-1">
				<span
					className={cn(
						"font-semibold leading-tight text-(--text-primary) group-hover:text-(--accent)",
						subject.importance === "essential" ? "text-sm" : "text-xs",
					)}
				>
					{subject.title}
				</span>
				<ImportanceBadge importance={subject.importance} className="shrink-0" />
			</div>

			{subject.totalLessons > 0 && (
				<p className="mt-1 text-xs text-(--text-tertiary)">
					{subject.totalLessons} lessons · {subject.estimatedHours}h
				</p>
			)}

			{isCompleted && (
				<p className="mt-1 text-xs font-medium text-emerald-500">✓ Completed</p>
			)}
		</div>
	);
}
