import { useState } from "react";
import type { FormulaBlock } from "@shared/lesson-content";
import { Field } from "../shared/Field";
import { PanelActions } from "../shared/PanelActions";
import type { AnyNode } from "../../tabs/node-registry";

type Props = {
	node: FormulaBlock;
	onSave: (n: AnyNode) => void;
	onCancel: () => void;
};

export function FormulaEditPanel({ node, onSave, onCancel }: Props) {
	const [latex, setLatex] = useState(node.latex);
	// description e opțional — string gol = absent în date
	const [description, setDescription] = useState(node.description ?? "");

	return (
		<div className="flex flex-col gap-4">
			<Field label="LaTeX" value={latex} onChange={setLatex} />
			<Field label="Description" value={description} onChange={setDescription} multiline />
			<PanelActions
				onSave={() => onSave({ ...node, latex, description: description || undefined })}
				onCancel={onCancel}
			/>
		</div>
	);
}
