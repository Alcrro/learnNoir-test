import { ArrowRight, LoaderCircle, Sparkles } from "lucide-react";
import DefaultButton from "../../../../components/atoms/DefaultButton";
import { FormField } from "../../../../components/molecules/FormField";
import { REGISTER_FORM } from "../../lib/authContent";
import AuthFeedback from "../AuthFeedback";

type Props = {
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
}: Props) => {
	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<div className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--bg-secondary) px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
					<Sparkles className="h-3.5 w-3.5 text-(--teal-text)" />
					{REGISTER_FORM.badge}
				</div>

				<h1 className="text-3xl font-semibold tracking-tight text-(--text-primary) sm:text-4xl">
					{REGISTER_FORM.heading}
				</h1>

				<p className="max-w-xl text-sm leading-6 text-(--text-secondary) sm:text-base">
					{REGISTER_FORM.description}
				</p>
			</div>

			<div className="space-y-3">
				{errorMessage ? (
					<AuthFeedback
						variant="error"
						title={REGISTER_FORM.errorTitle}
						description={errorMessage}
					/>
				) : null}

				{typeof successCountdown === "number" ? (
					<AuthFeedback
						variant="success"
						title={REGISTER_FORM.successTitle}
						description={REGISTER_FORM.successDescription(successCountdown)}
					/>
				) : null}
			</div>

			<form
				onSubmit={handleSubmit}
				className="space-y-5"
			>
				<FormField
					id="email"
					label={REGISTER_FORM.emailLabel}
					type="email"
					name="email"
					autoComplete="email"
					defaultValue={defaultEmail}
					placeholder={REGISTER_FORM.emailPlaceholder}
					required
				/>

				<FormField
					id="password"
					label={REGISTER_FORM.passwordLabel}
					type="password"
					name="password"
					autoComplete="new-password"
					placeholder={REGISTER_FORM.passwordPlaceholder}
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
							{REGISTER_FORM.submitPending}
						</>
					) : (
						<>
							{REGISTER_FORM.submitIdle}
							<ArrowRight className="h-4 w-4" />
						</>
					)}
				</DefaultButton>
			</form>

			<div className="rounded-2xl border border-(--border) bg-(--bg-secondary) p-4">
				<p className="text-sm font-medium text-(--text-primary)">
					{REGISTER_FORM.infoPanelTitle}
				</p>
				<p className="mt-2 text-sm leading-6 text-(--text-secondary)">
					{REGISTER_FORM.infoPanelDescription}
				</p>
			</div>
		</div>
	);
};

export default RegisterForm;
