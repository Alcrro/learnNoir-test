import { ArrowRight, ShieldCheck } from "lucide-react";

type Props = {
	countdown: number;
	onNavigate: () => void;
};

export function AuthAlreadySignedIn({ countdown, onNavigate }: Props) {
	return (
		<div className="flex h-full flex-col justify-center rounded-[28px] border border-(--teal-border) bg-(--teal-bg) p-6 text-(--teal-text)">
			<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--bg-card)/60">
				<ShieldCheck className="h-6 w-6" />
			</div>
			<h2 className="mt-6 text-2xl font-semibold">You are already authenticated</h2>
			<p className="mt-3 text-sm leading-6 opacity-90 sm:text-base">
				We detected an active session, so there is no reason to keep you on the auth screen.
				Redirecting to your dashboard in {countdown}{" "}
				{countdown === 1 ? "second" : "seconds"}.
			</p>
			<button
				type="button"
				onClick={onNavigate}
				className="mt-6 inline-flex w-fit items-center gap-2 rounded-2xl bg-(--bg-card) px-4 py-3 text-sm font-semibold text-(--text-primary) transition hover:opacity-90"
			>
				Go now
				<ArrowRight className="h-4 w-4" />
			</button>
		</div>
	);
}
