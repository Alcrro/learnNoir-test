import {
	ArrowRight,
	LoaderCircle,
	LockKeyhole,
	Mail,
	Sparkles,
} from "lucide-react";
import AuthFeedback from "../AuthFeedback";

type LoginProps = {
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	isPending: boolean;
	errorMessage?: string | null;
	successCountdown?: number | null;
	defaultEmail?: string;
};

const RegisterForm = ({
	handleSubmit,
	isPending,
	errorMessage,
	successCountdown,
	defaultEmail,
}: LoginProps) => {
	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[var(--bg-secondary)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
					<Sparkles className="h-3.5 w-3.5 text-[var(--teal-text)]" />
					Create your account
				</div>

				<h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
					Start with a polished setup
				</h1>

				<p className="max-w-xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
					Register once, keep your learning progress synced and move through the
					app with a clean, consistent auth flow in both light and dark mode.
				</p>
			</div>

			<div className="space-y-3">
				{errorMessage ? (
					<AuthFeedback
						variant="error"
						title="Registration failed"
						description={errorMessage}
					/>
				) : null}

				{typeof successCountdown === "number" ? (
					<AuthFeedback
						variant="success"
						title="Account created"
						description={`Redirecting you to login in ${successCountdown} ${successCountdown === 1 ? "second" : "seconds"}.`}
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
							autoComplete="new-password"
							placeholder="Create a secure password"
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
							Creating account...
						</>
					) : (
						<>
							Create account
							<ArrowRight className="h-4 w-4" />
						</>
					)}
				</button>
			</form>

			<div className="rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4">
				<p className="text-sm font-medium text-[var(--text-primary)]">
					Senior-flow touch
				</p>
				<p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
					After registration, the page confirms success, preserves your email
					for login and redirects with clear timing instead of dropping you into
					a sudden page change.
				</p>
			</div>
		</div>
	);
};

export default RegisterForm;
