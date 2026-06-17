import { useState } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'

export type ArchitectureNodeData = {
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

function ArchNode({
	data,
	icon,
	borderClass,
}: {
	data: ArchitectureNodeData
	icon: string
	borderClass: string
}) {
	const [hovered, setHovered] = useState(false)
	return (
		<div
			className={`relative flex min-w-[90px] flex-col items-center gap-1 rounded-lg border-2 bg-(--bg-secondary) px-3 py-2 text-(--text-primary) ${borderClass}`}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<span className="text-xl">{icon}</span>
			<span className="text-xs font-medium">{data.label}</span>
			{hovered && data.tooltip && <Tooltip text={data.tooltip} />}
			{handles}
		</div>
	)
}

function ServerNode({ data }: NodeProps) {
	return <ArchNode data={data as ArchitectureNodeData} icon="🖥" borderClass="border-(--border)" />
}
function DatabaseNode({ data }: NodeProps) {
	return <ArchNode data={data as ArchitectureNodeData} icon="🗄" borderClass="border-blue-400/60" />
}
function CacheNode({ data }: NodeProps) {
	return <ArchNode data={data as ArchitectureNodeData} icon="⚡" borderClass="border-yellow-400/60" />
}
function LoadBalancerNode({ data }: NodeProps) {
	return <ArchNode data={data as ArchitectureNodeData} icon="⚖" borderClass="border-purple-400/60" />
}
function CdnNode({ data }: NodeProps) {
	return <ArchNode data={data as ArchitectureNodeData} icon="🌐" borderClass="border-green-400/60" />
}
function QueueNode({ data }: NodeProps) {
	return <ArchNode data={data as ArchitectureNodeData} icon="📬" borderClass="border-orange-400/60" />
}
function ClientNode({ data }: NodeProps) {
	return <ArchNode data={data as ArchitectureNodeData} icon="💻" borderClass="border-(--accent)" />
}

export const architectureNodeTypes = {
	server: ServerNode,
	database: DatabaseNode,
	cache: CacheNode,
	'load-balancer': LoadBalancerNode,
	cdn: CdnNode,
	queue: QueueNode,
	client: ClientNode,
}
