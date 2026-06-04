import { Check } from "lucide-react";
import { cn } from "../../../../libs/utils/cn";
import { PRICING_CHECK_COLOR, type ColorScheme } from "../styles/pricingVariants";

type Props = {
	features: readonly string[];
	scheme: ColorScheme;
};

export function PricingFeatureList({ features, scheme }: Props) {
	return (
		<ul className="mb-8 flex flex-col gap-3">
			{features.map((feature) => (
				<li key={feature} className="flex items-start gap-2.5 text-sm text-(--text-primary)">
					<Check className={cn("mt-0.5 h-4 w-4 shrink-0", PRICING_CHECK_COLOR[scheme])} />
					{feature}
				</li>
			))}
		</ul>
	);
}
