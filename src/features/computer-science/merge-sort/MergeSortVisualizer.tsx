import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import {
	Play,
	Pause,
	RotateCcw,
	ChevronLeft,
	ChevronRight,
	GitBranch,
	Merge,
	CheckCircle2,
} from "lucide-react";
import { cn } from "../../../libs/utils/cn";
import { mergeSortFrames } from "./domain/mergeSortFrames";
import type { MergeSortPhase, TreeNode } from "./types/mergeSort.types";

gsap.registerPlugin(Flip);

const ROW_COLORS = ["#ff6b6b", "#9b59b6", "#3b82f6", "#1abc9c"];

const PHASE_META: Record<
	MergeSortPhase,
	{ label: string; icon: React.ReactNode; color: string }
> = {
	divide: { label: "Divide", icon: <GitBranch size={11} />, color: "#ff6b6b" },
	merge: { label: "Merge", icon: <Merge size={11} />, color: "#1abc9c" },
	done: { label: "Done", icon: <CheckCircle2 size={11} />, color: "#febc2e" },
};

function getNodeColor(node: TreeNode, rowIdx: number): string {
	if (node.state === "idle") return "#44445a";
	if (node.state === "sorted") return "#1abc9c";
	if (node.state === "done") return "#febc2e";
	return ROW_COLORS[rowIdx] ?? "#ff6b6b";
}

function NodeBox({ node, rowIdx }: { node: TreeNode; rowIdx: number }) {
	const color = getNodeColor(node, rowIdx);
	return (
		<div
			className="relative rounded-xl border-2 p-2.5 flex-1 flex items-center justify-center min-h-[3rem]"
			style={{
				borderColor: color,
				boxShadow: `0 0 14px ${color}22`,
				backgroundColor: `${color}08`,
			}}
		>
			<div className="flex flex-wrap gap-1.5 items-center justify-center">
				{node.items.map((item) => (
					<div
						key={item.id}
						data-flip-id={item.id}
						className="w-8 h-8 flex items-center justify-center rounded-lg border font-bold text-sm shrink-0"
						style={{
							borderColor: `${color}55`,
							color,
							backgroundColor: `${color}18`,
						}}
					>
						{item.label}
					</div>
				))}
			</div>
		</div>
	);
}

function ControlBtn({
	onClick,
	disabled,
	title,
	children,
}: {
	onClick: () => void;
	disabled?: boolean;
	title?: string;
	children: React.ReactNode;
}) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			title={title}
			className={cn(
				"flex items-center justify-center w-9 h-9 rounded-lg border transition-colors",
				"border-(--border) text-(--text-secondary)",
				"hover:text-(--text-primary) hover:border-(--text-muted)",
				"disabled:opacity-30 disabled:cursor-not-allowed",
			)}
		>
			{children}
		</button>
	);
}

const MergeSortVisualizer = () => {
	const [currentFrame, setCurrentFrame] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null);

	const frame = mergeSortFrames[currentFrame];
	const totalFrames = mergeSortFrames.length;

	const goToFrame = (idx: number) => {
		if (idx < 0 || idx >= totalFrames) return;
		flipStateRef.current = Flip.getState("[data-flip-id]");
		setCurrentFrame(idx);
	};

	useLayoutEffect(() => {
		if (!flipStateRef.current) return;
		const state = flipStateRef.current;
		flipStateRef.current = null;
		requestAnimationFrame(() => {
			Flip.from(state, {
				duration: 0.5,
				ease: "power2.inOut",
				onEnter: (els: Element[]) =>
					gsap.from(els, { opacity: 0, scale: 0.4, duration: 0.3, ease: "back.out(2)" }),
				onLeave: (els: Element[]) =>
					gsap.to(els, { opacity: 0, scale: 0.4, duration: 0.25 }),
			});
		});
	}, [currentFrame]);

	useEffect(() => {
		if (!isPlaying) return;
		if (currentFrame >= totalFrames - 1) {
			setIsPlaying(false);
			return;
		}
		const id = setTimeout(() => goToFrame(currentFrame + 1), 2000);
		return () => clearTimeout(id);
	}, [isPlaying, currentFrame, totalFrames]);

	if (!frame) return null;

	const phaseMeta = PHASE_META[frame.phase];

	return (
		<div className="flex flex-col gap-4">
			{/* Header */}
			<div className="flex items-center justify-between flex-wrap gap-3">
				<div className="flex items-center gap-2">
					<span
						className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border"
						style={{
							color: phaseMeta.color,
							borderColor: `${phaseMeta.color}50`,
							backgroundColor: `${phaseMeta.color}12`,
						}}
					>
						{phaseMeta.icon}
						{phaseMeta.label}
					</span>
					<span className="font-mono text-sm text-(--text-primary) font-semibold">
						{frame.stepLabel}
					</span>
				</div>
				<span className="text-xs font-mono text-(--text-muted)">
					{currentFrame + 1} / {totalFrames}
				</span>
			</div>

			{/* Tree diagram */}
			<div
				className="relative rounded-xl border border-(--border) p-5 pt-8"
				style={{ backgroundColor: "#0a0a12" }}
			>
				<span
					className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase rounded-full border"
					style={{
						backgroundColor: "#0a0a12",
						borderColor: "rgba(255,255,255,0.1)",
						color: "rgba(255,255,255,0.35)",
					}}
				>
					Merge Sort
				</span>

				<div className="flex flex-col gap-3">
					{frame.rows.map((row, rowIdx) => {
						if (row.length === 0) return null;
						const rowColor = ROW_COLORS[rowIdx] ?? "#888";
						return (
							<div key={rowIdx} className="flex items-center gap-3">
								<span
									className="text-[10px] font-mono shrink-0 w-5 text-right"
									style={{ color: `${rowColor}70` }}
								>
									{`L${rowIdx}`}
								</span>
								<div className="flex gap-2 flex-1">
									{row.map((node) => (
										<NodeBox key={node.id} node={node} rowIdx={rowIdx} />
									))}
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Description */}
			<div className="rounded-xl border border-(--border) px-4 py-3 bg-(--bg-secondary) min-h-12 flex items-center">
				<p className="text-sm text-(--text-primary) leading-relaxed">
					{frame.description}
				</p>
			</div>

			{/* Controls */}
			<div className="flex items-center justify-center gap-2">
				<ControlBtn
					onClick={() => {
						setCurrentFrame(0);
						setIsPlaying(false);
					}}
					title="Reset"
				>
					<RotateCcw size={14} />
				</ControlBtn>

				<ControlBtn
					onClick={() => goToFrame(currentFrame - 1)}
					disabled={currentFrame === 0}
					title="Previous"
				>
					<ChevronLeft size={16} />
				</ControlBtn>

				<button
					onClick={() => setIsPlaying((p) => !p)}
					className={cn(
						"flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium transition-colors",
						"border-(--border) text-(--text-primary) hover:bg-(--bg-secondary)",
					)}
				>
					{isPlaying ? (
						<>
							<Pause size={13} /> Pause
						</>
					) : (
						<>
							<Play size={13} /> Play
						</>
					)}
				</button>

				<ControlBtn
					onClick={() => goToFrame(currentFrame + 1)}
					disabled={currentFrame >= totalFrames - 1}
					title="Next"
				>
					<ChevronRight size={16} />
				</ControlBtn>
			</div>
		</div>
	);
};

export default MergeSortVisualizer;
