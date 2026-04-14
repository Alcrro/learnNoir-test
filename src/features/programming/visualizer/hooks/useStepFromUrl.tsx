import { useSearchParams } from "react-router-dom";

const useStepFromUrl = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const step = Number(searchParams.get("step") ?? "1") - 1;

	const updateStep = (newStep: number) => {
		const params = new URLSearchParams(searchParams);

		if (params.get("tab") === "vizTab") {
			params.set("step", String(newStep + 1));
			setSearchParams(params);
		}
	};

	return { step, updateStep };
};
export default useStepFromUrl;
