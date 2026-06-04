import { Zap } from "lucide-react";
import DefaultButton from "../../../../components/atoms/DefaultButton";
import { PRO_FEATURES } from "../../data/pricingPlans";
import { useCheckoutRedirect } from "../../hooks/useCheckoutRedirect";
import { PricingActiveStatus } from "../atoms/PricingActiveStatus";
import { PricingCardHeader } from "../atoms/PricingCardHeader";
import { PricingCardShell } from "../atoms/PricingCardShell";
import { PricingFeatureList } from "../atoms/PricingFeatureList";

type Props = { isPro: boolean };

export function ProCard({ isPro }: Props) {
	const { startCheckout, isLoading, checkoutError } = useCheckoutRedirect();

	return (
		<PricingCardShell
			scheme="amber"
			badge={{ icon: <Zap className="h-3 w-3" />, label: "Cel mai popular" }}
		>
			<PricingCardHeader
				scheme="amber"
				label="Pro"
				price={10}
				currency="EUR"
				interval="/lună"
				subtitle="Acces complet, anulează oricând"
			/>

			<PricingFeatureList features={PRO_FEATURES} scheme="amber" />

			<div className="mt-auto">
				{isPro ? (
					<PricingActiveStatus scheme="amber" label="Subscripție activă" />
				) : (
					<>
						<DefaultButton
							variant="ghost"
							onClick={() => void startCheckout()}
							disabled={isLoading}
							className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-sm font-semibold text-black hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
						>
							<Zap className="h-4 w-4" />
							{isLoading ? "Se redirecționează..." : "Cumpără acum"}
						</DefaultButton>
						{checkoutError && (
							<p className="mt-2 text-center text-xs text-red-500">{checkoutError}</p>
						)}
					</>
				)}
			</div>
		</PricingCardShell>
	);
}
