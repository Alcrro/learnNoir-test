import { useAlgorithmStore } from "../../../../store/useAlgorithmStore";

const useCurrentArray = () => {
	const generatedArray = useAlgorithmStore((s) => s.generatedArray);
	const currentStep = useAlgorithmStore((s) => s.currentStep);
	const steps = useAlgorithmStore((s) => s.steps);

	if (currentStep < 0 || !steps.length) return generatedArray;

	return steps[currentStep]?.array ?? generatedArray;
};

export default useCurrentArray;
