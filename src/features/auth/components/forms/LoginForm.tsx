import {
	ArrowRight,
	LoaderCircle,
	LockKeyhole,
	Mail,
	ShieldCheck,
} from "lucide-react";
import AuthFeedback from "../AuthFeedback";

type LoginProps = {
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	isPending: boolean;
	errorMessage?: string | null;
	infoMessage?: string | null;
	successCountdown?: number | null;
	defaultEmail?: string;
	variant?: "page" | "modal";
};

const LoginForm = ({
	handleSubmit,
	isPending,
	errorMessage,
	infoMessage,
	successCountdown,
	defaultEmail,
	variant = "page",
}: LoginProps) => {
	const isModal = variant === "modal";

	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[var(--bg-secondary)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
					<ShieldCheck className="h-3.5 w-3.5 text-[var(--blue-text)]" />
					Secure login
				</div>

				<h1
					className={
						isModal
							? "text-2xl font-semibold tracking-tight text-[var(--text-primary)]"
							: "text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl"
					}
				>
					Welcome back
				</h1>

				<p className="max-w-xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
					Sign in to continue your progress, keep your dashboard in sync and
					pick up exactly where you left off on any device.
				</p>
			</div>

			<div className="space-y-3">
				{infoMessage ? (
					<AuthFeedback
						variant="info"
						title="Account ready"
						description={infoMessage}
					/>
				) : null}

				{errorMessage ? (
					<AuthFeedback
						variant="error"
						title="Login failed"
						description={errorMessage}
					/>
				) : null}

				{typeof successCountdown === "number" ? (
					<AuthFeedback
						variant="success"
						title="Authenticated successfully"
						description={`Redirecting you in ${successCountdown} ${successCountdown === 1 ? "second" : "seconds"}.`}
					/>
				) : null}
			</div>

			<form
				onSubmit={handleSubmit}
				className="space-y-5"
			>
				<div className="space-y-2">
					<label
						htmlFor="email"
						className="text-sm font-medium text-[var(--text-primary)]"
					>
						Email
					</label>

					<div className="relative">
						<Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
						<input
							id="email"
							type="email"
							name="email"
							autoComplete="email"
							defaultValue={defaultEmail}
							placeholder="you@example.com"
							className="h-[3.25rem] w-full rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] pl-11 pr-4 text-sm text-[var(--text-primary)] outline-none transition focus:border-[color:var(--blue-border)] focus:bg-[var(--bg-card)] focus:ring-4 focus:ring-[var(--blue-bg)]"
							required
						/>
					</div>
				</div>

				<div className="space-y-2">
					<label
						htmlFor="password"
						className="text-sm font-medium text-[var(--text-primary)]"
					>
						Password
					</label>

					<div className="relative">
						<LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
						<input
							id="password"
							type="password"
							name="password"
							autoComplete="current-password"
							placeholder="Enter your password"
							className="h-[3.25rem] w-full rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] pl-11 pr-4 text-sm text-[var(--text-primary)] outline-none transition focus:border-[color:var(--blue-border)] focus:bg-[var(--bg-card)] focus:ring-4 focus:ring-[var(--blue-bg)]"
							required
						/>
					</div>
				</div>

				<button
					type="submit"
					disabled={isPending}
					className="inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-2xl bg-[var(--blue-bg)] px-4 py-3 text-sm font-semibold text-[var(--blue-text)] shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
				>
					{isPending ? (
						<>
							<LoaderCircle className="h-4 w-4 animate-spin" />
							Signing you in...
						</>
					) : (
						<>
							Continue to dashboard
							<ArrowRight className="h-4 w-4" />
						</>
					)}
				</button>
			</form>

			<div className="rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4">
				<p className="text-sm font-medium text-[var(--text-primary)]">
					What happens next
				</p>
				<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
					Your session is restored securely, profile data refreshes in the
					background and the redirect keeps the experience smooth on mobile and
					desktop.
				</p>
			</div>
		</div>
	);
};

export default LoginForm;
