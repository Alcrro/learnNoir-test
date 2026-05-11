import { Plus } from "lucide-react";
import { DashboardPanel, DashboardSectionHeading } from "../components/DashboardUI";
import { LessonStatsBar } from "../components/organisms/LessonStatsBar";
import { LessonList } from "../components/organisms/LessonList";
import { LessonFormModal } from "../components/molecules/LessonFormModal";
import { LessonHistoryDrawer } from "../components/molecules/LessonHistoryDrawer";
import { useLessonsPageController } from "../hooks/useLessonsPageController";
import PageStatus from "../../../components/atoms/PageStatus";
import DefaultButton from "../../../components/atoms/DefaultButton";

export default function LessonsPage() {
	const {
		lessons,
		isLoading,
		modalOpen,
		editing,
		historyLesson,
		setHistoryLesson,
		openCreate,
		openEdit,
		closeModal,
		handleSave,
		handleDelete,
		onReview,
		onPublish,
		isSaving,
	} = useLessonsPageController();

	if (isLoading) return <PageStatus message="Loading lessons…" centered />;

	return (
		<div className="space-y-4">
			<DashboardPanel>
				<DashboardSectionHeading
					eyebrow="Lessons"
					title="Build, review and deliver lessons"
					description="Manage all your lessons in one place — create drafts, send them for review, and publish when ready."
					action={
						<DefaultButton
							onClick={openCreate}
							className="inline-flex items-center gap-2 rounded-2xl text-sm font-semibold"
						>
							<Plus className="h-4 w-4" />
							New lesson
						</DefaultButton>
					}
				/>
			</DashboardPanel>

			<LessonStatsBar lessons={lessons} />

			<LessonList
				lessons={lessons}
				onEdit={openEdit}
				onDelete={handleDelete}
				onReview={onReview}
				onPublish={onPublish}
				onHistory={(lesson) => setHistoryLesson(lesson)}
			/>

			{modalOpen && (
				<LessonFormModal
					lesson={editing ?? undefined}
					onClose={closeModal}
					onSave={handleSave}
					isLoading={isSaving}
				/>
			)}

			{historyLesson && (
				<LessonHistoryDrawer
					lessonId={historyLesson.id}
					lessonTitle={historyLesson.title}
					onClose={() => setHistoryLesson(null)}
				/>
			)}
		</div>
	);
}
