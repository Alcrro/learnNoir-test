import { ImportanceBadge } from "./ImportanceBadge";

export function RoadmapLegend() {
	return (
		<div className="flex items-center gap-3 text-sm text-(--text-secondary)">
			<span className="font-medium">Legend:</span>
			<ImportanceBadge importance="essential" />
			<ImportanceBadge importance="normal" />
			<ImportanceBadge importance="optional" />
		</div>
	);
}
