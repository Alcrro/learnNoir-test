import { SubjectOverviewCard } from "../../../subjects/components/organisms/SubjectOverviewCard";
import { HomeSectionHeader } from "../molecules/HomeSectionHeader";
import type { SubjectDomain } from "../../../../types/types";

type Props = {
	subjects: SubjectDomain[];
};

export function HomeFeaturedSubjects({ subjects }: Props) {
	return (
		<section className="flex flex-col gap-6">
			<HomeSectionHeader
				eyebrow="Available now"
				eyebrowVariant="teal"
				heading="Start with an active learning track"
				description="Two subjects are open and ready. Pick one and follow a structured path from basics to advanced topics."
			/>
			<div className="grid gap-4 sm:grid-cols-2">
				{subjects.map((subject) => (
					<SubjectOverviewCard
						key={subject.id}
						subject={subject}
					/>
				))}
			</div>
		</section>
	);
}
