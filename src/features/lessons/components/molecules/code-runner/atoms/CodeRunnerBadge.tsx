import { Terminal } from "lucide-react";

export function CodeRunnerBadge({ label }: { label: string }) {
	return (
		<div className="lt-code-runner__badge">
			<Terminal size={10} aria-hidden />
			{label}
		</div>
	);
}
