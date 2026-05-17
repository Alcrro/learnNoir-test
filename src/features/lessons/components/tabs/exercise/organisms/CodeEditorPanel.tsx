import { useRef } from "react";
import Editor from "@monaco-editor/react";
import { Play, Send, RotateCcw, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { TestCaseResult } from "../molecules/TestCaseResult";
import type { CodeRunResult } from "../lib/exerciseTypes";

type RunState =
	| { phase: "idle" }
	| { phase: "running" }
	| { phase: "results"; result: CodeRunResult; submitted: boolean };

type Props = {
	code: string;
	onChange: (code: string) => void;
	onRun: () => void;
	onSubmit: () => void;
	onReset: () => void;
	isRunning: boolean;
	runState: RunState;
};

export function CodeEditorPanel({
	code,
	onChange,
	onRun,
	onSubmit,
	onReset,
	isRunning,
	runState,
}: Props) {
	const editorRef = useRef<unknown>(null);

	const allPassed =
		runState.phase === "results" &&
		runState.result.passedCount === runState.result.totalCount;

	return (
		<div className="flex h-full flex-col overflow-hidden">
			{/* Toolbar */}
			<div className="flex shrink-0 items-center gap-2 border-b border-(--border) bg-(--surface) px-3 py-2">
				<span className="text-[11px] font-medium text-(--text-muted)">JavaScript</span>

				<div className="ml-auto flex items-center gap-2">
					<button
						onClick={onReset}
						disabled={isRunning}
						className="flex items-center gap-1.5 rounded-md border border-(--border) bg-(--bg) px-2.5 py-1 text-xs text-(--text-secondary) transition-colors hover:border-(--border-strong) hover:text-(--text-primary) disabled:opacity-40"
					>
						<RotateCcw className="h-3 w-3" />
						Reset
					</button>

					<button
						onClick={onRun}
						disabled={isRunning}
						className="flex items-center gap-1.5 rounded-md border border-(--border) bg-(--bg) px-2.5 py-1 text-xs text-(--text-secondary) transition-colors hover:border-(--border-strong) hover:text-(--text-primary) disabled:opacity-40"
					>
						{isRunning ? (
							<Loader2 className="h-3 w-3 animate-spin" />
						) : (
							<Play className="h-3 w-3" />
						)}
						Run
					</button>

					<button
						onClick={onSubmit}
						disabled={isRunning}
						className="flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-40"
					>
						{isRunning ? (
							<Loader2 className="h-3 w-3 animate-spin" />
						) : (
							<Send className="h-3 w-3" />
						)}
						Submit
					</button>
				</div>
			</div>

			{/* Monaco */}
			<div className="min-h-0 flex-1">
				<Editor
					language="javascript"
					theme="vs-dark"
					value={code}
					onChange={(val) => onChange(val ?? "")}
					onMount={(editor) => {
						editorRef.current = editor;
					}}
					options={{
						fontSize: 13,
						lineHeight: 20,
						minimap: { enabled: false },
						scrollBeyondLastLine: false,
						tabSize: 2,
						wordWrap: "on",
						padding: { top: 12, bottom: 12 },
						fontFamily: "JetBrains Mono, Fira Code, monospace",
					}}
				/>
			</div>

			{/* Results panel */}
			{runState.phase === "results" && (
				<div className="shrink-0 overflow-y-auto border-t border-(--border) bg-(--bg)">
					{/* Summary bar */}
					<div className="flex items-center gap-2 border-b border-(--border) px-4 py-2.5">
						{runState.submitted ? (
							<>
								{allPassed ? (
									<CheckCircle2 className="h-4 w-4 text-emerald-400" />
								) : (
									<XCircle className="h-4 w-4 text-red-400" />
								)}
								<span
									className={`text-xs font-semibold ${allPassed ? "text-emerald-400" : "text-red-400"}`}
								>
									{runState.result.passedCount}/{runState.result.totalCount} teste trecute
									{allPassed ? " — Rezolvat!" : ""}
								</span>
							</>
						) : (
							<>
								<span className="text-xs font-semibold text-(--text-secondary)">
									Rezultate Run —{" "}
								</span>
								<span
									className={`text-xs font-semibold ${allPassed ? "text-emerald-400" : "text-red-400"}`}
								>
									{runState.result.passedCount}/{runState.result.totalCount} trecute
								</span>
							</>
						)}
						<span className="ml-auto text-[10px] text-(--text-muted)">
							{runState.result.totalTimeMs}ms total
						</span>
					</div>

					{runState.result.results.length > 0 && (
						<div className="space-y-2 p-3">
							{runState.result.results.map((r, i) => (
								<TestCaseResult key={i} result={r} index={i} />
							))}
						</div>
					)}
				</div>
			)}

			{runState.phase === "running" && (
				<div className="flex shrink-0 items-center gap-2 border-t border-(--border) bg-(--bg) px-4 py-3 text-xs text-(--text-muted)">
					<Loader2 className="h-3.5 w-3.5 animate-spin" />
					Se execută codul...
				</div>
			)}
		</div>
	);
}
