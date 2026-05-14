import { useState } from "react";
import { Field } from "../shared/Field";
import { PanelActions } from "../shared/PanelActions";
import type { AnyNode } from "../../tabs/node-registry";

type Props = {
	node: AnyNode;
	onSave: (n: AnyNode) => void;
	onCancel: () => void;
};

export function CodeEditPanel({ node, onSave, onCancel }: Props) {
	const [code, setCode] = useState(typeof node.code === "string" ? node.code : "");

	return (
		<div className="flex flex-col gap-4">
			<Field label="Code" value={code} onChange={setCode} multiline />
			<PanelActions onSave={() => onSave({ ...node, code })} onCancel={onCancel} />
		</div>
	);
}
