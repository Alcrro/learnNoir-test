import DefaultLayout from "../../components/layouts/DefaultLayout";
import { HomeCta } from "../../features/home/components/organisms/HomeCta";
import { HomeFeaturedSubjects } from "../../features/home/components/organisms/HomeFeaturedSubjects";
import { HomeFeatures } from "../../features/home/components/organisms/HomeFeatures";
import { HomeHero } from "../../features/home/components/organisms/HomeHero";
import { HomePlatformStats } from "../../features/home/components/organisms/HomePlatformStats";
import { HomeRoadmap } from "../../features/home/components/organisms/HomeRoadmap";
import { buildHomeStats } from "../../features/home/data/homeStatsMapper";
import { SUBJECT_DOMAINS } from "../../features/subjects/data/subjectsCatalog.data";
import { buildSubjectsCatalogStats } from "../../features/subjects/lib/buildSubjectsCatalogStats";
import UseGetProfile from "../../features/profiles/hooks/UseGetProfile";

// Derived from static catalog — swap these with API hooks when backend data is ready
const featuredSubjects = SUBJECT_DOMAINS.filter((s) => s.featured);
const comingSoonSubjects = SUBJECT_DOMAINS.filter((s) => s.availability === "coming-soon");
const platformStats = buildHomeStats(buildSubjectsCatalogStats(SUBJECT_DOMAINS));

const Home = () => {
	const { isAuthenticated } = UseGetProfile();

	return (
		<DefaultLayout>
			<div className="flex flex-col gap-16 py-8 pb-24">
				<HomeHero isAuthenticated={isAuthenticated} />
				<HomePlatformStats stats={platformStats} />
				<HomeFeaturedSubjects subjects={featuredSubjects} />
				<HomeRoadmap subjects={comingSoonSubjects} />
				<HomeFeatures />
				{!isAuthenticated ? <HomeCta /> : null}
			</div>
		</DefaultLayout>
	);
};

export default Home;
