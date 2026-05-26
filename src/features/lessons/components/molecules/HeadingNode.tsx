type HeadingNodeData = { level?: unknown; text?: unknown; [key: string]: unknown };

const HEADING_CLASSES: Record<string, string> = {
	h1: "text-2xl font-bold text-(--text-primary)",
	h2: "text-xl font-semibold text-(--text-primary)",
	h3: "text-lg font-semibold text-(--text-primary)",
	h4: "text-base font-semibold text-(--text-primary)",
	h5: "text-sm font-semibold text-(--text-primary)",
	h6: "text-sm font-medium text-(--text-secondary)",
};

export function HeadingNode({ node }: { node: HeadingNodeData }) {
	const level = typeof node.level === "number" ? node.level : 2;
	const text = typeof node.text === "string" ? node.text : "";
	const Tag = `h${Math.min(Math.max(level, 1), 6)}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	return <Tag className={HEADING_CLASSES[Tag]}>{text}</Tag>;
}
