import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAlgorithmStore } from "../../../../store/useAlgorithmStore";

const useStepFromUrl = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const setCurrentStep = useAlgorithmStore((s) => s.setCurrentStep);

	const urlStep = Number(searchParams.get("step") ?? "0");
	const internalStep = urlStep - 1;

	useEffect(() => {
		setCurrentStep(internalStep);
	}, [internalStep, setCurrentStep]);

	return { searchParams, setSearchParams };
};
export default useStepFromUrl;
