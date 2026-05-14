import { useState } from "react";
import type { TheoremBlock } from "@shared/lesson-content";
import { Field } from "../shared/Field";
import { PanelActions } from "../shared/PanelActions";
import type { AnyNode } from "../../tabs/node-registry";

type Props = {
	node: TheoremBlock;
	onSave: (n: AnyNode) => void;
	onCancel: () => void;
};

export function TheoremEditPanel({ node, onSave, onCancel }: Props) {
	const [title, setTitle] = useState(node.title);
	const [statement, setStatement] = useState(node.statement);

	return (
		<div className="flex flex-col gap-4">
			<Field label="Title" value={title} onChange={setTitle} />
			<Field label="Statement" value={statement} onChange={setStatement} multiline />
			<PanelActions
				onSave={() => onSave({ ...node, title, statement })}
				onCancel={onCancel}
			/>
		</div>
	);
}
