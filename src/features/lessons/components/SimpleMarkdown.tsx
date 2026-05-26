// Content comes from our own backend AI, so dangerouslySetInnerHTML is acceptable here.
import { renderMarkdown } from "../lib/markdown";

type Props = { content: string; className?: string };

export function SimpleMarkdown({ content, className }: Props) {
	return (
		<div
			className={`simple-markdown ${className ?? ""}`}
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
		/>
	);
}
