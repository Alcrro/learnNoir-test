import { useState, useRef, useCallback } from "react";
import { DragInteraction } from "../../interactions/DragInteraction";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { cn } from "../../../../../../libs/utils/cn";

type DragItem = { id: number; value: number };

function isSorted(items: DragItem[]) {
	return items.every((item, i) => i === 0 || item.value >= items[i - 1].value);
}

function toItems(arr: number[]): DragItem[] {
	return arr.map((value, id) => ({ id, value }));
}

type Props = {
	initialArray: number[];
	title?: string;
	hint?: string;
};

export function SortDragExercise({
	initialArray,
	title = "Practică: sortează manual",
	hint = "Trage elementele pentru a le ordona crescător",
}: Props) {
	const [items, setItems] = useState<DragItem[]>(() => toItems(initialArray));
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
			const i1 = prev.findIndex((x) => x.id === aid);
			const i2 = prev.findIndex((x) => x.id === hid);
			if (i1 === -1 || i2 === -1) return prev;
			const next = [...prev];
			[next[i1], next[i2]] = [next[i2], next[i1]];
			if (isSorted(next)) setDone(true);
			return next;
		});

		activeRef.current = null;
		hoverRef.current = null;
		setActiveId(null);
		setHoverId(null);
	}, []);

	const reset = () => {
		setItems(toItems(initialArray));
		setDone(false);
		setActiveId(null);
		setHoverId(null);
		activeRef.current = null;
		hoverRef.current = null;
	};

	return (
		<div className="rounded-xl border border-(--border) bg-(--surface) p-5 mb-6">
			<div className="flex items-center justify-between mb-3">
				<div>
					<p className="text-sm font-semibold text-(--text-primary)">{title}</p>
					<p className="text-xs text-(--text-muted) mt-0.5">{hint}</p>
				</div>
				<button
					onClick={reset}
					className="flex items-center gap-1.5 text-xs text-(--text-muted) hover:text-(--text-primary) transition-colors cursor-pointer"
				>
					<RotateCcw size={12} />
					Reset
				</button>
			</div>

			<div className="flex items-center justify-center gap-3 py-4">
				{items.map((item) => (
					<DragInteraction
						key={item.id}
						id={item.id}
						onDragStart={handleDragStart}
						onHover={handleHover}
						onDrop={handleDrop}
						className={cn(
							"w-12 h-12 rounded-lg border-2 flex items-center justify-center text-base font-bold select-none transition-all duration-150",
							"bg-(--surface) text-(--text-primary) border-(--border)",
							item.id === activeId && "opacity-40 scale-95",
							item.id === hoverId &&
								activeId !== null &&
								item.id !== activeId &&
								"border-blue-500 bg-blue-500/10 scale-105",
							done && "border-green-500 bg-green-500/10 text-green-600",
						)}
					>
						{item.value}
					</DragInteraction>
				))}
			</div>

			{done && (
				<div className="flex items-center justify-center gap-2 text-green-600 text-sm font-medium pt-1">
					<CheckCircle2 size={15} />
					Array sortat! Exact cum face Bubble Sort.
				</div>
			)}
		</div>
	);
}
