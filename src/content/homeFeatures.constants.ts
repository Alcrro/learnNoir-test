import { Binary, BookOpen, LayoutDashboard, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type FeatureItem = {
	icon: LucideIcon;
	title: string;
	description: string;
	iconClass: string;
};

export const HOME_FEATURES: FeatureItem[] = [
	{
		icon: Binary,
		title: "Step-by-step visualizations",
		description:
			"Watch algorithms execute in real time. Pause, rewind and inspect every comparison and swap as it happens.",
		iconClass: "bg-(--blue-bg) text-(--blue-text)",
	},
	{
		icon: Zap,
		title: "Instant interactive feedback",
		description:
			"Quiz questions and drag-and-drop interactions give you feedback before moving to the next concept.",
		iconClass: "bg-(--teal-bg) text-(--teal-text)",
	},
	{
		icon: BookOpen,
		title: "Structured curriculum",
		description:
			"Topics build on each other. Start from first principles and progress through difficulty levels at your pace.",
		iconClass: "bg-(--blue-bg) text-(--blue-text)",
	},
	{
		icon: LayoutDashboard,
		title: "Personal dashboard",
		description:
			"Track completed lessons, quiz scores and active modules in one place. Pick up exactly where you left off.",
		iconClass: "bg-(--amber-bg) text-(--amber-text)",
	},
];
