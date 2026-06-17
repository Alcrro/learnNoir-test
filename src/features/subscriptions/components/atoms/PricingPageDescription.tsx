import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function PricingPageDescription({ children }: Props) {
	return (
		<p className="mx-auto mt-3 max-w-xl text-base text-(--text-muted)">{children}</p>
	);
}
