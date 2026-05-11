import type { LucideIcon } from "lucide-react";

type Props = {
	icon: LucideIcon;
	title: string;
	subtitle: string;
	topics: string[];
	iconClass: string;
	topicBadgeClass: string;
};

export function HomeRoadmapCard({
	icon: Icon,
	title,
	subtitle,
	topics,
	iconClass,
	topicBadgeClass,
}: Props) {
	return (
		<div className="flex flex-col gap-4 rounded-[20px] border border-(--border) bg-(--bg-card) p-5">
			<div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${iconClass}`}>
				<Icon className="h-4 w-4" />
			</div>

			<div className="flex-1">
				<div className="flex items-center justify-between gap-2">
					<p className="font-medium text-(--text-primary)">{title}</p>
					<span className="shrink-0 rounded-full border border-(--border) px-2 py-0.5 text-[11px] text-(--text-muted)">
						Soon
					</span>
				</div>
				<p className="mt-1 text-sm text-(--text-secondary)">{subtitle}</p>
			</div>

			<div className="flex flex-wrap gap-1.5">
				{topics.slice(0, 2).map((topic) => (
					<span
						key={topic}
						className={`rounded-full border px-2 py-0.5 text-[11px] ${topicBadgeClass}`}
					>
						{topic}
					</span>
				))}
			</div>
		</div>
	);
}
