import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { KeyRound, LoaderCircle } from "lucide-react";
import DefaultButton from "../../../components/atoms/DefaultButton";
import { FormField } from "../../../components/molecules/FormField";
import AuthFeedback from "../components/AuthFeedback";
import { resetPasswordApi } from "../api/resetPassword.api";

const ResetPasswordPage = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const code = searchParams.get("code");

	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState<string | null>(null);

	if (!code) {
		return (
			<AuthFeedback
				variant="error"
				title="Invalid reset link"
				description="This link is missing required parameters. Request a new one from the forgot password page."
			/>
		);
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const newPassword = (form.elements.namedItem("newPassword") as HTMLInputElement).value;
		const confirm = (form.elements.namedItem("confirm") as HTMLInputElement).value;

		if (newPassword !== confirm) {
			setError("Passwords do not match.");
			return;
		}

		setIsPending(true);
		setError(null);
		try {
			await resetPasswordApi.reset(code, newPassword);
			navigate("/auth/login", { state: { justReset: true } });
		} catch {
			setError("Invalid or expired reset link. Please request a new one.");
		} finally {
			setIsPending(false);
		}
	};

	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<div className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--bg-secondary) px-3 py-1 text-xs font-medium text-(--text-secondary)">
					<KeyRound className="h-3.5 w-3.5 text-(--blue-text)" />
					Set new password
				</div>
				<h1 className="text-3xl font-semibold tracking-tight text-(--text-primary) sm:text-4xl">
					Choose a new password
				</h1>
			</div>

			{error ? (
				<AuthFeedback variant="error" title="Reset failed" description={error} />
			) : null}

			<form onSubmit={handleSubmit} className="space-y-5">
				<FormField
					id="newPassword"
					label="New password"
					type="password"
					name="newPassword"
					autoComplete="new-password"
					placeholder="At least 8 characters"
					required
				/>
				<FormField
					id="confirm"
					label="Confirm password"
					type="password"
					name="confirm"
					autoComplete="new-password"
					placeholder="Repeat your new password"
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
							Saving…
						</>
					) : (
						"Set new password"
					)}
				</DefaultButton>
			</form>
		</div>
	);
};

export default ResetPasswordPage;
