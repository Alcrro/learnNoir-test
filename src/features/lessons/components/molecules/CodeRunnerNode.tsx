import type { AnyNode } from "../../types/node.types";
import { useCodeRunner } from "../../hooks/useCodeRunner";
import { CodeRunnerHeader } from "./code-runner/CodeRunnerHeader";
import { CodeRunnerEditor } from "./code-runner/CodeRunnerEditor";
import { CodeRunnerOutput } from "./code-runner/CodeRunnerOutput";
import { CodeRunnerSolvedBanner } from "./code-runner/atoms/CodeRunnerSolvedBanner";
import "../../../../features/computer-science/algorithms/components/lesson/lessonTheory.css";

const JS_RUNNABLE = new Set(["javascript", "js", ""]);

export function CodeRunnerNode({ node }: { node: AnyNode }) {
	const initialCode = typeof node.code === "string" ? node.code : "";
	const language = typeof node.language === "string" ? node.language : "javascript";
	const editable = node.editable !== false;
	const label = typeof node.label === "string" ? node.label : "Try it";
	const isChallenge = node.challenge === true;
	const canRun = JS_RUNNABLE.has(language);

	const { code, setCode, output, running, solved, iframeRef, sandboxSrcdoc, handleRun, handleReset } =
		useCodeRunner({ initialCode, canRun, isChallenge });

	if (!initialCode) return null;

	const editorHeight = Math.min(Math.max(initialCode.split("\n").length * 22 + 24, 80), 340);

	return (
		<div className={`lt-code-runner${solved ? " lt-code-runner--solved" : ""}`}>
			{canRun && (
				<iframe
					ref={iframeRef}
					srcDoc={sandboxSrcdoc}
					sandbox="allow-scripts"
					style={{ display: "none" }}
					title="js-sandbox"
				/>
			)}
			<CodeRunnerHeader
				label={label}
				canRun={canRun}
				running={running}
				solved={solved}
				hasOutput={!!output}
				onRun={handleRun}
				onReset={handleReset}
			/>
			{solved ? (
				<CodeRunnerSolvedBanner />
			) : (
				<CodeRunnerEditor
					code={code}
					language={language}
					editable={editable}
					height={editorHeight}
					onChange={setCode}
				/>
			)}
			{canRun && output && !solved && (
				<CodeRunnerOutput output={output} isChallenge={isChallenge} />
			)}
		</div>
	);
}
