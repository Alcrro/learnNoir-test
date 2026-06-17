import type { LucideIcon } from "lucide-react";

type Props = {
	icon: LucideIcon;
	label: string;
};

export function PricingIconLabel({ icon: Icon, label }: Props) {
	return (
		<div className="mb-3 flex items-center justify-center gap-2 text-amber-400">
			<Icon className="h-4 w-4" />
			<span className="text-xs font-semibold uppercase tracking-widest">{label}</span>
		</div>
	);
}
