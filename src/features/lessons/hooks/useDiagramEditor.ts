import { useCallback, useState } from 'react'
import { useNodesState, useEdgesState, type Node, type Edge, type OnNodesChange, type OnEdgesChange, MarkerType } from '@xyflow/react'
import type { DiagramBlockData, DiagramNode, DiagramEdge, DiagramScenario, DiagramNodeType } from '@shared/diagram-block'
import { lessonBlocksApi } from '../api/lessonBlocksApi'

function toRFNodes(nodes: DiagramNode[]): Node[] {
	return nodes.map((n) => ({
		id: n.id,
		type: n.nodeType,
		position: n.position,
		data: { label: n.label, tooltip: n.tooltip ?? '' },
	}))
}

function toRFEdges(edges: DiagramEdge[]): Edge[] {
	return edges.map((e) => ({
		id: e.id,
		source: e.source,
		target: e.target,
		label: e.label,
		markerEnd: e.direction !== 'backward' ? { type: MarkerType.ArrowClosed } : undefined,
		markerStart: e.direction !== 'forward' ? { type: MarkerType.ArrowClosed } : undefined,
	}))
}

function fromRFNodes(nodes: Node[]): DiagramNode[] {
	return nodes.map((n) => ({
		id: n.id,
		nodeType: (n.type ?? 'process') as DiagramNodeType,
		label: String(n.data.label ?? ''),
		tooltip: n.data.tooltip ? String(n.data.tooltip) : undefined,
		position: n.position,
	}))
}

function fromRFEdges(edges: Edge[]): DiagramEdge[] {
	return edges.map((e) => {
		const hasStart = Boolean(e.markerStart)
		const hasEnd = Boolean(e.markerEnd)
		const direction: DiagramEdge['direction'] =
			hasStart && hasEnd ? 'both' : hasStart ? 'backward' : 'forward'
		return {
			id: e.id,
			source: e.source,
			target: e.target,
			label: e.label ? String(e.label) : undefined,
			direction,
		}
	})
}

export function useDiagramEditor(blockId: string, initialData: DiagramBlockData) {
	const [nodes, setNodes, onNodesChange] = useNodesState(toRFNodes(initialData.nodes))
	const [edges, setEdges, onEdgesChange] = useEdgesState(toRFEdges(initialData.edges))
	const [scenarios, setScenarios] = useState<DiagramScenario[]>(initialData.scenarios ?? [])
	const [activeScenario, setActiveScenarioIndex] = useState(0)
	const [isSaving, setIsSaving] = useState(false)
	const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)

	const addNode = useCallback(
		(nodeType: DiagramNodeType) => {
			const id = crypto.randomUUID()
			const newNode: Node = {
				id,
				type: nodeType,
				position: { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 },
				data: { label: nodeType, tooltip: '' },
			}
			setNodes((prev) => [...prev, newNode])
		},
		[setNodes],
	)

	const removeNode = useCallback(
		(id: string) => {
			setNodes((prev) => prev.filter((n) => n.id !== id))
			setEdges((prev) => prev.filter((e) => e.source !== id && e.target !== id))
			setSelectedNodeId(null)
		},
		[setNodes, setEdges],
	)

	const updateNodeLabel = useCallback(
		(id: string, label: string) => {
			setNodes((prev) =>
				prev.map((n) => (n.id === id ? { ...n, data: { ...n.data, label } } : n)),
			)
		},
		[setNodes],
	)

	const updateNodeTooltip = useCallback(
		(id: string, tooltip: string) => {
			setNodes((prev) =>
				prev.map((n) => (n.id === id ? { ...n, data: { ...n.data, tooltip } } : n)),
			)
		},
		[setNodes],
	)

	const addScenario = useCallback(() => {
		const snapshot: DiagramScenario = {
			label: `Scenariu ${scenarios.length + 1}`,
			nodes: fromRFNodes(nodes),
			edges: fromRFEdges(edges),
		}
		setScenarios((prev) => [...prev, snapshot])
		setActiveScenarioIndex(scenarios.length)
	}, [nodes, edges, scenarios])

	const removeScenario = useCallback(
		(index: number) => {
			setScenarios((prev) => prev.filter((_, i) => i !== index))
			setActiveScenarioIndex((prev) => Math.max(0, prev >= index ? prev - 1 : prev))
		},
		[],
	)

	const renameScenario = useCallback((index: number, label: string) => {
		setScenarios((prev) =>
			prev.map((s, i) => (i === index ? { ...s, label } : s)),
		)
	}, [])

	const switchScenario = useCallback(
		(index: number) => {
			const updated = scenarios.map((s, i) =>
				i === activeScenario
					? { ...s, nodes: fromRFNodes(nodes), edges: fromRFEdges(edges) }
					: s,
			)
			setScenarios(updated)
			const target = updated[index]
			if (target) {
				setNodes(toRFNodes(target.nodes))
				setEdges(toRFEdges(target.edges))
			}
			setActiveScenarioIndex(index)
		},
		[nodes, edges, scenarios, activeScenario, setNodes, setEdges],
	)

	const save = useCallback(async () => {
		const data: DiagramBlockData = {
			nodes: fromRFNodes(nodes),
			edges: fromRFEdges(edges),
			scenarios: scenarios.length > 0 ? scenarios : undefined,
		}
		setIsSaving(true)
		try {
			await lessonBlocksApi.updateBlockData(blockId, data as Record<string, unknown>)
		} finally {
			setIsSaving(false)
		}
	}, [blockId, nodes, edges, scenarios])

	return {
		nodes,
		edges,
		scenarios,
		activeScenario,
		selectedNodeId,
		isSaving,
		onNodesChange: onNodesChange as OnNodesChange,
		onEdgesChange: onEdgesChange as OnEdgesChange,
		setSelectedNodeId,
		addNode,
		removeNode,
		updateNodeLabel,
		updateNodeTooltip,
		addScenario,
		removeScenario,
		renameScenario,
		switchScenario,
		save,
	}
}
