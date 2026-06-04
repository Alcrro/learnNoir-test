import { Lock } from "lucide-react";
import { PricingGrid } from "../components/organisms/PricingGrid";

export function PricingPage() {
	return (
		<div className="mx-auto max-w-7xl px-4 py-16">
			<header className="mb-12 text-center">
				<div className="mb-3 flex items-center justify-center gap-2 text-amber-400">
					<Lock className="h-4 w-4" />
					<span className="text-xs font-semibold uppercase tracking-widest">Subscripții</span>
				</div>
				<h1 className="text-3xl font-bold text-(--text-primary) sm:text-4xl">
					Alege planul potrivit pentru tine
				</h1>
				<p className="mx-auto mt-3 max-w-xl text-base text-(--text-muted)">
					Începe gratuit, treci la Pro pentru acces complet sau contactează-ne pentru un plan
					dedicat organizației tale.
				</p>
			</header>

			<PricingGrid />

			<p className="mt-8 text-center text-xs text-(--text-muted)">
				Plată securizată prin Stripe · Fără taxe ascunse · Anulare oricând
			</p>
		</div>
	);
}
