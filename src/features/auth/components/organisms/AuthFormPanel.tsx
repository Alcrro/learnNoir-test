import { Link, Outlet } from "react-router-dom";
import { AuthAlreadySignedIn } from "../atoms/AuthAlreadySignedIn";

type SwitchLink = {
	label: string;
	to: string;
	cta: string;
};

type Props = {
	isLoading: boolean;
	isAuthenticated: boolean;
	countdown: number;
	switchLink: SwitchLink;
	onNavigate: () => void;
};

export function AuthFormPanel({ isLoading, isAuthenticated, countdown, switchLink, onNavigate }: Props) {
	return (
		<section className="order-1 flex flex-col rounded-4xl border border-(--border) bg-(--bg-card) p-5 shadow-sm sm:p-7 lg:order-2 lg:p-8">
			{isLoading ? (
				<div className="space-y-4">
					<div className="h-6 w-24 animate-pulse rounded-full bg-(--bg-secondary)" />
					<div className="h-10 w-3/4 animate-pulse rounded-2xl bg-(--bg-secondary)" />
					<div className="h-5 w-full animate-pulse rounded bg-(--bg-secondary)" />
					<div className="h-13 w-full animate-pulse rounded-2xl bg-(--bg-secondary)" />
					<div className="h-13 w-full animate-pulse rounded-2xl bg-(--bg-secondary)" />
					<div className="h-13 w-full animate-pulse rounded-2xl bg-(--bg-secondary)" />
				</div>
			) : isAuthenticated ? (
				<AuthAlreadySignedIn countdown={countdown} onNavigate={onNavigate} />
			) : (
				<>
					<Outlet />
					<div className="mt-6 border-t border-(--border) pt-6 text-sm text-(--text-secondary)">
						{switchLink.label}{" "}
						<Link
							to={switchLink.to}
							className="font-semibold text-(--text-primary) underline underline-offset-4"
						>
							{switchLink.cta}
						</Link>
					</div>
				</>
			)}
		</section>
	);
}
