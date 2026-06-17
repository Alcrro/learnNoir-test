import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function PricingPageTitle({ children }: Props) {
	return (
		<h1 className="text-3xl font-bold text-(--text-primary) sm:text-4xl">{children}</h1>
	);
}
