import type { NodeTypes } from '@xyflow/react'
import type { DiagramNodeType } from '@shared/diagram-block'

type DiagramRegistryEntry = {
	nodeTypes: NodeTypes
	defaultNodeType: DiagramNodeType
	label: string
}

const registry = new Map<string, DiagramRegistryEntry>()

export function registerDiagram(engine: string, entry: DiagramRegistryEntry) {
	registry.set(engine, entry)
}

export function getDiagramEntry(engine: string): DiagramRegistryEntry | null {
	return registry.get(engine) ?? null
}

export function getRegisteredEngines(): string[] {
	return Array.from(registry.keys())
}
