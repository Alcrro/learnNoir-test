import { useState } from "react";
import Editor, { type BeforeMount, type OnMount } from "@monaco-editor/react";
import { useTheme } from "next-themes";
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

const defineThemes: BeforeMount = (monaco) => {
	monaco.editor.defineTheme("github-dark", {
		base: "vs-dark",
		inherit: true,
		rules: [
			{ token: "comment", foreground: "8b949e", fontStyle: "italic" },
			{ token: "keyword", foreground: "ff7b72" },
			{ token: "string", foreground: "a5d6ff" },
			{ token: "number", foreground: "79c0ff" },
			{ token: "type", foreground: "ffa657" },
			{ token: "function", foreground: "d2a8ff" },
			{ token: "variable", foreground: "c9d1d9" },
			{ token: "operator", foreground: "ff7b72" },
			{ token: "delimiter", foreground: "c9d1d9" },
		],
		colors: {
			"editor.background": "#0d1117",
			"editor.foreground": "#c9d1d9",
			"editor.lineHighlightBackground": "#0d1117",
			"editorLineNumber.foreground": "#6e7681",
			"editorLineNumber.activeForeground": "#6e7681",
			"editor.selectionBackground": "#3b5070",
			"editorCursor.foreground": "#0d1117",
		},
	});

	monaco.editor.defineTheme("github-light", {
		base: "vs",
		inherit: true,
		rules: [
			{ token: "comment", foreground: "6e7781", fontStyle: "italic" },
			{ token: "keyword", foreground: "cf222e" },
			{ token: "string", foreground: "0a3069" },
			{ token: "number", foreground: "0550ae" },
			{ token: "type", foreground: "953800" },
			{ token: "function", foreground: "8250df" },
			{ token: "variable", foreground: "24292f" },
			{ token: "operator", foreground: "cf222e" },
			{ token: "delimiter", foreground: "24292f" },
		],
		colors: {
			"editor.background": "#ffffff",
			"editor.foreground": "#24292f",
			"editor.lineHighlightBackground": "#ffffff",
			"editorLineNumber.foreground": "#8c959f",
			"editorLineNumber.activeForeground": "#8c959f",
			"editor.selectionBackground": "#b6e3ff",
			"editorCursor.foreground": "#ffffff",
		},
	});
};

function WindowDots() {
	return (
		<div className="flex items-center gap-1.5">
			<span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
			<span className="w-3 h-3 rounded-full bg-[#febc2e]" />
			<span className="w-3 h-3 rounded-full bg-[#28c840]" />
		</div>
	);
}

export function CodeNode({ node }: { node: Record<string, unknown> }) {
	const variants = parseVariants(node);
	const [activeIdx, setActiveIdx] = useState(0);
	const [height, setHeight] = useState(100);
	const { resolvedTheme } = useTheme();

	if (variants.length === 0) return null;

	const active = variants[activeIdx]!;
	const hasMultiple = variants.length > 1;
	const isDark = resolvedTheme === "dark";

	const handleMount: OnMount = (editor) => {
		const update = () => setHeight(editor.getContentHeight() + 2);
		update();
		editor.onDidContentSizeChange(update);
	};

	return (
		<div className="rounded-xl border border-(--border) overflow-hidden shadow-sm">
			<div
				className="flex items-center justify-between px-4 py-2.5 border-b border-(--border)"
				style={{ background: isDark ? "#161b22" : "#f6f8fa" }}
			>
				<WindowDots />
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
						<span className="text-[11px] font-mono text-(--text-muted) tracking-wide">
							{active.language}
						</span>
					)
				)}
			</div>
			<Editor
				height={height}
				language={active.language || "javascript"}
				theme={isDark ? "github-dark" : "github-light"}
				value={active.code}
				beforeMount={defineThemes}
				onMount={handleMount}
				options={{
					readOnly: true,
					domReadOnly: true,
					minimap: { enabled: false },
					scrollBeyondLastLine: false,
					lineNumbers: "on",
					folding: false,
					fontSize: 13,
					lineHeight: 20,
					fontFamily: "JetBrains Mono, Fira Code, monospace",
					wordWrap: "off",
					padding: { top: 10, bottom: 10 },
					overviewRulerBorder: false,
					scrollbar: { vertical: "hidden", horizontal: "auto", handleMouseWheel: false },
					renderLineHighlight: "none",
					contextmenu: false,
					tabSize: 4,
					cursorStyle: "line",
					hideCursorInOverviewRuler: true,
					renderValidationDecorations: "off",
					occurrencesHighlight: "off",
					selectionHighlight: false,
				}}
			/>
		</div>
	);
}
