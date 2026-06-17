import { useState } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'

export type FlowchartNodeData = {
	label: string
	tooltip?: string
	active?: boolean
}

const handles = (
	<>
		<Handle type="target" position={Position.Top} />
		<Handle type="source" position={Position.Bottom} />
		<Handle type="target" position={Position.Left} />
		<Handle type="source" position={Position.Right} />
	</>
)

function Tooltip({ text }: { text: string }) {
	return (
		<div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-(--border) bg-(--bg-primary) px-2 py-1 text-xs text-(--text-primary) shadow-md">
			{text}
		</div>
	)
}

function StartNode({ data }: NodeProps) {
	const [hovered, setHovered] = useState(false)
	const d = data as FlowchartNodeData
	return (
		<div
			className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-(--accent) bg-(--bg-secondary) text-xs font-medium text-(--text-primary)"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{d.label}
			{hovered && d.tooltip && <Tooltip text={d.tooltip} />}
			{handles}
		</div>
	)
}

function EndNode({ data }: NodeProps) {
	const [hovered, setHovered] = useState(false)
	const d = data as FlowchartNodeData
	return (
		<div
			className="relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-(--accent) bg-(--bg-secondary) text-xs font-medium text-(--text-primary)"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{d.label}
			{hovered && d.tooltip && <Tooltip text={d.tooltip} />}
			{handles}
		</div>
	)
}

function DecisionNode({ data }: NodeProps) {
	const [hovered, setHovered] = useState(false)
	const d = data as FlowchartNodeData
	return (
		<div
			className="relative flex h-14 w-14 rotate-45 items-center justify-center border-2 border-(--border) bg-(--bg-secondary)"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<span className="-rotate-45 text-xs font-medium text-(--text-primary)">{d.label}</span>
			{hovered && d.tooltip && (
				<div className="-rotate-45">
					<Tooltip text={d.tooltip} />
				</div>
			)}
			{handles}
		</div>
	)
}

function ProcessNode({ data }: NodeProps) {
	const [hovered, setHovered] = useState(false)
	const d = data as FlowchartNodeData
	return (
		<div
			className="relative flex min-w-[100px] items-center justify-center rounded-md border-2 border-(--border) bg-(--bg-secondary) px-4 py-2 text-sm font-medium text-(--text-primary)"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{d.label}
			{hovered && d.tooltip && <Tooltip text={d.tooltip} />}
			{handles}
		</div>
	)
}

function IONode({ data }: NodeProps) {
	const [hovered, setHovered] = useState(false)
	const d = data as FlowchartNodeData
	return (
		<div
			className="relative flex min-w-[100px] items-center justify-center border-2 border-(--border) bg-(--bg-secondary) px-6 py-2 text-sm font-medium text-(--text-primary) [clip-path:polygon(8%_0%,100%_0%,92%_100%,0%_100%)]"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{d.label}
			{hovered && d.tooltip && <Tooltip text={d.tooltip} />}
			{handles}
		</div>
	)
}

export const flowchartNodeTypes = {
	start: StartNode,
	end: EndNode,
	decision: DecisionNode,
	process: ProcessNode,
	io: IONode,
}
