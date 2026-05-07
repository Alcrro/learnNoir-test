import type { TheoremBlock } from "@shared/lesson-content";

type Props = { node: TheoremBlock };

export function TheoremNode({ node }: Props) {
	return (
		<div className="rounded-xl border-l-4 border-l-blue-500 border border-(--border) bg-(--surface) p-5 space-y-2">
			<p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
				Teorema
			</p>
			<p className="font-semibold text-(--text-primary)">{node.title}</p>
			<p className="text-sm text-(--text-secondary) leading-relaxed">{node.statement}</p>
		</div>
	);
}
