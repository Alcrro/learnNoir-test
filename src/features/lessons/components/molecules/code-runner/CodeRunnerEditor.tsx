import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";

type Props = {
	code: string;
	language: string;
	editable: boolean;
	height: number;
	onChange: (value: string) => void;
};

export function CodeRunnerEditor({ code, language, editable, height, onChange }: Props) {
	const { theme } = useTheme();

	return (
		<div className="lt-code-runner__editor">
			<Editor
				height={height}
				language={language}
				theme={theme === "dark" ? "vs-dark" : "vs"}
				value={code}
				onChange={(v) => editable && onChange(v ?? "")}
				options={{
					readOnly: !editable,
					minimap: { enabled: false },
					scrollBeyondLastLine: false,
					lineNumbers: "on",
					folding: false,
					fontSize: 13,
					lineHeight: 22,
					fontFamily: "JetBrains Mono, Fira Code, monospace",
					wordWrap: "on",
					padding: { top: 10, bottom: 10 },
					overviewRulerBorder: false,
					scrollbar: { vertical: "hidden", horizontal: "hidden" },
					renderLineHighlight: "none",
					tabSize: 2,
				}}
			/>
		</div>
	);
}
