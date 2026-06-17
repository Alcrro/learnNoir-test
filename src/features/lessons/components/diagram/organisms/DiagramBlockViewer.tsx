import { useState } from 'react'
import { ReactFlow, ReactFlowProvider, Background, Controls, type Node, type Edge, MarkerType } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { DiagramBlockData, DiagramNode, DiagramEdge } from '@shared/diagram-block'
import { getDiagramEntry } from '../lib/DiagramRegistry'
import { useDiagramTheme } from '../lib/diagramTheme'
import { ScenarioNavigator } from '../atoms/ScenarioNavigator'

function toRFNodes(nodes: DiagramNode[]): Node[] {
	return nodes.map((n) => ({
		id: n.id,
		type: n.nodeType,
		position: n.position,
		data: { label: n.label, tooltip: n.tooltip },
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

function DiagramUnknownFallback({ engine }: { engine: string }) {
	return (
		<div className="flex h-40 items-center justify-center rounded-xl border border-(--border) text-sm text-(--text-muted)">
			Tip de diagramă nesuportat: <code className="ml-1">{engine}</code>
		</div>
	)
}

type Props = {
	engine: string
	data: DiagramBlockData
}

function DiagramBlockViewerInner({ engine, data }: Props) {
	const [activeScenario, setActiveScenario] = useState(0)
	const theme = useDiagramTheme()
	const entry = getDiagramEntry(engine)

	if (!entry) return <DiagramUnknownFallback engine={engine} />

	const hasScenarios = (data.scenarios?.length ?? 0) > 1
	const source = hasScenarios && data.scenarios ? data.scenarios[activeScenario] : data
	const nodes = toRFNodes(source?.nodes ?? data.nodes)
	const edges = toRFEdges(source?.edges ?? data.edges)

	return (
		<div className="flex flex-col">
			<div className="h-[400px] w-full overflow-hidden rounded-xl border border-(--border)">
				<ReactFlow
					nodes={nodes}
					edges={edges}
					nodeTypes={entry.nodeTypes}
					nodesDraggable={false}
					nodesConnectable={false}
					elementsSelectable={false}
					fitView
					style={{ background: theme.background }}
				>
					<Background color={theme.nodeBorder} />
					<Controls showInteractive={false} />
				</ReactFlow>
			</div>
			{hasScenarios && data.scenarios && (
				<ScenarioNavigator
					scenarios={data.scenarios}
					activeIndex={activeScenario}
					onChange={setActiveScenario}
				/>
			)}
		</div>
	)
}

export function DiagramBlockViewer({ engine, data }: Props) {
	return (
		<ReactFlowProvider>
			<DiagramBlockViewerInner engine={engine} data={data} />
		</ReactFlowProvider>
	)
}
