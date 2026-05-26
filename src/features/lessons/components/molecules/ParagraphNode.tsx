type ParagraphNodeData = { text?: unknown; [key: string]: unknown };

export function ParagraphNode({ node }: { node: ParagraphNodeData }) {
	const text = typeof node.text === "string" ? node.text : "";
	return <p className="text-sm leading-relaxed text-(--text-secondary)">{text}</p>;
}
