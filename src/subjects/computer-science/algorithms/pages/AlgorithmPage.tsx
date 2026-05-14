import { useMatches, useParams } from "react-router-dom";
import AlgorithmTitle from "../components/AlgorithmTitle";
import AlgorithmLessonMeta from "../components/lesson/AlgorithmLessonMeta";
import AlgorithmFeatureTabs from "../components/lesson/AlgorithmFeatureTabs";
import { algorithmTabsMapper } from "../data/algorithmTabsMapper";
import { useAlgorithmPageQuery } from "../hooks/useAlgorithPageQuery";
import AlgorithPageLayout from "./AlgorithPageLayout";
import { Subject } from "../../../../types/interactionTypes";
import { getTabsForSubject } from "../hooks/useSubjetFeatMapper";

const AlgorithmPage = () => {
	const { lessonId } = useParams<{
		lessonId: string;
	}>();

	const matches = useMatches();

	const handle = matches.map((m) => m.handle).find(Boolean) as
		| { subject?: Subject }
		| undefined;

	// găsești cel mai apropiat route cu subject
	const subject = handle?.subject;

	const { tab, setTab } = useAlgorithmPageQuery();
	if (!subject || !lessonId) return <>not found</>;

	const validTabs = getTabsForSubject(subject);

	return (
		<>
			<AlgorithPageLayout
				header={
					<div className="header w-full flex flex-col gap-2">
						<AlgorithmTitle lessonName={lessonId} />
						<AlgorithmLessonMeta />
					</div>
				}
				tabs={
					<AlgorithmFeatureTabs
						tabs={validTabs}
						tabHandler={setTab}
					/>
				}
				content={algorithmTabsMapper[tab]}
			/>
		</>
	);
};

export default AlgorithmPage;
