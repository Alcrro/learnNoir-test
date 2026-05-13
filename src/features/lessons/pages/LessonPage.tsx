import { useParams } from "react-router-dom";
import { formatRelative } from "../../../libs/utils/formatRelative";
import LessonPageLayout from "./LessonPageLayout";
import { LessonFeatureTabs } from "../components/LessonFeatureTabs";
import { useLessonPageController } from "../hooks/useLessonPageController";
import LessonHeader from "../components/LessonHeader";
import LessonTabContent from "../components/LessonTabContent";
import { LessonEditBar } from "../components/edit/LessonEditBar";
import { AIReviewPanel } from "../components/edit/AIReviewPanel";
import PageStatus from "../../../components/atoms/PageStatus";
import { useLessonDataStore } from "../store/useLessonDataStore";
import { useLessonEditStore } from "../store/useLessonEditStore";

const LessonPage = () => {
	const { lessonSlug } = useParams<{ lessonSlug: string }>();
	const { loadingLesson, loadingBlocks, isError } = useLessonPageController(lessonSlug!);

	const lesson = useLessonDataStore((s) => s.lesson);
	const canEdit = useLessonDataStore((s) => s.canEdit);
	const isEditing = useLessonEditStore((s) => s.isEditing);

	if (loadingLesson) return <PageStatus message="Loading lesson…" />;
	if (isError || !lesson) return <PageStatus message="Lesson not found." />;

	return (
		<div className="relative">
			<div className="absolute right-0 top-0 z-10 flex items-center gap-3">
				{lesson.updatedAt && !isEditing && (
					<span className="text-xs text-(--text-muted)">
						Updated {formatRelative(lesson.updatedAt)}
					</span>
				)}
				{canEdit && <LessonEditBar />}
			</div>

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
	);
};

export default LessonPage;
