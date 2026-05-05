import type { ComplexityBlock } from "@shared/lesson-content";
import { cn } from "../../../../libs/utils/cn";

const complexityColors = {
	best: {
		badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
		time: "text-emerald-300",
	},
	average: {
		badge: "text-amber-400 bg-amber-400/10 border-amber-400/30",
		time: "text-amber-300",
	},
	worst: {
		badge: "text-red-400 bg-red-400/10 border-red-400/30",
		time: "text-red-300",
	},
} as const;

type Props = { node: ComplexityBlock };

export function ComplexityNode({ node }: Props) {
	return (
		<div className="space-y-3">
			<h3 className="text-base font-semibold text-(--text-primary)">Complexitate</h3>

			<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
				{node.cases.map((c) => {
					const colors = complexityColors[c.type];
					return (
						<div
							key={c.type}
							className="rounded-xl border border-(--border) bg-(--surface) p-4"
						>
							<span
								className={cn(
									"inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest",
									colors.badge,
								)}
							>
								{c.type}
							</span>
							<p className={cn("mt-2 font-mono text-2xl font-bold", colors.time)}>
								{c.time}
							</p>
							<p className="mt-1.5 text-xs text-(--text-muted) leading-relaxed">
								{c.description}
							</p>
						</div>
					);
				})}
			</div>

			<div className="flex items-center gap-2 rounded-lg border border-(--border) bg-(--surface) px-4 py-3">
				<span className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">
					Spatiu
				</span>
				<span className="font-mono text-sm font-semibold text-(--text-primary)">
					{node.space}
				</span>
			</div>
		</div>
	);
}
