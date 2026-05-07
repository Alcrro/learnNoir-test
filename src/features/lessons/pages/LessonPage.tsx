import { useParams } from "react-router-dom";
import LessonPageLayout from "./LessonPageLayout";
import { LessonFeatureTabs } from "../components/LessonFeatureTabs";
import { useLessonBySlugQuery } from "../hooks/useLessonBySlugQuery";
import { useLessonBlocksQuery } from "../hooks/useLessonBlocksQuery";
import { useLessonProgressQuery } from "../hooks/useLessonProgressQuery";
import { useLessonPageQuery } from "../hooks/useLessonPageQuery";
import LessonHeader from "../components/LessonHeader";
import LessonTabContent from "../components/LessonTabContent";
import { resolveAvailableTabs } from "../utils/resolveAvailableTabs";

const LessonPage = () => {
	const { lessonSlug } = useParams<{ lessonSlug: string }>();

	const {
		data: lesson,
		isLoading: loadingLesson,
		isError,
	} = useLessonBySlugQuery(lessonSlug!);
	const { data: blocks = [], isLoading: loadingBlocks } = useLessonBlocksQuery(
		lesson?.id ?? "",
	);
	const { data: progress } = useLessonProgressQuery(lesson?.id ?? "");
	const { tab, setTab } = useLessonPageQuery();

	if (loadingLesson) {
		return (
			<div className="py-4 text-sm text-(--text-muted)">Loading lesson…</div>
		);
	}

	if (isError || !lesson) {
		return (
			<div className="py-4 text-sm text-(--text-muted)">Lesson not found.</div>
		);
	}

	const availableTabs = resolveAvailableTabs(blocks);
	const activeTab = availableTabs.some((t) => t.uniqueId === tab)
		? tab
		: (availableTabs[0]?.uniqueId ?? "theoryTab");

	return (
		<LessonPageLayout
			header={
				<LessonHeader
					title={lesson.title}
					description={lesson.description}
					durationSeconds={lesson.durationSeconds}
					score={progress?.weightedScore}
				/>
			}
			tabs={
				loadingBlocks ? null : (
					<LessonFeatureTabs
						tabs={availableTabs}
						tabHandler={setTab}
					/>
				)
			}
			content={
				loadingBlocks ? (
					<div className="text-sm text-(--text-muted)">Loading content…</div>
				) : (
					<LessonTabContent
						tab={activeTab}
						blocks={blocks}
						lessonSlug={lesson.id}
					/>
				)
			}
		/>
	);
};

export default LessonPage;
