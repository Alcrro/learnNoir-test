import type { ExampleBlock } from "@shared/lesson-content";
import { ArrayState } from "../atoms/ArrayState";

type Props = { example: ExampleBlock };

export function ExampleNode({ example }: Props) {
	return (
		<div className="mt-4 rounded-xl border border-(--border) bg-(--bg) p-4 space-y-2">
			<p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted) mb-3">
				Exemplu pas cu pas
			</p>

			<div className="flex flex-wrap gap-3 text-xs text-(--text-muted) mb-2">
				<span className="flex items-center gap-1.5">
					<span className="h-3 w-3 rounded border border-amber-400/50 bg-amber-400/15 inline-block" />
					comparare
				</span>
				<span className="flex items-center gap-1.5">
					<span className="h-3 w-3 rounded border border-violet-500/50 bg-violet-500/15 inline-block" />
					swap
				</span>
				<span className="flex items-center gap-1.5">
					<span className="h-3 w-3 rounded border border-emerald-500/50 bg-emerald-500/15 inline-block" />
					sortat
				</span>
			</div>

			<div className="space-y-2">
				{example.states.map((state, i) => (
					<ArrayState key={i} state={state} />
				))}
			</div>
		</div>
	);
}
