import { CheckCircle } from "lucide-react";

export function CodeRunnerSolvedBanner() {
	return (
		<div className="lt-code-runner__solved">
			<CheckCircle size={14} aria-hidden />
			Eroarea corectată — codul rulează fără probleme.
		</div>
	);
}
