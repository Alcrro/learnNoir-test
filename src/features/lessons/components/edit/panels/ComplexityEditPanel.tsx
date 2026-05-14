import { useState } from "react";
import type { ComplexityBlock } from "@shared/lesson-content";
import { Field } from "../shared/Field";
import { PanelActions } from "../shared/PanelActions";
import type { AnyNode } from "../../tabs/node-registry";

type Props = {
	node: ComplexityBlock;
	onSave: (n: AnyNode) => void;
	onCancel: () => void;
};

export function ComplexityEditPanel({ node, onSave, onCancel }: Props) {
	// Un text per caz (best/average/worst), indexat paralel cu node.cases
	const [descriptions, setDescriptions] = useState(node.cases.map((c) => c.description));
	const [space, setSpace] = useState(node.space);

	const updated: ComplexityBlock = {
		...node,
		space,
		cases: node.cases.map((c, i) => ({ ...c, description: descriptions[i] ?? c.description })),
	};

	return (
		<div className="flex flex-col gap-4">
			{node.cases.map((c, i) => (
				<Field
					key={c.type}
					label={`${c.type} case — ${c.time}`}
					value={descriptions[i] ?? c.description}
					onChange={(v) => setDescriptions((prev) => prev.map((p, j) => (j === i ? v : p)))}
					multiline
				/>
			))}
			<Field label="Space complexity" value={space} onChange={setSpace} />
			<PanelActions onSave={() => onSave(updated)} onCancel={onCancel} />
		</div>
	);
}
