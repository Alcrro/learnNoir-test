import { HomeSectionEyebrow } from "../atoms/HomeSectionEyebrow";

type EyebrowVariant = "blue" | "teal" | "muted";

type Props = {
	eyebrow?: string;
	eyebrowVariant?: EyebrowVariant;
	heading: string;
	description?: string;
	align?: "left" | "center";
};

export function HomeSectionHeader({
	eyebrow,
	eyebrowVariant = "blue",
	heading,
	description,
	align = "left",
}: Props) {
	const alignClass = align === "center" ? "items-center text-center" : "";

	return (
		<div className={`flex flex-col gap-2 ${alignClass}`}>
			{eyebrow ? (
				<HomeSectionEyebrow variant={eyebrowVariant}>{eyebrow}</HomeSectionEyebrow>
			) : null}
			<h2 className="text-2xl font-semibold tracking-tight text-(--text-primary) sm:text-3xl">
				{heading}
			</h2>
			{description ? (
				<p className="max-w-xl text-sm leading-6 text-(--text-secondary)">{description}</p>
			) : null}
		</div>
	);
}
