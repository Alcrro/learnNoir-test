import type { TeacherLessonDTO } from "../../types/teacher.types";
import { LessonCard } from "../molecules/LessonCard";

type Props = {
	lessons: TeacherLessonDTO[];
	onEdit: (lesson: TeacherLessonDTO) => void;
	onDelete: (id: string) => void;
	onReview: (id: string) => void;
	onPublish: (id: string) => void;
	onHistory: (lesson: TeacherLessonDTO) => void;
};

export function LessonList({ lessons, onEdit, onDelete, onReview, onPublish, onHistory }: Props) {
	if (lessons.length === 0) {
		return (
			<div className="rounded-[28px] border border-dashed border-[color:var(--border)] bg-[var(--bg-card)] p-12 text-center">
				<p className="text-sm text-[var(--text-secondary)]">
					No lessons yet. Create your first one.
				</p>
			</div>
		);
	}

	return (
		<div className="grid gap-4 xl:grid-cols-2">
			{lessons.map((lesson) => (
				<LessonCard
					key={lesson.id}
					lesson={lesson}
					onEdit={onEdit}
					onDelete={onDelete}
					onReview={onReview}
					onPublish={onPublish}
					onHistory={onHistory}
				/>
			))}
		</div>
	);
}
