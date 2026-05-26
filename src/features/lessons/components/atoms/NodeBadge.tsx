import type { ReactNode } from "react";

export function NodeBadge({ label, icon }: { label: string; icon: ReactNode }) {
	return (
		<div className="lt-code-runner__badge">
			{icon}
			{label}
		</div>
	);
}
