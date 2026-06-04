import { Sparkles } from "lucide-react";
import DefaultButton from "../../../../components/atoms/DefaultButton";
import { CREATOR_FEATURES } from "../../data/pricingPlans";
import { useUpgradeToCreator } from "../../hooks/useUpgradeToCreator";
import { PricingActiveStatus } from "../atoms/PricingActiveStatus";
import { PricingCardHeader } from "../atoms/PricingCardHeader";
import { PricingCardShell } from "../atoms/PricingCardShell";
import { PricingFeatureList } from "../atoms/PricingFeatureList";

type Props = { isCreator: boolean };

export function CreatorCard({ isCreator }: Props) {
	const upgrade = useUpgradeToCreator();

	return (
		<PricingCardShell
			scheme="violet"
			badge={{ icon: <Sparkles className="h-3 w-3" />, label: "Pentru creatori de conținut" }}
		>
			<PricingCardHeader
				scheme="violet"
				label="Creator"
				price={20}
				currency="EUR"
				interval="/lună"
				subtitle="Creează conținut AI, anulează oricând"
			/>

			<PricingFeatureList features={CREATOR_FEATURES} scheme="violet" />

			<div className="mt-auto">
				{isCreator ? (
					<PricingActiveStatus scheme="violet" label="Plan activ" />
				) : (
					<>
						<DefaultButton
							variant="ghost"
							onClick={() => upgrade.mutate()}
							disabled={upgrade.isPending}
							className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
						>
							<Sparkles className="h-4 w-4" />
							{upgrade.isPending ? "Se redirecționează..." : "Activează Creator"}
						</DefaultButton>
						{upgrade.isError && (
							<p className="mt-2 text-center text-xs text-red-500">
								Nu s-a putut porni plata. Încearcă din nou.
							</p>
						)}
					</>
				)}
			</div>
		</PricingCardShell>
	);
}
