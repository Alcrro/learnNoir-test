import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { HERO_CONTENT } from "../../lib/heroContent";

type Props = {
	isAuthenticated: boolean;
};

export function HomeHero({ isAuthenticated }: Props) {
	const location = useLocation();
	const registerState = { backgroundLocation: location };

	return (
		<section className="relative overflow-hidden rounded-4xl border border-(--border) bg-(--bg-card) px-6 py-16 shadow-sm sm:px-10 lg:px-16 lg:py-24">
			<div
				className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-(--blue-bg) opacity-70 blur-3xl"
				aria-hidden="true"
			/>
			<div
				className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-(--teal-bg) opacity-60 blur-3xl"
				aria-hidden="true"
			/>
			<div
				className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--blue-bg) opacity-30 blur-3xl"
				aria-hidden="true"
			/>

			<div className="relative flex flex-col items-center gap-8 text-center">
				<span className="inline-flex items-center gap-2 rounded-full border border-(--blue-border) bg-(--blue-bg) px-4 py-1.5 text-xs font-medium text-(--blue-text)">
					<Sparkles className="h-3.5 w-3.5" />
					{HERO_CONTENT.badge}
				</span>

				<h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-(--text-primary) sm:text-5xl lg:text-[3.5rem] lg:leading-[1.15]">
					{HERO_CONTENT.heading}
				</h1>

				<p className="max-w-xl text-base leading-7 text-(--text-secondary) sm:text-lg sm:leading-8">
					{HERO_CONTENT.description}
				</p>

				<div className="flex flex-wrap items-center justify-center gap-3">
					<Link
						to="/subjects"
						className="inline-flex items-center gap-2 rounded-xl bg-(--btn-primary-bg) px-6 py-3 text-sm font-semibold text-(--btn-primary-text) shadow-sm transition hover:opacity-90"
					>
						<BookOpen className="h-4 w-4" />
						{HERO_CONTENT.cta.primary.label}
					</Link>
					{!isAuthenticated ? (
						<Link
							to="/auth/register"
							state={registerState}
							className="inline-flex items-center gap-2 rounded-xl border border-(--border) bg-(--bg-secondary) px-6 py-3 text-sm font-medium text-(--text-primary) transition hover:border-(--border-strong) hover:bg-(--bg-elevated)"
						>
							{HERO_CONTENT.cta.secondary.label}
							<ArrowRight className="h-4 w-4" />
						</Link>
					) : null}
				</div>

				{!isAuthenticated ? (
					<p className="text-xs text-(--text-muted)">{HERO_CONTENT.finePrint}</p>
				) : null}
			</div>
		</section>
	);
}
