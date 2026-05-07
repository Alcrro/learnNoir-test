import { cn } from "../../../../../../libs/utils/cn";
import { useVisualAlgorithmUIStore } from "../../../../../../store/useVisualAlgorithmUIStore";
import { useCurrentAlgorithm } from "../../../visualizer-v2/hooks/useCurrentAlgorithm";
import { visualizationIcons } from "../config/visualizationIcons";
import { visualizationMethods } from "../config/visualizationMethods";

const METHOD_LABELS: Record<string, string> = {
	box: "Grid",
	bar: "Bar",
	vertical: "Vertical",
	pillar: "Pillar",
	tree: "Tree",
};

const VisualizationMethodSelectorV2 = () => {
	const currentAlgorithm = useCurrentAlgorithm();
	const methods = currentAlgorithm
		? (visualizationMethods[currentAlgorithm] ?? [])
		: [];
	const setMethod = useVisualAlgorithmUIStore((s) => s.setVisualAlgorithmUI);
	const activeMethod = useVisualAlgorithmUIStore((s) => s.visualAlgorithmUI);

	if (methods.length <= 1) return null;

	return (
		<div className="flex items-center gap-px bg-(--bg-secondary) border border-(--border) rounded-lg p-0.5">
			{methods.map((method) => {
				const Icon = visualizationIcons[method];
				const isActive = activeMethod === method;
				return (
					<button
						key={method}
						title={METHOD_LABELS[method] ?? method}
						onClick={() => setMethod(method)}
						className={cn(
							"flex items-center justify-center w-7 h-7 rounded-md",
							"transition-all duration-100 outline-none",
							isActive
								? "bg-(--bg-card) text-(--text-primary) shadow-sm"
								: "text-(--text-muted) hover:text-(--text-secondary) hover:bg-(--bg-tertiary)",
						)}
					>
						<Icon size={13} strokeWidth={1.75} />
					</button>
				);
			})}
		</div>
	);
};

export default VisualizationMethodSelectorV2;
