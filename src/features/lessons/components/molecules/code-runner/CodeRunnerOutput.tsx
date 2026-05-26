import type { RunResult } from "../../../hooks/useCodeRunner";

type Props = { output: RunResult; isChallenge: boolean };

export function CodeRunnerOutput({ output, isChallenge }: Props) {
	return (
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
					{isChallenge && (
						<span className="lt-code-runner__hint"> — corectează codul și încearcă din nou</span>
					)}
				</div>
			)}
		</div>
	);
}
