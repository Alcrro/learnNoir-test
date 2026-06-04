import { useIsCreator } from "../../hooks/useIsCreator";
import { useIsPro } from "../../hooks/useIsPro";
import { CreatorCard } from "../molecules/CreatorCard";
import { FreeCard } from "../molecules/FreeCard";
import { OrgCard } from "../molecules/OrgCard";
import { ProCard } from "../molecules/ProCard";

export function PricingGrid() {
	const isPro = useIsPro();
	const isCreator = useIsCreator();

	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
			<FreeCard isPro={isPro} />
			<ProCard isPro={isPro} />
			<CreatorCard isCreator={isCreator} />
			<OrgCard />
		</div>
	);
}
