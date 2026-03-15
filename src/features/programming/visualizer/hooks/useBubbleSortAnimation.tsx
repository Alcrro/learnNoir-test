import type { RefObject } from "react";
import useGetAlgorithm from "../../../../hooks/useGetAlgorithm";
import { useAlgorithmStore } from "../../../../store/useAlgorithmStore";
import { useToggleStore } from "../../../../store/usetoggleStore";
import useCompareHighlight from "./useCompareHighlight";

const useBubbleSortAnimation = ({
	boxesRef,
}: {
	boxesRef: RefObject<HTMLDivElement[]>;
}) => {
	const steps = useAlgorithmStore((s) => s.steps);
	const currentStep = useAlgorithmStore((s) => s.currentStep);
	const generatedArray = useAlgorithmStore((s) => s.generatedArray);

	const hasStarted = useToggleStore((s) => s.isToggled("isAutoPlay"));
	console.log(boxesRef);

	useCompareHighlight({
		hasStarted,
		steps,
		currentStep,
		boxesRef,
	});

	useGetAlgorithm({ initialArray: generatedArray });
};

export default useBubbleSortAnimation;
