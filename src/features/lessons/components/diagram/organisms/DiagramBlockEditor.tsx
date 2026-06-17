import { ReactFlow, ReactFlowProvider, Background, Controls } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { DiagramBlockData } from '@shared/diagram-block'
import { getDiagramEntry } from '../lib/DiagramRegistry'
import { useDiagramTheme } from '../lib/diagramTheme'
import { NodePalette } from '../atoms/NodePalette'
import { ScenarioNavigator } from '../atoms/ScenarioNavigator'
import { useDiagramEditor } from '../../../hooks/useDiagramEditor'

type Props = {
	engine: string
	blockId: string
	initialData: DiagramBlockData
	onSave: () => void
	onCancel: () => void
}

function DiagramBlockEditorInner({ engine, blockId, initialData, onSave, onCancel }: Props) {
	const theme = useDiagramTheme()
	const entry = getDiagramEntry(engine)
	const editor = useDiagramEditor(blockId, initialData)

	const selectedNode = editor.nodes.find((n) => n.id === editor.selectedNodeId)

	if (!entry) {
		return (
			<div className="flex h-40 items-center justify-center rounded-xl border border-(--border) text-sm text-(--text-muted)">
				Tip de diagramă nesuportat: <code className="ml-1">{engine}</code>
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-3 rounded-xl border border-(--border) p-4">
			{/* Toolbar */}
			<div className="flex items-center gap-2">
				<button
					onClick={editor.addScenario}
					className="rounded-md border border-(--border) px-3 py-1.5 text-xs text-(--text-secondary) transition-colors hover:text-(--text-primary)"
				>
					+ Scenariu
				</button>
				{editor.scenarios.length > 0 && (
					<button
						onClick={() => editor.removeScenario(editor.activeScenario)}
						className="rounded-md border border-(--border) px-3 py-1.5 text-xs text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/20"
					>
						Șterge scenariu
					</button>
				)}
				{editor.scenarios.length > 1 && (
					<ScenarioNavigator
						scenarios={editor.scenarios}
						activeIndex={editor.activeScenario}
						onChange={editor.switchScenario}
					/>
				)}
			</div>

			{/* Canvas + panels */}
			<div className="flex gap-3">
				{/* Left: node palette */}
				<div className="w-44 shrink-0 rounded-lg border border-(--border) bg-(--bg-secondary)">
					<NodePalette engine={engine} onAddNode={editor.addNode} />
				</div>

				{/* Center: canvas */}
				<div className="h-[420px] flex-1 overflow-hidden rounded-lg border border-(--border)">
					<ReactFlow
						nodes={editor.nodes}
						edges={editor.edges}
						nodeTypes={entry.nodeTypes}
						onNodesChange={editor.onNodesChange}
						onEdgesChange={editor.onEdgesChange}
						onNodeClick={(_, node) => editor.setSelectedNodeId(node.id)}
						onPaneClick={() => editor.setSelectedNodeId(null)}
						fitView
						style={{ background: theme.background }}
					>
						<Background color={theme.nodeBorder} />
						<Controls />
					</ReactFlow>
				</div>

				{/* Right: node inspector */}
				{selectedNode && (
					<div className="w-56 shrink-0 rounded-lg border border-(--border) bg-(--bg-secondary) p-3">
						<p className="mb-3 text-xs font-medium text-(--text-muted)">Nod selectat</p>
						<label className="mb-1 block text-xs text-(--text-secondary)">Label</label>
						<input
							type="text"
							value={String(selectedNode.data.label ?? '')}
							onChange={(e) => editor.updateNodeLabel(selectedNode.id, e.target.value)}
							className="mb-3 w-full rounded-md border border-(--border) bg-(--bg-primary) px-2 py-1.5 text-sm text-(--text-primary) focus:outline-none focus:ring-1 focus:ring-(--accent)"
						/>
						<label className="mb-1 block text-xs text-(--text-secondary)">Tooltip</label>
						<input
							type="text"
							value={String(selectedNode.data.tooltip ?? '')}
							onChange={(e) => editor.updateNodeTooltip(selectedNode.id, e.target.value)}
							className="w-full rounded-md border border-(--border) bg-(--bg-primary) px-2 py-1.5 text-sm text-(--text-primary) focus:outline-none focus:ring-1 focus:ring-(--accent)"
						/>
					</div>
				)}
			</div>

			{/* Footer */}
			<div className="flex justify-end gap-2">
				<button
					onClick={onCancel}
					className="rounded-md px-4 py-2 text-sm text-(--text-secondary) transition-colors hover:text-(--text-primary)"
				>
					Anulează
				</button>
				<button
					onClick={async () => { await editor.save(); onSave() }}
					disabled={editor.isSaving}
					className="rounded-md bg-(--accent) px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50"
				>
					{editor.isSaving ? 'Se salvează...' : 'Salvează'}
				</button>
			</div>
		</div>
	)
}

export function DiagramBlockEditor(props: Props) {
	return (
		<ReactFlowProvider>
			<DiagramBlockEditorInner {...props} />
		</ReactFlowProvider>
	)
}
