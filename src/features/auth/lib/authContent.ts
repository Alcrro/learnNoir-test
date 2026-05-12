import { MoonStar, ShieldCheck, Zap } from "lucide-react";

export const REGISTER_FORM = {
	badge: "Create your account",
	heading: "Start with a polished setup",
	description:
		"Register once, keep your learning progress synced and move through the app with a clean, consistent auth flow in both light and dark mode.",
	emailLabel: "Email",
	emailPlaceholder: "you@example.com",
	passwordLabel: "Password",
	passwordPlaceholder: "Create a secure password",
	submitIdle: "Create account",
	submitPending: "Creating account...",
	errorTitle: "Registration failed",
	successTitle: "Account created",
	successDescription: (countdown: number) =>
		`Redirecting you to login in ${countdown} ${countdown === 1 ? "second" : "seconds"}.`,
	infoPanelTitle: "Senior-flow touch",
	infoPanelDescription:
		"After registration, the page confirms success, preserves your email for login and redirects with clear timing instead of dropping you into a sudden page change.",
} as const;

export const LOGIN_FORM = {
	badge: "Secure login",
	heading: "Welcome back",
	description:
		"Sign in to continue your progress, keep your dashboard in sync and pick up exactly where you left off on any device.",
	emailLabel: "Email",
	emailPlaceholder: "you@example.com",
	passwordLabel: "Password",
	passwordPlaceholder: "Enter your password",
	submitIdle: "Continue to dashboard",
	submitPending: "Signing you in...",
	infoTitle: "Account ready",
	errorTitle: "Login failed",
	successTitle: "Authenticated successfully",
	successDescription: (countdown: number) =>
		`Redirecting you in ${countdown} ${countdown === 1 ? "second" : "seconds"}.`,
	infoPanelTitle: "What happens next",
	infoPanelDescription:
		"Your session is restored securely, profile data refreshes in the background and the redirect keeps the experience smooth on mobile and desktop.",
} as const;

export const AUTH_INFO = {
	badge: "Consistent auth experience",
	heading: "Your progress, your pace — structured learning that actually sticks.",
	description:
		"LearnNoir tracks where you left off, surfaces what matters next, and keeps the interface out of your way so you can focus on understanding, not navigating.",
} as const;

export const AUTH_FEATURES = [
	{
		icon: ShieldCheck,
		tone: "blue" as const,
		title: "Secure by default",
		description: "Sessions are cookie-based and httpOnly — no tokens exposed to the browser.",
	},
	{
		icon: MoonStar,
		tone: "teal" as const,
		title: "Theme-aware polish",
		description: "Surfaces, borders and contrast stay balanced across both theme modes.",
	},
	{
		icon: Zap,
		tone: "amber" as const,
		title: "Mobile first",
		description: "The form stays first on small screens, without cramped spacing or broken hierarchy.",
	},
] as const;
