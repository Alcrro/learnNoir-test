import { useState } from "react";
import { Field } from "../shared/Field";
import { PanelActions } from "../shared/PanelActions";
import type { AnyNode } from "../../tabs/node-registry";

type Props = {
	node: AnyNode;
	onSave: (n: AnyNode) => void;
	onCancel: () => void;
};

export function ParagraphEditPanel({ node, onSave, onCancel }: Props) {
	const [text, setText] = useState(typeof node.text === "string" ? node.text : "");

	return (
		<div className="flex flex-col gap-4">
			<Field label="Text" value={text} onChange={setText} multiline />
			<PanelActions onSave={() => onSave({ ...node, text })} onCancel={onCancel} />
		</div>
	);
}
