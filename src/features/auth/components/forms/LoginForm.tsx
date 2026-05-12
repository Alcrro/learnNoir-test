import { ArrowRight, LoaderCircle, ShieldCheck } from "lucide-react";
import DefaultButton from "../../../../components/atoms/DefaultButton";
import { FormField } from "../../../../components/molecules/FormField";
import { LOGIN_FORM } from "../../lib/authContent";
import AuthFeedback from "../AuthFeedback";

type Props = {
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
}: Props) => {
	const isModal = variant === "modal";

	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<div className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--bg-secondary) px-3 py-1 text-xs font-medium text-(--text-secondary)">
					<ShieldCheck className="h-3.5 w-3.5 text-(--blue-text)" />
					{LOGIN_FORM.badge}
				</div>

				<h1
					className={
						isModal
							? "text-2xl font-semibold tracking-tight text-(--text-primary)"
							: "text-3xl font-semibold tracking-tight text-(--text-primary) sm:text-4xl"
					}
				>
					{LOGIN_FORM.heading}
				</h1>

				<p className="max-w-xl text-sm leading-6 text-(--text-secondary) sm:text-base">
					{LOGIN_FORM.description}
				</p>
			</div>

			<div className="space-y-3">
				{infoMessage ? (
					<AuthFeedback
						variant="info"
						title={LOGIN_FORM.infoTitle}
						description={infoMessage}
					/>
				) : null}

				{errorMessage ? (
					<AuthFeedback
						variant="error"
						title={LOGIN_FORM.errorTitle}
						description={errorMessage}
					/>
				) : null}

				{typeof successCountdown === "number" ? (
					<AuthFeedback
						variant="success"
						title={LOGIN_FORM.successTitle}
						description={LOGIN_FORM.successDescription(successCountdown)}
					/>
				) : null}
			</div>

			<form
				onSubmit={handleSubmit}
				className="space-y-5"
			>
				<FormField
					id="email"
					label={LOGIN_FORM.emailLabel}
					type="email"
					name="email"
					autoComplete="email"
					defaultValue={defaultEmail}
					placeholder={LOGIN_FORM.emailPlaceholder}
					required
				/>

				<FormField
					id="password"
					label={LOGIN_FORM.passwordLabel}
					type="password"
					name="password"
					autoComplete="current-password"
					placeholder={LOGIN_FORM.passwordPlaceholder}
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
							{LOGIN_FORM.submitPending}
						</>
					) : (
						<>
							{LOGIN_FORM.submitIdle}
							<ArrowRight className="h-4 w-4" />
						</>
					)}
				</DefaultButton>
			</form>

			<div className="rounded-2xl border border-(--border) bg-(--bg-secondary) p-4">
				<p className="text-sm font-medium text-(--text-primary)">
					{LOGIN_FORM.infoPanelTitle}
				</p>
				<p className="mt-2 text-sm leading-6 text-(--text-secondary)">
					{LOGIN_FORM.infoPanelDescription}
				</p>
			</div>
		</div>
	);
};

export default LoginForm;
