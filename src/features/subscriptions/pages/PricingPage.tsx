import { Building2, Check, Lock, Mail, Zap } from "lucide-react";
import { cn } from "../../../libs/utils/cn";
import { useCheckoutRedirect, useIsPro } from "../hooks/useSubscription";

const FREE_FEATURES = [
	"Acces la lecții teoretice complete",
	"Vizualizări interactive algoritmi",
	"Preview primele 2 quiz-uri per lecție",
	"Preview primele 2 exerciții per lecție",
	"Urmărire progres de bază",
];

const PRO_FEATURES = [
	"Tot ce include planul Free",
	"Acces complet la toate quiz-urile",
	"Acces complet la toate exercițiile",
	"Exerciții interactive avansate",
	"Statistici detaliate de progres",
	"Conținut nou adăugat în permanență",
];

const ORG_FEATURES = [
	"Tot ce include planul Pro",
	"Conturi pentru toți membrii echipei",
	"Panou de administrare organizație",
	"Statistici agregate per echipă",
	"Onboarding dedicat",
	"Suport prioritar & SLA",
];

function FreeCard({ isPro }: { isPro: boolean }) {
	return (
		<div className="flex flex-col rounded-2xl border border-(--border) bg-(--bg-secondary) p-7">
			<div className="mb-6">
				<p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">Free</p>
				<div className="mt-2 flex items-baseline gap-1">
					<span className="text-4xl font-bold text-(--text-primary)">0</span>
					<span className="text-lg font-medium text-(--text-muted)">EUR</span>
				</div>
				<p className="mt-1 text-sm text-(--text-muted)">Pentru totdeauna</p>
			</div>

			<ul className="mb-8 flex flex-col gap-3">
				{FREE_FEATURES.map((feature) => (
					<li key={feature} className="flex items-start gap-2.5 text-sm text-(--text-primary)">
						<Check className="mt-0.5 h-4 w-4 shrink-0 text-(--text-muted)" />
						{feature}
					</li>
				))}
			</ul>

			<div className="mt-auto">
				{isPro ? (
					<div className="flex w-full items-center justify-center rounded-xl border border-(--border) bg-(--bg-elevated) px-4 py-3 text-sm text-(--text-muted)">
						Plan de bază
					</div>
				) : (
					<div className="flex w-full items-center justify-center rounded-xl border border-(--border) bg-(--bg-elevated) px-4 py-3 text-sm font-medium text-(--text-primary)">
						Plan activ
					</div>
				)}
			</div>
		</div>
	);
}

function ProCard({ isPro }: { isPro: boolean }) {
	const { startCheckout, isLoading } = useCheckoutRedirect();

	return (
		<div className="relative flex flex-col rounded-2xl border border-amber-500/50 bg-(--bg-secondary) p-7 shadow-[0_0_40px_-8px_rgba(245,158,11,0.15)]">
			<div className="absolute -top-3 left-7">
				<span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
					<Zap className="h-3 w-3" />
					Cel mai popular
				</span>
			</div>

			<div className="mb-6">
				<p className="text-xs font-semibold uppercase tracking-widest text-amber-400">Pro</p>
				<div className="mt-2 flex items-baseline gap-1">
					<span className="text-4xl font-bold text-(--text-primary)">10</span>
					<span className="text-lg font-medium text-(--text-muted)">EUR</span>
					<span className="text-sm text-(--text-muted)">/lună</span>
				</div>
				<p className="mt-1 text-sm text-(--text-muted)">Acces complet, anulează oricând</p>
			</div>

			<ul className="mb-8 flex flex-col gap-3">
				{PRO_FEATURES.map((feature) => (
					<li key={feature} className="flex items-start gap-2.5 text-sm text-(--text-primary)">
						<Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
						{feature}
					</li>
				))}
			</ul>

			<div className="mt-auto">
				{isPro ? (
					<div className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm font-medium text-amber-400">
						<Check className="h-4 w-4" />
						Subscripție activă
					</div>
				) : (
					<button
						onClick={() => void startCheckout()}
						disabled={isLoading}
						className={cn(
							"flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-semibold text-black transition-colors",
							"hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed",
						)}
					>
						<Zap className="h-4 w-4" />
						{isLoading ? "Se redirecționează..." : "Cumpără acum"}
					</button>
				)}
			</div>
		</div>
	);
}

function OrgCard() {
	return (
		<div className="flex flex-col rounded-2xl border border-(--border) bg-(--bg-secondary) p-7">
			<div className="mb-6">
				<div className="flex items-center gap-2">
					<Building2 className="h-4 w-4 text-(--text-muted)" />
					<p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">
						Organizație
					</p>
				</div>
				<div className="mt-2">
					<span className="text-2xl font-bold text-(--text-primary)">Preț personalizat</span>
				</div>
				<p className="mt-1 text-sm text-(--text-muted)">Pentru echipe și instituții</p>
			</div>

			<ul className="mb-8 flex flex-col gap-3">
				{ORG_FEATURES.map((feature) => (
					<li key={feature} className="flex items-start gap-2.5 text-sm text-(--text-primary)">
						<Check className="mt-0.5 h-4 w-4 shrink-0 text-(--text-muted)" />
						{feature}
					</li>
				))}
			</ul>

			<div className="mt-auto">
				<a
					href="mailto:contact@learnnoir.ro"
					className="flex w-full items-center justify-center gap-2 rounded-xl border border-(--border) bg-(--bg-elevated) px-4 py-3 text-sm font-semibold text-(--text-primary) transition-colors hover:bg-(--bg-elevated) hover:border-(--border-hover)"
				>
					<Mail className="h-4 w-4" />
					Contactează-ne
				</a>
			</div>
		</div>
	);
}

export function PricingPage() {
	const isPro = useIsPro();

	return (
		<div className="mx-auto max-w-5xl px-4 py-16">
			<div className="mb-12 text-center">
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
			</div>

			<div className="grid gap-6 md:grid-cols-3 md:items-stretch">
				<FreeCard isPro={isPro} />
				<ProCard isPro={isPro} />
				<OrgCard />
			</div>

			<p className="mt-8 text-center text-xs text-(--text-muted)">
				Plată securizată prin Stripe · Fără taxe ascunse · Anulare oricând
			</p>
		</div>
	);
}
