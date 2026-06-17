import { LoaderCircle } from "lucide-react";
import { PricingFooterNote } from "../components/atoms/PricingFooterNote";
import { PricingPageHeader } from "../components/molecules/PricingPageHeader";
import { PricingGrid } from "../components/organisms/PricingGrid";
import { useIsPro } from "../hooks/useIsPro";
import { useIsCreator } from "../hooks/useIsCreator";
import { useManageSubscription } from "../hooks/useManageSubscription";
import DefaultButton from "../../../components/atoms/DefaultButton";

function ManageSubscriptionBanner() {
	const isPro = useIsPro();
	const isCreator = useIsCreator();
	const { openPortal, isLoading, error } = useManageSubscription();

	if (!isPro && !isCreator) return null;

	return (
		<div className="mb-10 flex items-center justify-between rounded-2xl border border-(--border) bg-(--bg-secondary) px-5 py-4">
			<div>
				<p className="text-sm font-medium text-(--text-primary)">
					You have an active {isCreator ? "Creator" : "Pro"} subscription
				</p>
				{error ? (
					<p className="mt-1 text-xs text-red-500">{error}</p>
				) : (
					<p className="mt-1 text-xs text-(--text-secondary)">
						Manage billing, invoices, or cancel anytime.
					</p>
				)}
			</div>
			<DefaultButton size="sm" variant="outline" onClick={openPortal} disabled={isLoading}>
				{isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : "Manage subscription"}
			</DefaultButton>
		</div>
	);
}

export function PricingPage() {
	return (
		<div className="mx-auto max-w-7xl px-4 py-16">
			<PricingPageHeader />
			<ManageSubscriptionBanner />
			<PricingGrid />
			<PricingFooterNote />
		</div>
	);
}
