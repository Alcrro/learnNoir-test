import { registerDiagram } from '../../diagram/lib/DiagramRegistry'
import { flowchartNodeTypes } from '../../diagram/nodes/flowchart/FlowchartNodes'
import { architectureNodeTypes } from '../../diagram/nodes/architecture/ArchitectureNodes'

registerDiagram('diagram:flowchart', {
	nodeTypes: flowchartNodeTypes,
	defaultNodeType: 'process',
	label: 'Flowchart',
})

registerDiagram('diagram:architecture', {
	nodeTypes: architectureNodeTypes,
	defaultNodeType: 'server',
	label: 'Arhitectură sistem',
})
