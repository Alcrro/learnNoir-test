type CodeNodeData = { code?: unknown; language?: unknown; [key: string]: unknown };

export function CodeNode({ node }: { node: CodeNodeData }) {
	const code = typeof node.code === "string" ? node.code : "";
	const language = typeof node.language === "string" ? node.language : "";
	return (
		<div className="rounded-xl border border-(--border) bg-(--surface) overflow-x-auto">
			{language && (
				<div className="px-4 py-1.5 border-b border-(--border) text-xs font-mono text-(--text-muted)">
					{language}
				</div>
			)}
			<pre className="p-4 text-sm font-mono text-(--text-primary) whitespace-pre">{code}</pre>
		</div>
	);
}
