import type { LucideIcon } from "lucide-react";

type Props = {
	label: string;
	value: string;
	icon: LucideIcon;
};

export function HomeStatCard({ label, value, icon: Icon }: Props) {
	return (
		<div className="flex flex-col items-center gap-3 rounded-[20px] border border-(--border) bg-(--bg-card) p-5 text-center shadow-sm">
			<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-(--blue-bg) text-(--blue-text)">
				<Icon className="h-4 w-4" />
			</div>
			<div>
				<p className="text-2xl font-semibold text-(--text-primary)">{value}</p>
				<p className="mt-0.5 text-xs uppercase tracking-[0.16em] text-(--text-muted)">{label}</p>
			</div>
		</div>
	);
}
