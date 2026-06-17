import { useState } from 'react'
import { LayoutGrid } from 'lucide-react'
import './registerDiagrams'
import type { DiagramBlockData } from '@shared/diagram-block'
import { useLessonTabContext } from '../../../context/LessonTabContext'
import { useLessonContext } from '../../../context/LessonContext'
import { useLessonBlocksQuery } from '../../../hooks/useLessonBlocksQuery'
import { DiagramBlockViewer } from '../../diagram/organisms/DiagramBlockViewer'
import { DiagramBlockEditor } from '../../diagram/organisms/DiagramBlockEditor'
import { getRegisteredEngines } from '../../diagram/lib/DiagramRegistry'
import { lessonBlocksApi } from '../../../api/lessonBlocksApi'

function DiagramEmptyState() {
	return (
		<div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
			<LayoutGrid className="h-8 w-8 opacity-20 text-(--text-muted)" />
			<p className="text-sm text-(--text-muted)">Nicio diagramă disponibilă pentru această lecție.</p>
		</div>
	)
}

function AddDiagramBlockButton({ lessonId, onSuccess }: { lessonId: string; onSuccess: () => void }) {
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const engines = getRegisteredEngines()

	const LABELS: Record<string, string> = {
		'diagram:flowchart': 'Flowchart',
		'diagram:architecture': 'Arhitectură sistem',
	}

	async function handleAdd(engine: string): Promise<void> {
		setLoading(true)
		try {
			await lessonBlocksApi.createDiagramBlock(lessonId, engine)
			onSuccess()
		} finally {
			setLoading(false)
			setOpen(false)
		}
	}

	return (
		<div className="relative">
			<button
				onClick={() => setOpen((v) => !v)}
				disabled={loading}
				className="rounded-md border border-dashed border-(--border) px-4 py-2 text-sm text-(--text-secondary) transition-colors hover:border-(--accent) hover:text-(--accent) disabled:opacity-50"
			>
				+ Adaugă diagramă
			</button>
			{open && (
				<div className="absolute left-0 top-full z-10 mt-1 min-w-[180px] overflow-hidden rounded-lg border border-(--border) bg-(--bg-primary) shadow-lg">
					{engines.map((engine) => (
						<button
							key={engine}
							onClick={() => handleAdd(engine)}
							className="block w-full px-4 py-2 text-left text-sm text-(--text-secondary) transition-colors hover:bg-(--bg-secondary) hover:text-(--text-primary)"
						>
							{LABELS[engine] ?? engine}
						</button>
					))}
				</div>
			)}
		</div>
	)
}

export function DiagramTab() {
	const { lessonId } = useLessonTabContext()
	const { canEdit } = useLessonContext()
	const { data: blocks = [], refetch } = useLessonBlocksQuery(lessonId)
	const [editingId, setEditingId] = useState<string | null>(null)

	const diagramBlocks = blocks.filter(
		(b): b is Extract<typeof b, { type: 'interactive' }> =>
			b.type === 'interactive' && b.engine.startsWith('diagram:'),
	)

	if (diagramBlocks.length === 0 && !canEdit) {
		return <DiagramEmptyState />
	}

	return (
		<div className="flex flex-col gap-8 p-4">
			{diagramBlocks.map((block) =>
				editingId === block.id ? (
					<DiagramBlockEditor
						key={block.id}
						engine={block.engine}
						blockId={block.id}
						initialData={block.data as DiagramBlockData}
						onSave={() => { setEditingId(null); refetch() }}
						onCancel={() => setEditingId(null)}
					/>
				) : (
					<div key={block.id} className="relative">
						<DiagramBlockViewer
							engine={block.engine}
							data={block.data as DiagramBlockData}
						/>
						{canEdit && (
							<button
								onClick={() => setEditingId(block.id)}
								className="absolute right-2 top-2 rounded-md border border-(--border) bg-(--bg-primary) px-2 py-1 text-xs text-(--text-secondary) transition-colors hover:text-(--text-primary)"
							>
								Editează
							</button>
						)}
					</div>
				),
			)}
			{canEdit && (
				<AddDiagramBlockButton lessonId={lessonId} onSuccess={() => refetch()} />
			)}
		</div>
	)
}
