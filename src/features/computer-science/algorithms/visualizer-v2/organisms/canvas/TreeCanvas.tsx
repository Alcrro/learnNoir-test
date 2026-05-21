type TreeNode = { id: string; x: number; y: number; label: string };

const nodes: TreeNode[] = [
	{ id: "root", x: 210, y: 50, label: "50" },
	{ id: "L1L", x: 110, y: 130, label: "30" },
	{ id: "L1R", x: 310, y: 130, label: "70" },
	{ id: "L2LL", x: 60, y: 210, label: "20" },
	{ id: "L2LR", x: 160, y: 210, label: "40" },
	{ id: "L2RL", x: 260, y: 210, label: "60" },
	{ id: "L2RR", x: 360, y: 210, label: "80" },
];

const edges: [string, string][] = [
	["root", "L1L"],
	["root", "L1R"],
	["L1L", "L2LL"],
	["L1L", "L2LR"],
	["L1R", "L2RL"],
	["L1R", "L2RR"],
];

const TreeCanvas = (_props: object) => {
	return (
		<div className="relative w-full min-h-64 flex flex-col items-center justify-center gap-6 py-8 px-4">
			<svg
				viewBox="0 20 420 230"
				className="w-full max-w-sm opacity-50"
				aria-hidden
			>
				{edges.map(([from, to]) => {
					const a = nodes.find((n) => n.id === from)!;
					const b = nodes.find((n) => n.id === to)!;
					return (
						<line
							key={`${from}-${to}`}
							x1={a.x}
							y1={a.y}
							x2={b.x}
							y2={b.y}
							stroke="var(--border)"
							strokeWidth={2}
						/>
					);
				})}
				{nodes.map((n) => (
					<g key={n.id}>
						<circle
							cx={n.x}
							cy={n.y}
							r={22}
							fill="var(--lp-bg-page)"
							stroke="var(--border)"
							strokeWidth={2}
						/>
						<text
							x={n.x}
							y={n.y + 5}
							textAnchor="middle"
							fontSize={12}
							fill="var(--text-secondary)"
							fontWeight={600}
						>
							{n.label}
						</text>
					</g>
				))}
			</svg>
			<p className="text-sm text-(--text-secondary)">
				Tree visualizer — coming soon
			</p>
		</div>
	);
};

export default TreeCanvas;
