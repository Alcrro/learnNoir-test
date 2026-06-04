import { FREE_FEATURES } from "../../data/pricingPlans";
import { PricingActiveStatus } from "../atoms/PricingActiveStatus";
import { PricingCardHeader } from "../atoms/PricingCardHeader";
import { PricingCardShell } from "../atoms/PricingCardShell";
import { PricingFeatureList } from "../atoms/PricingFeatureList";

type Props = { isPro: boolean };

export function FreeCard({ isPro }: Props) {
	return (
		<PricingCardShell scheme="neutral">
			<PricingCardHeader
				scheme="neutral"
				label="Free"
				price={0}
				currency="EUR"
				subtitle="Pentru totdeauna"
			/>

			<PricingFeatureList features={FREE_FEATURES} scheme="neutral" />

			<div className="mt-auto">
				<PricingActiveStatus
					scheme="neutral"
					label={isPro ? "Plan de bază" : "Plan activ"}
					muted={isPro}
				/>
			</div>
		</PricingCardShell>
	);
}
