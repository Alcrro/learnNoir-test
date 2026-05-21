import { useState, useCallback, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { Play, RotateCcw, Terminal, CheckCircle } from "lucide-react";
import "../../../../features/computer-science/algorithms/components/lesson/lessonTheory.css";
import type { AnyNode } from "../tabs/theory/node-registry";

type RunResult = { lines: string[]; error?: string };

// Sandboxed executor — sandbox="allow-scripts" without allow-same-origin gives opaque origin.
// No access to parent DOM, localStorage, cookies, window.parent.
// channelId is echoed back so each instance only processes its own results.
const SANDBOX_SRCDOC = `<!DOCTYPE html><script>
window.addEventListener('message', function(e) {
  if (!e.data || e.data.type !== 'run') return;
  var lines = [];
  var fakeConsole = {
    log: function() { lines.push(Array.from(arguments).map(function(a){ return typeof a === 'object' ? JSON.stringify(a) : String(a); }).join(' ')); },
    warn: function() { lines.push('⚠ ' + Array.from(arguments).join(' ')); },
    error: function() { lines.push('✗ ' + Array.from(arguments).join(' ')); },
    info: function() { lines.push(Array.from(arguments).join(' ')); },
  };
  try {
    new Function('console', e.data.code)(fakeConsole);
    e.source.postMessage({ type: 'result', channelId: e.data.channelId, lines: lines }, '*');
  } catch(err) {
    e.source.postMessage({ type: 'result', channelId: e.data.channelId, lines: lines, error: err.message }, '*');
  }
});
<\/script>`;

const JS_RUNNABLE = new Set(["javascript", "js", ""]);

export function CodeRunnerNode({ node }: { node: AnyNode }) {
	const initialCode = typeof node.code === "string" ? node.code : "";
	const language = typeof node.language === "string" ? node.language : "javascript";
	const editable = node.editable !== false;
	const label = typeof node.label === "string" ? node.label : "Try it";
	const isChallenge = node.challenge === true;
	const canRun = JS_RUNNABLE.has(language);

	// Unique channel per instance — prevents cross-contamination between multiple runners
	const { theme } = useTheme();
	const monacoTheme = theme === "dark" ? "vs-dark" : "vs";

	const channelId = useRef(Math.random().toString(36).slice(2));
	const [code, setCode] = useState(initialCode);
	const [output, setOutput] = useState<RunResult | null>(null);
	const [running, setRunning] = useState(false);
	const [solved, setSolved] = useState(false);
	const iframeRef = useRef<HTMLIFrameElement>(null);

	useEffect(() => {
		if (!canRun) return;
		const id = channelId.current;
		const handler = (e: MessageEvent) => {
			if (!e.data || e.data.type !== "result" || e.data.channelId !== id) return;
			const result: RunResult = { lines: e.data.lines ?? [], error: e.data.error };
			setOutput(result);
			setRunning(false);
			if (isChallenge && !result.error) setSolved(true);
		};
		window.addEventListener("message", handler);
		return () => window.removeEventListener("message", handler);
	}, [canRun, isChallenge]);

	const handleRun = useCallback(() => {
		if (!iframeRef.current?.contentWindow) return;
		setRunning(true);
		setOutput(null);
		iframeRef.current.contentWindow.postMessage(
			{ type: "run", code, channelId: channelId.current },
			"*",
		);
	}, [code]);

	const handleReset = useCallback(() => {
		setCode(initialCode);
		setOutput(null);
		setSolved(false);
	}, [initialCode]);

	if (!initialCode) return null;

	const editorHeight = Math.min(Math.max(initialCode.split("\n").length * 22 + 24, 80), 340);

	return (
		<div className={`lt-code-runner${solved ? " lt-code-runner--solved" : ""}`}>
			{canRun && (
				<iframe
					ref={iframeRef}
					srcDoc={SANDBOX_SRCDOC}
					sandbox="allow-scripts"
					style={{ display: "none" }}
					title="js-sandbox"
				/>
			)}

			<div className="lt-code-runner__header">
				<div className="lt-code-runner__badge">
					<Terminal size={10} aria-hidden />
					{label}
				</div>
				<div className="lt-code-runner__actions">
					{canRun && (output || solved) && (
						<button type="button" className="lt-code-runner__btn lt-code-runner__btn--reset" onClick={handleReset}>
							<RotateCcw size={12} aria-hidden />
							Reset
						</button>
					)}
					{canRun && !solved && (
						<button
							type="button"
							className="lt-code-runner__btn lt-code-runner__btn--run"
							onClick={handleRun}
							disabled={running}
						>
							<Play size={12} aria-hidden />
							{running ? "..." : "Run"}
						</button>
					)}
				</div>
			</div>

			{solved ? (
				<div className="lt-code-runner__solved">
					<CheckCircle size={14} aria-hidden />
					Eroarea corectată — codul rulează fără probleme.
				</div>
			) : (
				<div className="lt-code-runner__editor">
					<Editor
						height={editorHeight}
						language={language}
						theme={monacoTheme}
						value={code}
						onChange={(v) => editable && setCode(v ?? "")}
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
			)}

			{canRun && output && !solved && (
				<div className="lt-code-runner__output">
					{output.lines.length === 0 && !output.error && (
						<span className="lt-code-runner__output-empty">No output</span>
					)}
					{output.lines.map((line, i) => (
						<div key={i} className="lt-code-runner__output-line">{line}</div>
					))}
					{output.error && (
						<div className="lt-code-runner__output-line lt-code-runner__output-line--error">
							{isChallenge ? "Eroare: " : "Error: "}{output.error}
							{isChallenge && <span className="lt-code-runner__hint"> — corectează codul și încearcă din nou</span>}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
