import { Check } from "lucide-react";
import { cn } from "../../../../libs/utils/cn";
import { PRICING_ACTIVE_STYLE } from "../styles/pricingVariants";
import { ColorScheme } from "./PricingCardShell";

type Props = {
	scheme: ColorScheme;
	label: string;
	muted?: boolean;
};

export function PricingActiveStatus({ scheme, label, muted }: Props) {
	const isColored = scheme !== "neutral";
	return (
		<div
			className={cn(
				"flex w-full items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium",
				PRICING_ACTIVE_STYLE[scheme],
				isColored
					? "gap-2"
					: muted
						? "font-normal text-(--text-muted)"
						: "text-(--text-primary)",
			)}
		>
			{isColored && <Check className="h-4 w-4" />}
			{label}
		</div>
	);
}
