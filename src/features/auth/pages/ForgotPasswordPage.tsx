import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, LoaderCircle, Mail } from "lucide-react";
import DefaultButton from "../../../components/atoms/DefaultButton";
import { FormField } from "../../../components/molecules/FormField";
import AuthFeedback from "../components/AuthFeedback";
import { forgotPasswordApi } from "../api/forgotPassword.api";

const ForgotPasswordPage = () => {
	const [isPending, setIsPending] = useState(false);
	const [sent, setSent] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const email = (form.elements.namedItem("email") as HTMLInputElement).value;

		setIsPending(true);
		setError(null);
		try {
			await forgotPasswordApi.send(email);
			setSent(true);
		} catch {
			setError("Could not send reset email. Please try again.");
		} finally {
			setIsPending(false);
		}
	};

	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<div className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--bg-secondary) px-3 py-1 text-xs font-medium text-(--text-secondary)">
					<Mail className="h-3.5 w-3.5 text-(--blue-text)" />
					Password reset
				</div>
				<h1 className="text-3xl font-semibold tracking-tight text-(--text-primary) sm:text-4xl">
					Forgot your password?
				</h1>
				<p className="max-w-xl text-sm leading-6 text-(--text-secondary) sm:text-base">
					Enter your email and we'll send you a link to reset your password.
				</p>
			</div>

			{sent ? (
				<AuthFeedback
					variant="success"
					title="Check your email"
					description="If an account exists for that email, you'll receive a reset link shortly."
				/>
			) : (
				<>
					{error ? (
						<AuthFeedback variant="error" title="Something went wrong" description={error} />
					) : null}

					<form onSubmit={handleSubmit} className="space-y-5">
						<FormField
							id="email"
							label="Email"
							type="email"
							name="email"
							autoComplete="email"
							placeholder="you@example.com"
							required
						/>
						<DefaultButton
							type="submit"
							disabled={isPending}
							size="lg"
							className="inline-flex w-full items-center justify-center gap-2"
						>
							{isPending ? (
								<>
									<LoaderCircle className="h-4 w-4 animate-spin" />
									Sending…
								</>
							) : (
								"Send reset link"
							)}
						</DefaultButton>
					</form>
				</>
			)}

			<Link
				to="/auth/login"
				className="inline-flex items-center gap-1.5 text-sm text-(--text-secondary) hover:text-(--text-primary)"
			>
				<ArrowLeft className="h-3.5 w-3.5" />
				Back to login
			</Link>
		</div>
	);
};

export default ForgotPasswordPage;
