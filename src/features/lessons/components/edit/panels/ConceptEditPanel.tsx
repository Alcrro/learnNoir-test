import { useState } from "react";
import type { ConceptBlock } from "@shared/lesson-content";
import { Field } from "../shared/Field";
import { PanelActions } from "../shared/PanelActions";
import type { AnyNode } from "../../tabs/node-registry";

type Props = {
	node: ConceptBlock;
	onSave: (n: AnyNode) => void;
	onCancel: () => void;
};

export function ConceptEditPanel({ node, onSave, onCancel }: Props) {
	const [title, setTitle] = useState(node.title);
	// Un text per secțiune, indexat paralel cu node.sections
	const [sections, setSections] = useState(node.sections.map((s) => s.text));

	const updated: ConceptBlock = {
		...node,
		title,
		sections: node.sections.map((s, i) => ({ ...s, text: sections[i] ?? s.text })),
	};

	return (
		<div className="flex flex-col gap-4">
			<Field label="Title" value={title} onChange={setTitle} />
			{node.sections.map((s, i) => (
				<Field
					key={i}
					label={s.label}
					value={sections[i] ?? s.text}
					onChange={(v) => setSections((prev) => prev.map((p, j) => (j === i ? v : p)))}
					multiline
				/>
			))}
			<PanelActions onSave={() => onSave(updated)} onCancel={onCancel} />
		</div>
	);
}
