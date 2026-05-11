import {
	FeatureItem,
	HOME_FEATURES,
} from "../../../../content/homeFeatures.constants";
import { HomeFeatureCard } from "../atoms/HomeFeatureCard";
import { HomeSectionHeader } from "../molecules/HomeSectionHeader";

type Props = {
	features?: FeatureItem[];
};

export function HomeFeatures({ features = HOME_FEATURES }: Props) {
	return (
		<section className="flex flex-col gap-8">
			<HomeSectionHeader
				eyebrow="Why LearnNoir"
				eyebrowVariant="blue"
				heading="Built for real understanding"
				description="Not just another video course. LearnNoir is an interactive system where understanding is built through doing, not watching."
				align="center"
			/>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{features.map((feature) => (
					<HomeFeatureCard
						key={feature.title}
						icon={feature.icon}
						title={feature.title}
						description={feature.description}
						iconClass={feature.iconClass}
					/>
				))}
			</div>
		</section>
	);
}
