import type { DiagramNodeType } from '@shared/diagram-block'

type PaletteItem = {
	nodeType: DiagramNodeType
	label: string
	icon: string
}

const PALETTE: Record<string, PaletteItem[]> = {
	'diagram:flowchart': [
		{ nodeType: 'start', label: 'Start', icon: '◉' },
		{ nodeType: 'end', label: 'End', icon: '◎' },
		{ nodeType: 'decision', label: 'Decision', icon: '◆' },
		{ nodeType: 'process', label: 'Process', icon: '▬' },
		{ nodeType: 'io', label: 'Input/Output', icon: '▱' },
	],
	'diagram:architecture': [
		{ nodeType: 'client', label: 'Client', icon: '💻' },
		{ nodeType: 'server', label: 'Server', icon: '🖥' },
		{ nodeType: 'load-balancer', label: 'Load Balancer', icon: '⚖' },
		{ nodeType: 'database', label: 'Database', icon: '🗄' },
		{ nodeType: 'cache', label: 'Cache', icon: '⚡' },
		{ nodeType: 'cdn', label: 'CDN', icon: '🌐' },
		{ nodeType: 'queue', label: 'Queue', icon: '📬' },
	],
}

type Props = {
	engine: string
	onAddNode: (nodeType: DiagramNodeType) => void
}

export function NodePalette({ engine, onAddNode }: Props) {
	const items = PALETTE[engine] ?? []

	return (
		<div className="flex flex-col gap-1 p-2">
			<p className="mb-1 px-1 text-xs font-medium text-(--text-muted)">Noduri</p>
			{items.map((item) => (
				<button
					key={item.nodeType}
					onClick={() => onAddNode(item.nodeType)}
					className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-(--text-secondary) transition-colors hover:bg-(--bg-secondary) hover:text-(--text-primary)"
				>
					<span className="w-5 text-center text-base">{item.icon}</span>
					{item.label}
				</button>
			))}
		</div>
	)
}
