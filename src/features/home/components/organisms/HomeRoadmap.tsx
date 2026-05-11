import { HomeRoadmapCard } from "../atoms/HomeRoadmapCard";
import { HomeSectionHeader } from "../molecules/HomeSectionHeader";
import type { SubjectDomain } from "../../../../types/types";
import { mapSubjectToRoadmapCard } from "../../data/homeRoadmapMapper";

type Props = {
	subjects: SubjectDomain[];
};

export function HomeRoadmap({ subjects }: Props) {
	const cards = subjects.map(mapSubjectToRoadmapCard);

	return (
		<section className="flex flex-col gap-6">
			<HomeSectionHeader
				eyebrow="On the roadmap"
				eyebrowVariant="muted"
				heading="More subjects are coming"
				description="The curriculum is growing. These subjects are planned and will be released as content is finalised."
			/>
			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{cards.map(({ id, ...cardProps }) => (
					<HomeRoadmapCard
						key={id}
						{...cardProps}
					/>
				))}
			</div>
		</section>
	);
}
