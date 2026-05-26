export function ParagraphNode({ node }: { node: Record<string, unknown> }) {
	const text = typeof node.text === "string" ? node.text : "";
	return <p className="text-sm leading-relaxed text-(--text-secondary)">{text}</p>;
}
