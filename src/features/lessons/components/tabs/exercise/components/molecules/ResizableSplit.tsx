import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "../../../../../../../libs/utils/cn";

type Props = {
	top: React.ReactNode;
	bottom: React.ReactNode;
	defaultSplit?: number;
	minTop?: number;
	minBottom?: number;
	className?: string;
};

export function ResizableSplit({
	top,
	bottom,
	defaultSplit = 45,
	minTop = 20,
	minBottom = 20,
	className,
}: Props) {
	const [split, setSplit] = useState(defaultSplit);
	const containerRef = useRef<HTMLDivElement>(null);
	const dragging = useRef(false);

	const onMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!dragging.current || !containerRef.current) return;
			const rect = containerRef.current.getBoundingClientRect();
			const pct = ((e.clientY - rect.top) / rect.height) * 100;
			setSplit(Math.min(100 - minBottom, Math.max(minTop, pct)));
		},
		[minTop, minBottom],
	);

	const stopDrag = useCallback(() => {
		dragging.current = false;
		document.body.style.cursor = "";
		document.body.style.userSelect = "";
	}, []);

	useEffect(() => {
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", stopDrag);
		return () => {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", stopDrag);
		};
	}, [onMouseMove, stopDrag]);

	return (
		<div ref={containerRef} className={cn("flex flex-col overflow-hidden", className)}>
			<div style={{ height: `${split}%` }} className="overflow-auto min-h-0">
				{top}
			</div>

			{/* Drag handle */}
			<div
				onMouseDown={() => {
					dragging.current = true;
					document.body.style.cursor = "row-resize";
					document.body.style.userSelect = "none";
				}}
				className="group relative flex h-1.5 shrink-0 cursor-row-resize items-center justify-center border-y border-(--border) bg-(--surface) hover:bg-blue-600/20 transition-colors"
			>
				<div className="h-0.5 w-8 rounded-full bg-(--border) group-hover:bg-blue-500 transition-colors" />
			</div>

			<div style={{ height: `${100 - split}%` }} className="overflow-hidden min-h-0 flex flex-col">
				{bottom}
			</div>
		</div>
	);
}
