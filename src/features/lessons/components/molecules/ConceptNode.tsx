import type { ConceptBlock } from "@shared/lesson-content";

type Props = { node: ConceptBlock };

export function ConceptNode({ node }: Props) {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-(--text-primary)">{node.title}</h3>

			<div className="grid gap-4 sm:grid-cols-2">
				{node.sections.map((section, i) => (
					<div
						key={i}
						className="rounded-xl border border-(--border) bg-(--surface) p-4 space-y-1.5"
					>
						<p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">
							{section.label}
						</p>
						<p className="text-sm text-(--text-secondary) leading-relaxed">
							{section.text}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
