import { EditableNode } from "../../edit/EditableNode";
import { NODE_REGISTRY, type AnyNode } from "./node-registry";

export type { AnyNode };

type Props = {
	node: AnyNode;
	onUpdate?: (updated: AnyNode) => void;
};

export function ContentNodeRenderer({ node, onUpdate }: Props) {
	const kind = node.type ?? node.nodeType;
	const registration = kind ? NODE_REGISTRY[kind] : undefined;

	if (!registration) return null;

	const { Renderer, EditPanel } = registration;
	return (
		<EditableNode
			onUpdate={onUpdate}
			panel={(close) =>
				EditPanel ? (
					<EditPanel
						node={node}
						onSave={(u: AnyNode) => { onUpdate?.(u); close(); }}
						onCancel={close}
					/>
				) : null
			}
		>
			<Renderer node={node} />
		</EditableNode>
	);
}
