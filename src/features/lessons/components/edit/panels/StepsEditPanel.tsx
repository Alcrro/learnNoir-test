import { useState } from "react";
import type { StepsBlock } from "@shared/lesson-content";
import { Field } from "../shared/Field";
import { PanelActions } from "../shared/PanelActions";
import type { AnyNode } from "../../tabs/node-registry";

type Props = {
	node: StepsBlock;
	onSave: (n: AnyNode) => void;
	onCancel: () => void;
};

// Extrage textul plain dintr-un step — un step poate avea mai multe paragrafe,
// dar în editare le tratăm ca un singur bloc de text concatenat.
function extractStepText(step: StepsBlock["steps"][number]): string {
	return step.content
		.filter((c): c is { type: "paragraph"; text: string } => c.type === "paragraph")
		.map((c) => c.text)
		.join(" ");
}

export function StepsEditPanel({ node, onSave, onCancel }: Props) {
	const [titles, setTitles] = useState(node.steps.map((s) => s.title));
	const [texts, setTexts] = useState(node.steps.map(extractStepText));

	const updated: StepsBlock = {
		...node,
		steps: node.steps.map((s, i) => ({
			...s,
			title: titles[i] ?? s.title,
			// Rescrierea conținutului ca un singur paragraf — editarea inline nu suportă structuri complexe
			content: [{ type: "paragraph" as const, text: texts[i] ?? extractStepText(s) }],
		})),
	};

	return (
		<div className="flex flex-col gap-5">
			{node.steps.map((s, i) => (
				<div
					key={i}
					className="flex flex-col gap-3 border-b border-(--border) pb-4 last:border-0 last:pb-0"
				>
					<span className="text-xs font-semibold text-(--text-muted)">Step {i + 1}</span>
					<Field
						label="Title"
						value={titles[i] ?? s.title}
						onChange={(v) => setTitles((prev) => prev.map((p, j) => (j === i ? v : p)))}
					/>
					<Field
						label="Description"
						value={texts[i] ?? extractStepText(s)}
						onChange={(v) => setTexts((prev) => prev.map((p, j) => (j === i ? v : p)))}
						multiline
					/>
				</div>
			))}
			<PanelActions onSave={() => onSave(updated)} onCancel={onCancel} />
		</div>
	);
}
