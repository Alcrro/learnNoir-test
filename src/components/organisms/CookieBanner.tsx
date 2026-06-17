import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";
import DefaultButton from "../atoms/DefaultButton";

const COOKIE_KEY = "cookie_consent";

type ConsentState = {
	essential: true;
	analytics: boolean;
};

function Toggle({
	checked,
	onChange,
	disabled,
	id,
}: {
	checked: boolean;
	onChange?: (v: boolean) => void;
	disabled?: boolean;
	id: string;
}) {
	return (
		<button
			id={id}
			role="switch"
			aria-checked={checked}
			disabled={disabled}
			onClick={() => onChange?.(!checked)}
			className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--blue) focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
				checked ? "bg-(--blue)" : "bg-(--border-strong)"
			}`}
		>
			<span
				className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
					checked ? "translate-x-4" : "translate-x-0"
				}`}
			/>
		</button>
	);
}

export function CookieBanner() {
	const [visible, setVisible] = useState(false);
	const [analytics, setAnalytics] = useState(true);

	useEffect(() => {
		if (!localStorage.getItem(COOKIE_KEY)) setVisible(true);
	}, []);

	const save = (consent: ConsentState) => {
		localStorage.setItem(COOKIE_KEY, JSON.stringify(consent));
		setVisible(false);
	};

	if (!visible) return null;

	return (
		<div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:w-[360px]">
			<div className="rounded-2xl border border-(--border) bg-(--bg-card) p-5 shadow-2xl">
				<div className="mb-4 flex items-start justify-between gap-3">
					<div className="flex items-center gap-2.5">
						<div className="flex h-8 w-8 items-center justify-center rounded-xl bg-(--bg-secondary)">
							<Cookie className="h-4 w-4 text-(--text-secondary)" />
						</div>
						<p className="font-semibold text-(--text-primary)">Cookie settings</p>
					</div>
					<button
						onClick={() => save({ essential: true, analytics: false })}
						className="rounded-lg p-1 text-(--text-muted) transition hover:bg-(--bg-secondary) hover:text-(--text-primary)"
						aria-label="Close"
					>
						<X className="h-4 w-4" />
					</button>
				</div>

				<p className="mb-4 text-sm leading-5 text-(--text-secondary)">
					We use cookies to keep you signed in and improve your experience.{" "}
					<Link to="/privacy" className="font-medium text-(--text-primary) underline underline-offset-2">
						Privacy Policy
					</Link>
				</p>

				<div className="mb-5 flex flex-col gap-3 rounded-xl border border-(--border) p-3">
					<div className="flex items-center justify-between gap-3">
						<div>
							<p className="text-sm font-medium text-(--text-primary)">Essential</p>
							<p className="text-xs text-(--text-muted)">Authentication &amp; security — always on</p>
						</div>
						<Toggle id="essential" checked={true} disabled />
					</div>

					<div className="h-px bg-(--border)" />

					<div className="flex items-center justify-between gap-3">
						<div>
							<p className="text-sm font-medium text-(--text-primary)">Analytics</p>
							<p className="text-xs text-(--text-muted)">Help us improve the platform</p>
						</div>
						<Toggle
							id="analytics"
							checked={analytics}
							onChange={setAnalytics}
						/>
					</div>
				</div>

				<div className="flex gap-2">
					<DefaultButton
						variant="ghost"
						size="sm"
						className="flex-1"
						onClick={() => save({ essential: true, analytics: false })}
					>
						Essential only
					</DefaultButton>
					<DefaultButton
						size="sm"
						className="flex-1"
						onClick={() => save({ essential: true, analytics })}
					>
						Accept all
					</DefaultButton>
				</div>
			</div>
		</div>
	);
}
