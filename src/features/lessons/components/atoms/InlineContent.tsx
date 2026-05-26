import type { TextContent } from "@shared/lesson-content";

type Props = { content: TextContent };

export function InlineContent({ content }: Props) {
	return (
		<div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
			{content.map((chunk, i) => {
				if (chunk.type === "paragraph")
					return (
						<span key={i} className="text-sm text-(--text-secondary) leading-relaxed">
							{chunk.text}
						</span>
					);
				if (chunk.type === "inlineCode")
					return (
						<code
							key={i}
							className="rounded-md border border-(--border) bg-(--surface) px-1.5 py-0.5 font-mono text-xs text-(--text-primary)"
						>
							{chunk.code}
						</code>
					);
				if (chunk.type === "label")
					return (
						<span
							key={i}
							className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)"
						>
							{chunk.text}
						</span>
					);
				return null;
			})}
		</div>
	);
}
