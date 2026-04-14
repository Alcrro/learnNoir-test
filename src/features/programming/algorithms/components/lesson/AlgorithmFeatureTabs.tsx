import {
	featureTabs,
	FeatureTabUniqueIdType,
} from "../../../../../content/FeaturesTabData";
import { cn } from "../../../../../libs/utils/cn";
import { useSearchParams } from "react-router-dom";

const AlgorithmFeatureTabs = ({
	tab,
	tabHandler,
}: {
	tab: FeatureTabUniqueIdType;
	tabHandler: (tabId: FeatureTabUniqueIdType) => void;
}) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const changeTabHandler = (tabId: FeatureTabUniqueIdType) => {
		tabHandler(tabId);
		const params = new URLSearchParams(searchParams);
		params.set("tab", tabId);
		setSearchParams(params);
	};

	return (
		<div className="tabs flex gap-4 capitalize border-b border-(--border)">
			{featureTabs.map((tabCategory) => {
				const isOpen = tab === tabCategory.uniqueId;

				return (
					<div
						key={tabCategory.id}
						onClick={() => changeTabHandler(tabCategory.uniqueId)}
						className={cn(
							"cursor-pointer py-1 px-3",
							isOpen && "border-b-2 border-[#378ADD] font-medium",
						)}
					>
						{tabCategory.label}
					</div>
				);
			})}
		</div>
	);
};

export default AlgorithmFeatureTabs;
