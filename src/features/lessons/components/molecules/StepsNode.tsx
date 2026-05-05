import type { StepsBlock } from "@shared/lesson-content";
import { InlineContent } from "../atoms/InlineContent";
import { ExampleNode } from "./ExampleNode";

type Props = { node: StepsBlock };

export function StepsNode({ node }: Props) {
	return (
		<div className="space-y-1">
			{node.steps.map((step, i) => (
				<div key={i} className="relative flex gap-4">
					{i < node.steps.length - 1 && (
						<span className="absolute left-3.5 top-8 h-full w-px bg-(--border)" />
					)}

					<div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-(--border) bg-(--bg) text-xs font-semibold text-(--text-primary)">
						{i + 1}
					</div>

					<div className="pb-6 flex-1 min-w-0">
						<p className="font-medium text-(--text-primary) leading-snug mb-2">
							{step.title}
						</p>
						<InlineContent content={step.content} />
						{step.example && <ExampleNode example={step.example} />}
					</div>
				</div>
			))}
		</div>
	);
}
