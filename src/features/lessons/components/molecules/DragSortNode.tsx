import { useState, useRef, useCallback } from "react";
import { DragInteraction } from "../../../computer-science/algorithms/components/interactions/DragInteraction";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { cn } from "../../../../libs/utils/cn";
import type { AnyNode } from "../tabs/theory/node-registry";

type InternalItem = { numId: number; label: string; correctIndex: number };

function isInOrder(items: InternalItem[]) {
	return items.every((item, i) => i === 0 || item.correctIndex > items[i - 1].correctIndex);
}

function shuffled<T>(arr: T[]): T[] {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j]!, a[i]!];
	}
	return a;
}

export function DragSortNode({ node }: { node: AnyNode }) {
	const rawItems = Array.isArray(node.items)
		? (node.items as Array<{ id?: unknown; label?: unknown }>).filter(
				(v) => typeof v.label === "string",
			)
		: [];
	const title = typeof node.title === "string" ? node.title : "Reordonează elementele";

	const initial: InternalItem[] = rawItems.map((item, i) => ({
		numId: i,
		label: item.label as string,
		correctIndex: i,
	}));

	const [items, setItems] = useState<InternalItem[]>(() => shuffled(initial));
	const [activeId, setActiveId] = useState<number | null>(null);
	const [hoverId, setHoverId] = useState<number | null>(null);
	const [done, setDone] = useState(false);

	const activeRef = useRef<number | null>(null);
	const hoverRef = useRef<number | null>(null);

	const handleDragStart = useCallback((id: number) => {
		activeRef.current = id;
		setActiveId(id);
	}, []);

	const handleHover = useCallback((id: number) => {
		hoverRef.current = id;
		setHoverId(id);
	}, []);

	const handleDrop = useCallback(() => {
		const aid = activeRef.current;
		const hid = hoverRef.current;

		setItems((prev) => {
			if (aid == null || hid == null || aid === hid) return prev;
			const i1 = prev.findIndex((x) => x.numId === aid);
			const i2 = prev.findIndex((x) => x.numId === hid);
			if (i1 === -1 || i2 === -1) return prev;
			const next = [...prev];
			[next[i1], next[i2]] = [next[i2]!, next[i1]!];
			if (isInOrder(next)) setDone(true);
			return next;
		});

		activeRef.current = null;
		hoverRef.current = null;
		setActiveId(null);
		setHoverId(null);
	}, []);

	const reset = () => {
		setItems(shuffled(initial));
		setDone(false);
		setActiveId(null);
		setHoverId(null);
		activeRef.current = null;
		hoverRef.current = null;
	};

	if (initial.length === 0) return null;

	return (
		<div className="rounded-xl border border-(--border) bg-(--surface) p-5">
			<div className="flex items-center justify-between mb-4">
				<p className="text-sm font-semibold text-(--text-primary)">{title}</p>
				<button
					onClick={reset}
					className="flex items-center gap-1.5 text-xs text-(--text-muted) hover:text-(--text-primary) transition-colors cursor-pointer"
				>
					<RotateCcw size={12} />
					Reset
				</button>
			</div>

			<div className="flex flex-col gap-2">
				{items.map((item, i) => (
					<DragInteraction
						key={item.numId}
						id={item.numId}
						onDragStart={handleDragStart}
						onHover={handleHover}
						onDrop={handleDrop}
						className={cn(
							"rounded-lg border px-4 py-2.5 text-sm select-none transition-all duration-150",
							"bg-(--surface-hover) text-(--text-primary) border-(--border)",
							item.numId === activeId && "opacity-40 scale-[0.98]",
							item.numId === hoverId &&
								activeId !== null &&
								item.numId !== activeId &&
								"border-blue-500 bg-blue-500/10",
							done && "border-green-500 bg-green-500/10 text-green-700",
						)}
					>
						<span className="text-xs font-mono text-(--text-muted) mr-3 tabular-nums">
							{i + 1}.
						</span>
						{item.label}
					</DragInteraction>
				))}
			</div>

			{done && (
				<div className="flex items-center gap-2 text-green-600 text-sm font-medium pt-4">
					<CheckCircle2 size={15} />
					Ordinea corectă!
				</div>
			)}
		</div>
	);
}
