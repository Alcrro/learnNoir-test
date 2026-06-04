import { useState } from "react";
import { LangDropdown } from "../atoms/LangDropdown";

type Variant = { language: string; code: string };

function parseVariants(node: Record<string, unknown>): Variant[] {
	if (Array.isArray(node.variants)) {
		return (node.variants as Variant[]).filter(
			(v) => typeof v.language === "string" && typeof v.code === "string",
		);
	}
	const code = typeof node.code === "string" ? node.code : "";
	const language = typeof node.language === "string" ? node.language : "";
	if (!code) return [];
	return [{ language, code }];
}

export function CodeNode({ node }: { node: Record<string, unknown> }) {
	const variants = parseVariants(node);
	const [activeIdx, setActiveIdx] = useState(0);

	if (variants.length === 0) return null;

	const active = variants[activeIdx]!;
	const hasMultiple = variants.length > 1;

	return (
		<div className="rounded-xl border border-(--border) bg-(--surface) overflow-x-auto">
			<div className="flex items-center justify-between px-4 py-1.5 border-b border-(--border)">
				<span />
				{hasMultiple ? (
					<LangDropdown
						languages={variants.map((v) => v.language)}
						active={active.language}
						onChange={(lang) => {
							const idx = variants.findIndex((v) => v.language === lang);
							if (idx !== -1) setActiveIdx(idx);
						}}
					/>
				) : (
					active.language && (
						<span className="text-xs font-mono text-(--text-muted)">{active.language}</span>
					)
				)}
			</div>
			<pre className="p-4 text-sm font-mono text-(--text-primary) whitespace-pre">{active.code}</pre>
		</div>
	);
}
