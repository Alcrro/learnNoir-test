import { useEffect } from "react";

type SearchParams = {
	currentStep: number;
	setSearchParams: (value: Record<string, string>) => void;
};
const useSetSearchParams = ({ currentStep, setSearchParams }: SearchParams) => {
	return useEffect(() => {
		const urlStewp = currentStep + 1;

		setSearchParams({ step: String(urlStewp) });
	}, [currentStep, setSearchParams]);
};

export default useSetSearchParams;
