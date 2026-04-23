// hooks/useAlgorithmPageQuery.ts
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { FeatureTabUniqueIdType } from "../../../../content/FeaturesTabData";

export const useAlgorithmPageQuery = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const tab = (searchParams.get("tab") as FeatureTabUniqueIdType) ?? "learnTab";

	useEffect(() => {
		const step = searchParams.get("step");

		if (tab !== "vizTab" && step) {
			const params = new URLSearchParams(searchParams);
			params.delete("step");
			setSearchParams(params, { replace: true });
		}
	}, [tab, searchParams, setSearchParams]);

	const setTab = (tabId: FeatureTabUniqueIdType) => {
		const params = new URLSearchParams(searchParams);

		params.set("tab", tabId);

		if (tabId === "vizTab") {
			if (!params.get("step")) params.set("step", "1");
		} else {
			params.delete("step");
		}

		setSearchParams(params);
	};

	return { tab, setTab };
};
