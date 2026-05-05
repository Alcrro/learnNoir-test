import type { LucideIcon } from "lucide-react";
import { cn } from "../../../../libs/utils/cn";

type Tone = "blue" | "teal" | "amber" | "slate";

const iconStyles: Record<Tone, string> = {
	blue: "bg-[var(--blue-bg)] text-[var(--blue-text)]",
	teal: "bg-[var(--teal-bg)] text-[var(--teal-text)]",
	amber: "bg-[var(--amber-bg)] text-[var(--amber-text)]",
	slate: "bg-[var(--bg-secondary)] text-[var(--text-primary)]",
};

type Props = {
	label: string;
	value: number | string;
	icon: LucideIcon;
	tone?: Tone;
};

export function StatCounter({ label, value, icon: Icon, tone = "blue" }: Props) {
	return (
		<div className="rounded-[28px] border border-[color:var(--border)] bg-[var(--bg-card)] p-5 shadow-sm">
			<div className="flex items-center gap-3">
				<div className={cn("rounded-2xl p-3 shrink-0", iconStyles[tone])}>
					<Icon className="h-5 w-5" />
				</div>
				<div>
					<p className="text-sm font-medium text-[var(--text-secondary)]">{label}</p>
					<p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">{value}</p>
				</div>
			</div>
		</div>
	);
}
