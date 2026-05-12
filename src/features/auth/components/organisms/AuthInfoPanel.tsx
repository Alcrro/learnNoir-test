import { Compass } from "lucide-react";
import { AuthFeatureCard } from "../atoms/AuthFeatureCard";
import { AUTH_FEATURES, AUTH_INFO } from "../../lib/authContent";

export function AuthInfoPanel() {
	return (
		<section className="order-2 overflow-hidden rounded-4xl border border-(--border) bg-(--bg-card) p-6 shadow-sm sm:p-8 lg:order-1 lg:p-10">
			<div className="flex h-full flex-col justify-between gap-8">
				<div className="space-y-5">
					<div className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--bg-secondary) px-3 py-1 text-xs font-medium text-(--text-secondary)">
						<Compass className="h-3.5 w-3.5 text-(--blue-text)" />
						{AUTH_INFO.badge}
					</div>
					<div className="space-y-4">
						<h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-(--text-primary) sm:text-4xl lg:text-5xl">
							{AUTH_INFO.heading}
						</h1>
						<p className="max-w-2xl text-base leading-7 text-(--text-secondary)">
							{AUTH_INFO.description}
						</p>
					</div>
				</div>

				<div className="grid gap-4 sm:grid-cols-3">
					{AUTH_FEATURES.map((f) => (
						<AuthFeatureCard
							key={f.title}
							icon={f.icon}
							tone={f.tone}
							title={f.title}
							description={f.description}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
