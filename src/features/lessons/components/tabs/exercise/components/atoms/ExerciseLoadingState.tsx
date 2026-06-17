import { Loader2 } from "lucide-react";

export function ExerciseLoadingState() {
	return (
		<div className="flex h-full items-center justify-center gap-2 text-(--text-muted)">
			<Loader2 className="h-4 w-4 animate-spin" />
			<span className="text-sm">Se încarcă exercițiile...</span>
		</div>
	);
}
