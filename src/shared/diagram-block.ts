export type FlowchartNodeType = 'start' | 'end' | 'decision' | 'process' | 'io'
export type ArchitectureNodeType = 'server' | 'database' | 'cache' | 'load-balancer' | 'cdn' | 'queue' | 'client'
export type DiagramNodeType = FlowchartNodeType | ArchitectureNodeType

export type DiagramNode = {
	id: string
	nodeType: DiagramNodeType
	label: string
	tooltip?: string
	position: { x: number; y: number }
}

export type DiagramEdgeDirection = 'forward' | 'backward' | 'both'

export type DiagramEdge = {
	id: string
	source: string
	target: string
	label?: string
	direction: DiagramEdgeDirection
}

export type DiagramScenario = {
	label: string
	nodes: DiagramNode[]
	edges: DiagramEdge[]
}

export type DiagramBlockData = {
	nodes: DiagramNode[]
	edges: DiagramEdge[]
	scenarios?: DiagramScenario[]
}
