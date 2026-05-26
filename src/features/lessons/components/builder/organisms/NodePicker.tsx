import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "../../../../../libs/utils/cn";
import { LEVELS, type LevelId } from "../lib/levelConfig";
import { getWarningsForAddition } from "../lib/validationWarnings";
import { NodePickerCard } from "../molecules/NodePickerCard";
import type { LessonContentNode } from "@shared/lesson-content";

const ALL_NODE_TYPES = LEVELS.flatMap((l) => l.nodeTypes);

type Props = {
	open: boolean;
	onClose: () => void;
	onSelect: (nodeType: string) => void;
	existingNodes: LessonContentNode[];
	disabled?: boolean;
};

export function NodePicker({ open, onClose, onSelect, existingNodes, disabled }: Props) {
	const [activeFilter, setActiveFilter] = useState<LevelId | null>(null);
	const [hoveredType, setHoveredType] = useState<string | null>(null);
	const panelRef = useRef<HTMLDivElement>(null);

	const hasNoL1 = !existingNodes.some(
		(n) => LEVELS.find((l) => l.id === 1)?.nodeTypes.includes(n.type),
	);

	const visibleTypes = activeFilter
		? LEVELS.find((l) => l.id === activeFilter)?.nodeTypes ?? []
		: ALL_NODE_TYPES;

	const warnings = hoveredType
		? getWarningsForAddition(existingNodes, hoveredType)
		: [];

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
		>
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

			<div
				ref={panelRef}
				className="relative z-10 flex flex-col w-full max-w-3xl max-h-[85vh] rounded-xl border border-(--border) bg-(--bg-base) shadow-2xl"
			>
				{/* Header */}
				<div className="flex items-center justify-between border-b border-(--border) px-4 py-3">
					<h2 className="font-semibold text-(--text-primary)">Alege un bloc</h2>
					<button
						type="button"
						onClick={onClose}
						className="text-(--text-muted) hover:text-(--text-primary) transition-colors"
					>
						<X size={18} />
					</button>
				</div>

				{/* Filters */}
				<div className="flex items-center gap-1.5 border-b border-(--border) px-4 py-2 flex-wrap">
					<button
						type="button"
						onClick={() => setActiveFilter(null)}
						className={cn(
							"rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
							activeFilter === null
								? "bg-(--btn-primary-bg) text-(--btn-primary-text)"
								: "text-(--text-secondary) hover:bg-(--surface-hover)",
						)}
					>
						Toate
					</button>
					{LEVELS.map((level) => (
						<button
							key={level.id}
							type="button"
							onClick={() => setActiveFilter(level.id === activeFilter ? null : level.id)}
							className={cn(
								"relative rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
								activeFilter === level.id
									? "bg-(--btn-primary-bg) text-(--btn-primary-text)"
									: "text-(--text-secondary) hover:bg-(--surface-hover)",
							)}
						>
							{level.badge} {level.label}
							{level.id === 1 && hasNoL1 && (
								<span className="ml-1 rounded bg-blue-500 px-1 py-0.5 text-[9px] text-white">
									Recomandat
								</span>
							)}
						</button>
					))}
				</div>

				{/* Warning banner */}
				{warnings.length > 0 && (
					<div className="border-b border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30 px-4 py-2">
						<p className="text-xs text-orange-700 dark:text-orange-300">
							⚠ {warnings[0].message}
						</p>
					</div>
				)}

				{/* Grid */}
				<div className="flex-1 overflow-y-auto p-4">
					<div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
						{visibleTypes.map((nodeType) => {
							const nodeWarnings = getWarningsForAddition(existingNodes, nodeType);
							return (
								<div
									key={nodeType}
									onMouseEnter={() => setHoveredType(nodeType)}
									onMouseLeave={() => setHoveredType(null)}
								>
									<NodePickerCard
										nodeType={nodeType}
										onSelect={onSelect}
										disabled={disabled}
										hasWarning={nodeWarnings.length > 0}
									/>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
