import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import LessonPageLayout from "./LessonPageLayout";
import { LessonFeatureTabs } from "../components/LessonFeatureTabs";
import { useLessonPageController } from "../hooks/useLessonPageController";
import LessonHeader from "../components/LessonHeader";
import LessonTabContent from "../components/LessonTabContent";
import { AIReviewPanel } from "../components/edit/AIReviewPanel";
import PageStatus from "../../../components/atoms/PageStatus";
import { useLessonPermissions } from "../hooks/useLessonPermissions";
import { useLastLessonStore } from "../../../store/useLastLessonStore";
import LessonContext from "../context/LessonContext";

const LessonPage = () => {
	const { lessonSlug } = useParams<{ lessonSlug: string }>();
	const location = useLocation();
	const { lesson, loadingLesson, loadingBlocks, isError } = useLessonPageController(lessonSlug!);

	const { canEdit } = useLessonPermissions(lesson);
	const saveLesson = useLastLessonStore((s) => s.save);

	useEffect(() => {
		if (lesson?.title) {
			saveLesson({ href: location.pathname, title: lesson.title });
		}
	}, [lesson?.title, location.pathname, saveLesson]);

	if (loadingLesson) return <PageStatus message="Loading lesson…" />;
	if (isError || !lesson) return <PageStatus message="Lesson not found." />;

	return (
		<LessonContext.Provider value={{ lessonSlug: lessonSlug!, lessonId: lesson.id, canEdit }}>
			<div className="relative">
				<LessonPageLayout
					header={<LessonHeader />}
					tabs={loadingBlocks ? null : <LessonFeatureTabs />}
					content={
						loadingBlocks ? (
							<PageStatus message="Loading content…" padded={false} />
						) : (
							<LessonTabContent />
						)
					}
				/>

				<AIReviewPanel />
			</div>
		</LessonContext.Provider>
	);
};

export default LessonPage;
