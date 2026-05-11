import { ArrowRight, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function HomeCta() {
	const location = useLocation();
	const registerState = { modal: "register", backgroundLocation: location };

	return (
		<section className="relative overflow-hidden rounded-[28px] border border-(--border) bg-(--bg-card) px-8 py-16 text-center shadow-sm">
			<div
				className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-(--blue-bg) opacity-50 blur-3xl"
				aria-hidden="true"
			/>
			<div
				className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-(--teal-bg) opacity-40 blur-3xl"
				aria-hidden="true"
			/>

			<div className="relative flex flex-col items-center gap-6">
				<h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-(--text-primary) sm:text-4xl">
					Ready to start learning?
				</h2>
				<p className="max-w-md text-sm leading-6 text-(--text-secondary)">
					Create a free account to track your progress, unlock the dashboard and
					continue exactly where you left off.
				</p>
				<div className="flex flex-wrap items-center justify-center gap-3">
					<Link
						to="/auth/register"
						state={registerState}
						className="inline-flex items-center gap-2 rounded-xl bg-(--btn-primary-bg) px-6 py-3 text-sm font-semibold text-(--btn-primary-text) shadow-sm transition hover:opacity-90"
					>
						Create free account
						<ArrowRight className="h-4 w-4" />
					</Link>
					<Link
						to="/subjects"
						className="inline-flex items-center gap-2 rounded-xl border border-(--border) bg-(--bg-secondary) px-6 py-3 text-sm font-medium text-(--text-primary) transition hover:border-(--border-strong) hover:bg-(--bg-elevated)"
					>
						<BookOpen className="h-4 w-4" />
						Browse subjects first
					</Link>
				</div>
			</div>
		</section>
	);
}
