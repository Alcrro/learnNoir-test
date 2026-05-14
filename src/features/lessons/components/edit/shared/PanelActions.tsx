// Butoane Save / Cancel comune tuturor panourilor de editare.
// Separate de Field pentru că pot fi folosite și în panouri fără câmpuri (ex: confirmare ștergere).

import { Save } from "lucide-react";

type Props = {
	onSave: () => void;
	onCancel: () => void;
};

export function PanelActions({ onSave, onCancel }: Props) {
	return (
		<div className="flex items-center gap-2 border-t border-(--border) pt-3">
			<button
				type="button"
				onClick={onSave}
				className="flex items-center gap-1.5 rounded-lg bg-(--accent) px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity"
			>
				<Save className="h-3.5 w-3.5" />
				Save
			</button>
			<button
				type="button"
				onClick={onCancel}
				className="rounded-lg border border-(--border) px-3 py-1.5 text-xs font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors"
			>
				Cancel
			</button>
		</div>
	);
}
