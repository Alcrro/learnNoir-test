import { Building2, Mail } from "lucide-react";
import { cn } from "../../../../libs/utils/cn";
import { ORG_FEATURES } from "../../data/pricingPlans";
import { PricingCardHeader } from "../atoms/PricingCardHeader";
import { PricingCardShell } from "../atoms/PricingCardShell";
import { PricingFeatureList } from "../atoms/PricingFeatureList";

export function OrgCard() {
	return (
		<PricingCardShell
			scheme="sky"
			badge={{ icon: <Building2 className="h-3 w-3" />, label: "Echipe și instituții" }}
		>
			<PricingCardHeader
				scheme="sky"
				label="Organizație"
				price="Preț personalizat"
				subtitle="SLA dedicat, facturare centralizată"
			/>

			<PricingFeatureList features={ORG_FEATURES} scheme="sky" />

			<div className="mt-auto">
				<a
					href="mailto:contact@learnnoir.ro"
					className={cn(
						"flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition-colors",
						"hover:bg-sky-500",
					)}
				>
					<Mail className="h-4 w-4" />
					Contactează-ne
				</a>
			</div>
		</PricingCardShell>
	);
}
