import { useLocation } from "react-router-dom";
import { visualizationIcons } from "../../features/programming/algorithms/components/visualizers/config/visualizationIcons";
import { visualizationMethods } from "../../features/programming/algorithms/components/visualizers/config/viualizationMethods";
import type { AlgorithmTypes } from "../../features/programming/algorithms/shared/AlgorithmTypes";
import { cn } from "../../libs/utils/cn";
import DefaultButton from "../atoms/DefaultButton";
import { useVisualAlgorithmUIStore } from "../../store/useVisualAlgorithmUIStore";

const VisualizerMethodSelector = () => {
	const location = useLocation();
	const currentAlgorithm = location.pathname.split("/").pop() as AlgorithmTypes;
	const currentVizualizer = visualizationMethods[currentAlgorithm] ?? [];

	const setVizualizerMethod = useVisualAlgorithmUIStore(
		(store) => store.setVisualAlgorithmUI,
	);
	const vizualizerMethod = useVisualAlgorithmUIStore(
		(store) => store.visualAlgorithmUI,
	);

	return (
		<div className="flex gap-2 items-center">
			{currentVizualizer.map((method) => {
				const Icon = visualizationIcons[method];

				return (
					<DefaultButton
						variant="icon"
						size="icon"
						className={cn(
							"border text-(--text-secondary) border-transparent p-1 rounded-md hover:text-(var--text-primary)",
							vizualizerMethod === method
								? "border-gray-500 text-(--text-primary)"
								: "",
						)}
						aria-label={method}
						title={method}
						onClick={() => setVizualizerMethod(method)}
						key={method}
					>
						{<Icon />}
					</DefaultButton>
				);
			})}
		</div>
	);
};

export default VisualizerMethodSelector;
