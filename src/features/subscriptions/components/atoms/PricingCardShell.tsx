import { cn } from "../../../../libs/utils/cn";
import { PRICING_SCHEMES, type ColorScheme } from "../styles/pricingVariants";

export type { ColorScheme };

type Props = {
	scheme: ColorScheme;
	badge?: { icon: React.ReactNode; label: string };
	children: React.ReactNode;
	className?: string;
};

export function PricingCardShell({ scheme, badge, children, className }: Props) {
	const s = PRICING_SCHEMES[scheme];

	return (
		<div
			className={cn(
				"relative flex flex-col rounded-2xl border bg-(--bg-secondary) p-7",
				s.card,
				s.shadow,
				className,
			)}
		>
			{badge && (
				<div className="absolute -top-3 left-7">
					<span
						className={cn(
							"inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
							s.badge,
						)}
					>
						{badge.icon}
						{badge.label}
					</span>
				</div>
			)}
			{children}
		</div>
	);
}
