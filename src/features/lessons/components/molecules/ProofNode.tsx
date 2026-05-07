import type { ProofBlock } from "@shared/lesson-content";

type Props = { node: ProofBlock };

export function ProofNode({ node }: Props) {
	return (
		<div className="rounded-xl border border-(--border) bg-(--surface) p-5 space-y-3">
			<p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">
				Demonstratie
			</p>
			<ol className="space-y-2 list-none">
				{node.steps.map((step, i) => (
					<li key={i} className="flex gap-3 text-sm text-(--text-secondary)">
						<span className="shrink-0 text-(--text-muted)">{i + 1}.</span>
						<span>
							{step.text}
							{step.latex && (
								<code className="ml-2 font-mono text-xs text-(--text-primary) bg-(--border) rounded px-1.5 py-0.5">
									{step.latex}
								</code>
							)}
						</span>
					</li>
				))}
			</ol>
		</div>
	);
}
