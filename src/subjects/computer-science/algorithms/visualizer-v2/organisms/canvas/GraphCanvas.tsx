import { useRef, useEffect } from "react";
import { gsap } from "gsap";

type NodeDef = { id: string; x: number; y: number; label: string };
type EdgeDef = [string, string];

const NODES: NodeDef[] = [
	{ id: "A", x: 200, y: 60, label: "A" },
	{ id: "B", x: 80, y: 170, label: "B" },
	{ id: "C", x: 320, y: 170, label: "C" },
	{ id: "D", x: 40, y: 290, label: "D" },
	{ id: "E", x: 160, y: 290, label: "E" },
	{ id: "F", x: 280, y: 290, label: "F" },
	{ id: "G", x: 370, y: 290, label: "G" },
];

const EDGES: EdgeDef[] = [
	["A", "B"],
	["A", "C"],
	["B", "D"],
	["B", "E"],
	["C", "F"],
	["C", "G"],
];

const R = 24;

const GraphCanvas = (_props: object) => {
	const nodeRefs = useRef<Record<string, SVGGElement | null>>({});

	useEffect(() => {
		const nodes = Object.values(nodeRefs.current).filter(Boolean);
		gsap.fromTo(
			nodes,
			{ scale: 0, transformOrigin: "50% 50%" },
			{
				scale: 1,
				duration: 0.4,
				stagger: 0.07,
				ease: "back.out(1.7)",
			},
		);
	}, []);

	return (
		<div className="relative w-full min-h-64 flex flex-col items-center justify-center gap-4 py-8 px-4">
			<svg
				viewBox="0 0 420 360"
				className="w-full max-w-sm"
				aria-label="Graph visualization"
			>
				{EDGES.map(([from, to]) => {
					const a = NODES.find((n) => n.id === from)!;
					const b = NODES.find((n) => n.id === to)!;
					return (
						<line
							key={`${from}-${to}`}
							x1={a.x}
							y1={a.y}
							x2={b.x}
							y2={b.y}
							stroke="var(--border)"
							strokeWidth={2}
							strokeLinecap="round"
						/>
					);
				})}

				{NODES.map((n) => (
					<g
						key={n.id}
						ref={(el) => {
							nodeRefs.current[n.id] = el;
						}}
						data-role="node"
						data-node-id={n.id}
					>
						<circle
							cx={n.x}
							cy={n.y}
							r={R}
							fill="var(--lp-bg-page)"
							stroke="var(--border)"
							strokeWidth={2}
							className="transition-colors duration-200"
						/>
						<text
							x={n.x}
							y={n.y + 5}
							textAnchor="middle"
							fontSize={13}
							fill="var(--text-secondary)"
							fontWeight={600}
							style={{ userSelect: "none" }}
						>
							{n.label}
						</text>
					</g>
				))}
			</svg>
			<p className="text-xs text-(--text-secondary) opacity-60">
				Graph traversal — coming soon
			</p>
		</div>
	);
};

export default GraphCanvas;
