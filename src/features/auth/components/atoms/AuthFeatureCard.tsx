import type { LucideIcon } from "lucide-react";
import { cn } from "../../../../libs/utils/cn";

type Tone = "blue" | "teal" | "amber";

const iconStyles: Record<Tone, string> = {
	blue: "bg-(--blue-bg) text-(--blue-text)",
	teal: "bg-(--teal-bg) text-(--teal-text)",
	amber: "bg-(--amber-bg) text-(--amber-text)",
};

type Props = {
	icon: LucideIcon;
	tone: Tone;
	title: string;
	description: string;
};

export function AuthFeatureCard({ icon: Icon, tone, title, description }: Props) {
	return (
		<div className="rounded-3xl border border-(--border) bg-(--bg-secondary) p-4">
			<div className={cn("flex h-10 w-10 items-center justify-center rounded-2xl", iconStyles[tone])}>
				<Icon className="h-5 w-5" />
			</div>
			<p className="mt-4 text-sm font-semibold text-(--text-primary)">{title}</p>
			<p className="mt-2 text-sm leading-6 text-(--text-secondary)">{description}</p>
		</div>
	);
}
