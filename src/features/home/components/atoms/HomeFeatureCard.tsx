import type { LucideIcon } from "lucide-react";

type Props = {
	icon: LucideIcon;
	title: string;
	description: string;
	iconClass: string;
};

export function HomeFeatureCard({ icon: Icon, title, description, iconClass }: Props) {
	return (
		<div className="flex flex-col gap-4 rounded-[20px] border border-(--border) bg-(--bg-card) p-6 shadow-sm">
			<div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${iconClass}`}>
				<Icon className="h-4 w-4" />
			</div>
			<div>
				<p className="font-medium text-(--text-primary)">{title}</p>
				<p className="mt-2 text-sm leading-6 text-(--text-secondary)">{description}</p>
			</div>
		</div>
	);
}
