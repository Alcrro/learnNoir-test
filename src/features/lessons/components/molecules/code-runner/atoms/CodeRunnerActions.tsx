import { Play, RotateCcw } from "lucide-react";

type Props = {
	canRun: boolean;
	running: boolean;
	solved: boolean;
	hasOutput: boolean;
	onRun: () => void;
	onReset: () => void;
};

export function CodeRunnerActions({ canRun, running, solved, hasOutput, onRun, onReset }: Props) {
	return (
		<div className="lt-code-runner__actions">
			{canRun && (hasOutput || solved) && (
				<button type="button" className="lt-code-runner__btn lt-code-runner__btn--reset" onClick={onReset}>
					<RotateCcw size={12} aria-hidden />
					Reset
				</button>
			)}
			{canRun && !solved && (
				<button
					type="button"
					className="lt-code-runner__btn lt-code-runner__btn--run"
					onClick={onRun}
					disabled={running}
				>
					<Play size={12} aria-hidden />
					{running ? "..." : "Run"}
				</button>
			)}
		</div>
	);
}
