import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
	currentStep: number;
};

const useSetSearchParams = ({ currentStep }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const urlStep = String(currentStep + 1);

		if (searchParams.get("step") === urlStep) return;

		const params = new URLSearchParams(searchParams);

		const isVizTab = params.get("tab") === "vizTab";

		if (isVizTab) {
			params.set("step", urlStep);
			setSearchParams(params);
		}
	}, [currentStep, searchParams, setSearchParams]);
};

export default useSetSearchParams;
