import { useParams } from "react-router-dom";
import { formatRelative } from "../../../libs/utils/formatRelative";
import LessonPageLayout from "./LessonPageLayout";
import { LessonFeatureTabs } from "../components/LessonFeatureTabs";
import { useLessonPageController } from "../hooks/useLessonPageController";
import { LessonEditContext } from "../context/LessonEditContext";
import LessonHeader from "../components/LessonHeader";
import LessonTabContent from "../components/LessonTabContent";
import { LessonEditBar } from "../components/edit/LessonEditBar";
import { AIReviewPanel } from "../components/edit/AIReviewPanel";
import PageStatus from "../../../components/atoms/PageStatus";

const LessonPage = () => {
	const { lessonSlug } = useParams<{ lessonSlug: string }>();

	const {
		lesson,
		loadingLesson,
		isError,
		blocks,
		loadingBlocks,
		progress,
		setTab,
		canEdit,
		edit,
		ai,
		availableTabs,
		activeTab,
		handleImproveTitle,
		handleImproveDescription,
		handleReview,
	} = useLessonPageController(lessonSlug!);

	if (loadingLesson) return <PageStatus message="Loading lesson…" />;
	if (isError || !lesson) return <PageStatus message="Lesson not found." />;

	return (
		<LessonEditContext.Provider value={{ canEdit }}>
			<div className="relative">
				<div className="absolute right-0 top-0 z-10 flex items-center gap-3">
					{lesson.updatedAt && !edit.isEditing && (
						<span className="text-xs text-(--text-muted)">
							Updated {formatRelative(lesson.updatedAt)}
						</span>
					)}
					{canEdit && (
						<LessonEditBar
							isEditing={edit.isEditing}
							isDirty={edit.isDirty}
							isSaving={edit.isSaving}
							onEdit={() => edit.setIsEditing(true)}
							onSave={edit.save}
							onCancel={edit.cancel}
							onReview={handleReview}
							isReviewing={ai.reviewState.loading}
						/>
					)}
				</div>

				<LessonPageLayout
					header={
						<LessonHeader
							title={lesson.title}
							description={lesson.description}
							durationSeconds={lesson.durationSeconds}
							score={progress?.weightedScore}
							isEditing={edit.isEditing}
							editTitle={edit.title}
							editDescription={edit.description}
							onTitleChange={edit.setTitle}
							onDescriptionChange={edit.setDescription}
							aiImprovingTitle={ai.improveState["title"]?.loading}
							aiImprovingDescription={ai.improveState["description"]?.loading}
							onImproveTitle={handleImproveTitle}
							onImproveDescription={handleImproveDescription}
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
							<PageStatus
								message="Loading content…"
								padded={false}
							/>
						) : (
							<LessonTabContent
								tab={activeTab}
								blocks={blocks}
								lessonSlug={lesson.id}
								lessonUpdatedAt={lesson.updatedAt}
							/>
						)
					}
				/>

				{ai.reviewState.data && (
					<AIReviewPanel
						result={ai.reviewState.data}
						onClose={ai.clearReview}
					/>
				)}
			</div>
		</LessonEditContext.Provider>
	);
};

export default LessonPage;
