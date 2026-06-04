import { cn } from "../../../../libs/utils/cn";
import { PRICING_LABEL_COLOR, type ColorScheme } from "../styles/pricingVariants";

type Props = {
	scheme: ColorScheme;
	label: string;
	price: number | string;
	currency?: string;
	interval?: string;
	subtitle: string;
};

export function PricingCardHeader({ scheme, label, price, currency, interval, subtitle }: Props) {
	return (
		<div className="mb-6">
			<p className={cn("text-xs font-semibold uppercase tracking-widest", PRICING_LABEL_COLOR[scheme])}>
				{label}
			</p>
			<div className="mt-2 flex items-baseline gap-1">
				{typeof price === "number" ? (
					<>
						<span className="text-4xl font-bold text-(--text-primary)">{price}</span>
						{currency && <span className="text-lg font-medium text-(--text-muted)">{currency}</span>}
						{interval && <span className="text-sm text-(--text-muted)">{interval}</span>}
					</>
				) : (
					<span className="text-3xl font-bold text-(--text-primary)">{price}</span>
				)}
			</div>
			<p className="mt-1 text-sm text-(--text-muted)">{subtitle}</p>
		</div>
	);
}
