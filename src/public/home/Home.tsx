import DefaultLayout from "../../components/layouts/DefaultLayout";
import { HomeCta } from "../../features/home/components/organisms/HomeCta";
import { HomeFeaturedSubjects } from "../../features/home/components/organisms/HomeFeaturedSubjects";
import { HomeFeatures } from "../../features/home/components/organisms/HomeFeatures";
import { HomeHero } from "../../features/home/components/organisms/HomeHero";
import { HomePlatformStats } from "../../features/home/components/organisms/HomePlatformStats";
import { HomeRoadmap } from "../../features/home/components/organisms/HomeRoadmap";
import { buildHomeStats } from "../../features/home/data/homeStatsMapper";
import { SUBJECT_DOMAINS } from "../../features/subjects/data/subjectsCatalog.data";
import { useSubjectsQuery } from "../../features/subjects/hooks/useSubjectsQuery";
import { buildSubjectsCatalogStats } from "../../features/subjects/lib/buildSubjectsCatalogStats";
import UseGetProfile from "../../features/profiles/hooks/UseGetProfile";

const Home = () => {
	const { isAuthenticated } = UseGetProfile();
	const { data: availableSubjects = [] } = useSubjectsQuery();

	const platformStats = buildHomeStats({
		...buildSubjectsCatalogStats(availableSubjects),
		comingSoonSubjects: SUBJECT_DOMAINS.length,
	});

	return (
		<DefaultLayout>
			<div className="flex flex-col gap-16 py-8 pb-24">
				<HomeHero isAuthenticated={isAuthenticated} />
				<HomePlatformStats stats={platformStats} />
				<HomeFeaturedSubjects subjects={availableSubjects} />
				<HomeRoadmap subjects={SUBJECT_DOMAINS} />
				<HomeFeatures />
				{!isAuthenticated ? <HomeCta /> : null}
			</div>
		</DefaultLayout>
	);
};

export default Home;
