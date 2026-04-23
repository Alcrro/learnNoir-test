import {
	ArrowRight,
	Compass,
	MoonStar,
	ShieldCheck,
	Sparkles,
	Zap,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useGetMe } from "../../features/auth/hooks/useAuth";
import { useRedirectCountdown } from "../../features/auth/hooks/useRedirectCountdown";
import LoginModal from "../../features/auth/components/modal/LoginModal";
import { ToggleTheme } from "../../components/molecules/ThemeToggle";

type authTypeMethod = "register" | "login" | "auth";
type AuthLocationState = {
	backgroundLocation?: {
		pathname: string;
		search?: string;
		hash?: string;
	};
};

const Auth = () => {
	const { data: user, isLoading } = useGetMe();
	const navigate = useNavigate();
	const location = useLocation();
	const state = (location.state ?? null) as AuthLocationState | null;

	const isModal =
		state?.backgroundLocation && location.pathname === "/auth/login";

	// if (isModal) return <Outlet />;

	const wrapperPath = location.pathname.split("/");
	const pathname = wrapperPath[wrapperPath.length - 1] as authTypeMethod;

	const redirectCountdown = useRedirectCountdown({
		enabled: Boolean(user) && !isModal,
		seconds: 2,
		onComplete: () => {
			navigate("/dashboard", { replace: true });
		},
	});

	const switchLink =
		pathname === "register"
			? {
					label: "Already have an account?",
					to: "/auth/login",
					cta: "Login",
				}
			: {
					label: "Need an account?",
					to: "/auth/register",
					cta: "Register",
				};

	return (
		<div className="min-h-screen bg-[var(--bg-page)] px-4 py-4 sm:px-6 lg:px-8">
			{isModal ? <LoginModal /> : null}

			{!isModal ? (
				<div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl flex-col gap-6">
					<div className="flex items-center justify-between gap-4 rounded-[24px] border border-[color:var(--border)] bg-[var(--bg-card)]/95 px-4 py-3 shadow-sm backdrop-blur sm:px-5">
						<Link
							to="/"
							className="flex min-w-0 items-center gap-3"
						>
							<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--blue-bg)] text-[var(--blue-text)]">
								<Sparkles className="h-5 w-5" />
							</div>

							<div className="min-w-0">
								<p className="truncate text-base font-semibold text-[var(--text-primary)]">
									LearnNoir
								</p>
								<p className="truncate text-xs text-[var(--text-secondary)]">
									Senior-feel auth for your learning app
								</p>
							</div>
						</Link>

						<div className="flex items-center gap-2">
							<Link
								to="/subjects"
								className="hidden rounded-xl border border-[color:var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:border-[color:var(--border-strong)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] sm:inline-flex"
							>
								Explore subjects
							</Link>
							<ToggleTheme />
						</div>
					</div>

					<div className="grid flex-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
						<section className="order-2 overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-[var(--bg-card)] p-6 shadow-sm sm:p-8 lg:order-1 lg:p-10">
							<div className="flex h-full flex-col justify-between gap-8">
								<div className="space-y-5">
									<div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[var(--bg-secondary)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
										<Compass className="h-3.5 w-3.5 text-[var(--blue-text)]" />
										Consistent auth experience
									</div>

									<div className="space-y-4">
										<h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
											Authentication pages that feel intentional, calm and
											production-ready.
										</h1>
										<p className="max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
											The UI uses your current color system, adapts to dark and
											light mode, keeps mobile spacing clean and makes redirects
											and errors feel predictable instead of abrupt.
										</p>
									</div>
								</div>

								<div className="grid gap-4 sm:grid-cols-3">
									<div className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4">
										<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--blue-bg)] text-[var(--blue-text)]">
											<ShieldCheck className="h-5 w-5" />
										</div>
										<p className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
											Clear status states
										</p>
										<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
											Errors, success and redirect countdowns are explicit and
											easy to understand.
										</p>
									</div>

									<div className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4">
										<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--teal-bg)] text-[var(--teal-text)]">
											<MoonStar className="h-5 w-5" />
										</div>
										<p className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
											Theme-aware polish
										</p>
										<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
											Surfaces, borders and contrast stay balanced across both
											theme modes.
										</p>
									</div>

									<div className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4">
										<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--amber-bg)] text-[var(--amber-text)]">
											<Zap className="h-5 w-5" />
										</div>
										<p className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
											Mobile first
										</p>
										<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
											The form stays first on small screens, without cramped
											spacing or broken hierarchy.
										</p>
									</div>
								</div>
							</div>
						</section>

						<section className="order-1 flex flex-col rounded-[32px] border border-[color:var(--border)] bg-[var(--bg-card)] p-5 shadow-sm sm:p-7 lg:order-2 lg:p-8">
							{isLoading ? (
								<div className="space-y-4">
									<div className="h-6 w-24 animate-pulse rounded-full bg-[var(--bg-secondary)]" />
									<div className="h-10 w-3/4 animate-pulse rounded-2xl bg-[var(--bg-secondary)]" />
									<div className="h-5 w-full animate-pulse rounded bg-[var(--bg-secondary)]" />
									<div className="h-[3.25rem] w-full animate-pulse rounded-2xl bg-[var(--bg-secondary)]" />
									<div className="h-[3.25rem] w-full animate-pulse rounded-2xl bg-[var(--bg-secondary)]" />
									<div className="h-[3.25rem] w-full animate-pulse rounded-2xl bg-[var(--bg-secondary)]" />
								</div>
							) : user ? (
								<div className="flex h-full flex-col justify-center rounded-[28px] border border-[color:var(--teal-border)] bg-[var(--teal-bg)] p-6 text-[var(--teal-text)]">
									<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg-card)]/60">
										<ShieldCheck className="h-6 w-6" />
									</div>
									<h2 className="mt-6 text-2xl font-semibold">
										You are already authenticated
									</h2>
									<p className="mt-3 text-sm leading-6 opacity-90 sm:text-base">
										We detected an active session, so there is no reason to keep
										you on the auth screen. Redirecting to your dashboard in{" "}
										{redirectCountdown}{" "}
										{redirectCountdown === 1 ? "second" : "seconds"}.
									</p>
									<button
										type="button"
										onClick={() => navigate("/dashboard", { replace: true })}
										className="mt-6 inline-flex w-fit items-center gap-2 rounded-2xl bg-[var(--bg-card)] px-4 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:opacity-90"
									>
										Go now
										<ArrowRight className="h-4 w-4" />
									</button>
								</div>
							) : (
								<>
									<Outlet />

									<div className="mt-6 border-t border-[color:var(--border)] pt-6 text-sm text-[var(--text-secondary)]">
										{switchLink.label}{" "}
										<Link
											to={switchLink.to}
											className="font-semibold text-[var(--text-primary)] underline underline-offset-4"
										>
											{switchLink.cta}
										</Link>
									</div>
								</>
							)}
						</section>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default Auth;
