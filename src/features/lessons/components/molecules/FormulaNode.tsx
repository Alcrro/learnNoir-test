import type { FormulaBlock } from "@shared/lesson-content";

type Props = { node: FormulaBlock };

export function FormulaNode({ node }: Props) {
	return (
		<div className="rounded-xl border border-(--border) bg-(--surface) p-5 space-y-2">
			<p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">
				Formula
			</p>
			<pre className="font-mono text-base text-(--text-primary) whitespace-pre-wrap">
				{node.latex}
			</pre>
			{node.description && (
				<p className="text-sm text-(--text-secondary)">{node.description}</p>
			)}
		</div>
	);
}
