import { CodeRunnerBadge } from "./atoms/CodeRunnerBadge";
import { CodeRunnerActions } from "./atoms/CodeRunnerActions";

type Props = {
	label: string;
	canRun: boolean;
	running: boolean;
	solved: boolean;
	hasOutput: boolean;
	onRun: () => void;
	onReset: () => void;
};

export function CodeRunnerHeader({ label, canRun, running, solved, hasOutput, onRun, onReset }: Props) {
	return (
		<div className="lt-code-runner__header">
			<CodeRunnerBadge label={label} />
			<CodeRunnerActions
				canRun={canRun}
				running={running}
				solved={solved}
				hasOutput={hasOutput}
				onRun={onRun}
				onReset={onReset}
			/>
		</div>
	);
}
