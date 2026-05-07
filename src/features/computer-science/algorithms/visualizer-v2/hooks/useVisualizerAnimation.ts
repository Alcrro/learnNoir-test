import { useEffect, type RefObject } from "react";
import { useAlgorithmStore } from "../../../../../store/useAlgorithmStore";
import { useToggleStore } from "../../../../../store/useToggleStore";
import { useVisualAlgorithmUIStore } from "../../../../../store/useVisualAlgorithmUIStore";
import useCompareHighlight from "../../../visualizer/hooks/useCompareHighlight";
import { algorithmStepRegistry } from "../registry/algorithmStepRegistry";
import { visualizationMethods } from "../../components/visualizers/config/visualizationMethods";
import { useCurrentAlgorithm } from "./useCurrentAlgorithm";
import type { Step } from "../../shared/AlgorithmTypes";

export function useVisualizerAnimation({
	boxesRef,
}: {
	boxesRef: RefObject<HTMLDivElement[]>;
}) {
	const algorithm = useCurrentAlgorithm();
	const steps = useAlgorithmStore((s) => s.steps);
	const currentStep = useAlgorithmStore((s) => s.currentStep);
	const generatedArray = useAlgorithmStore((s) => s.generatedArray);
	const setSteps = useAlgorithmStore((s) => s.setSteps);
	const setTime = useAlgorithmStore((s) => s.setTime);
	const visualAlgorithmUI = useVisualAlgorithmUIStore(
		(s) => s.visualAlgorithmUI,
	);
	const setVisualAlgorithmUI = useVisualAlgorithmUIStore(
		(s) => s.setVisualAlgorithmUI,
	);
	const hasStarted = useToggleStore((s) => s.isToggled("isAutoPlay"));

	// Reset to first available method when algorithm changes.
	useEffect(() => {
		if (!algorithm) return;
		const available = visualizationMethods[algorithm] ?? [];
		if (available.length > 0 && !available.includes(visualAlgorithmUI as never)) {
			setVisualAlgorithmUI(available[0]);
		}
	}, [algorithm, setVisualAlgorithmUI, visualAlgorithmUI]);

	useEffect(() => {
		if (!generatedArray.length || !algorithm) return;
		const generator = algorithmStepRegistry[algorithm];
		if (!generator) return;

		const start = performance.now();
		let result: Step[] | undefined;
		for (let i = 0; i < 100; i++) {
			result = generator(generatedArray);
		}
		setSteps(result ?? []);
		setTime(performance.now() - start);
	}, [generatedArray, algorithm, setSteps, setTime]);

	useCompareHighlight({
		hasStarted,
		steps,
		currentStep,
		boxesRef,
		visualAlgorithm: visualAlgorithmUI,
	});
}
