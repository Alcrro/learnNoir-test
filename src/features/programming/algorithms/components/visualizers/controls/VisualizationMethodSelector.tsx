import { useLocation } from "react-router-dom";
import { visualizationIcons } from "../config/visualizationIcons";
import { visualizationMethods } from "../config/visualizationMethods";
import type { AlgorithmTypes } from "../../../shared/AlgorithmTypes";
import { cn } from "../../../../../../libs/utils/cn";
import DefaultButton from "../../../../../../components/atoms/DefaultButton";
import { useVisualAlgorithmUIStore } from "../../../../../../store/useVisualAlgorithmUIStore";

const VisualizationMethodSelector = () => {
	const location = useLocation();
	const currentAlgorithm = location.pathname.split("/").pop() as AlgorithmTypes;
	const currentVisualizer = visualizationMethods[currentAlgorithm] ?? [];

	const setVisualizerMethod = useVisualAlgorithmUIStore(
		(store) => store.setVisualAlgorithmUI,
	);
	const visualizerMethod = useVisualAlgorithmUIStore(
		(store) => store.visualAlgorithmUI,
	);

	return (
		<div className="flex gap-2 justify-center items-center flex-wrap">
			{currentVisualizer.map((method) => {
				const Icon = visualizationIcons[method];

				return (
					<DefaultButton
						variant="icon"
						size="icon"
						className={cn(
							"border text-(--text-secondary) border-transparent p-1 rounded-md hover:text-(var--text-primary)",
							visualizerMethod === method
								? "border-gray-800 text-(--text-black)"
								: "",
						)}
						aria-label={method}
						title={method}
						onClick={() => setVisualizerMethod(method)}
						key={method}
					>
						{<Icon />}
					</DefaultButton>
				);
			})}
		</div>
	);
};

export default VisualizationMethodSelector;
