import { Lock } from "lucide-react";
import { PricingIconLabel } from "../atoms/PricingIconLabel";
import { PricingPageDescription } from "../atoms/PricingPageDescription";
import { PricingPageTitle } from "../atoms/PricingPageTitle";

export function PricingPageHeader() {
	return (
		<header className="mb-12 text-center">
			<PricingIconLabel icon={Lock} label="Subscripții" />
			<PricingPageTitle>Alege planul potrivit pentru tine</PricingPageTitle>
			<PricingPageDescription>
				Începe gratuit, treci la Pro pentru acces complet sau contactează-ne pentru un plan
				dedicat organizației tale.
			</PricingPageDescription>
		</header>
	);
}
