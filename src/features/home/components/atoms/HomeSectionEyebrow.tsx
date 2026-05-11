import { cn } from "../../../../libs/utils/cn";

type EyebrowVariant = "blue" | "teal" | "muted";

type Props = {
	children: React.ReactNode;
	variant?: EyebrowVariant;
};

export function HomeSectionEyebrow({ children, variant = "blue" }: Props) {
	const cls =
		variant === "teal"
			? "text-(--teal-text)"
			: variant === "muted"
				? "text-(--text-muted)"
				: "text-(--blue-text)";

	return (
		<span className={cn("text-xs font-medium uppercase tracking-[0.18em]", cls)}>
			{children}
		</span>
	);
}
