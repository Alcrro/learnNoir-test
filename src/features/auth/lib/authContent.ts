import { MoonStar, ShieldCheck, Zap } from "lucide-react";

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
