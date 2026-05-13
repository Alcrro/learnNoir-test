import { Clock, Trophy } from "lucide-react";
import { EditableField } from "./edit/EditableField";
import { useLessonDataStore } from "../store/useLessonDataStore";
import { useLessonEditStore } from "../store/useLessonEditStore";
import { useLessonAIStore } from "../store/useLessonAIStore";

const LessonHeader = () => {
	const lesson = useLessonDataStore((s) => s.lesson);
	const progress = useLessonDataStore((s) => s.progress);
	const isEditing = useLessonEditStore((s) => s.isEditing);
	const editTitle = useLessonEditStore((s) => s.editTitle);
	const editDescription = useLessonEditStore((s) => s.editDescription);
	const setEditTitle = useLessonEditStore((s) => s.setEditTitle);
	const setEditDescription = useLessonEditStore((s) => s.setEditDescription);
	const improveState = useLessonAIStore((s) => s.improveState);
	const handleImproveTitle = useLessonAIStore((s) => s.handleImproveTitle);
	const handleImproveDescription = useLessonAIStore((s) => s.handleImproveDescription);

	if (!lesson) return null;

	const mins = lesson.durationSeconds > 0 ? Math.round(lesson.durationSeconds / 60) : null;

	return (
		<div className="flex flex-col gap-2">
			<EditableField
				fieldKey="title"
				value={isEditing ? editTitle : lesson.title}
				onChange={setEditTitle}
				placeholder="Lesson title"
				isEditing={isEditing}
				aiLoading={improveState["title"]?.loading}
				onAIImprove={handleImproveTitle}
			>
				<h1 className="text-2xl font-semibold capitalize tracking-tight text-(--text-primary)">
					{lesson.title}
				</h1>
			</EditableField>

			<EditableField
				fieldKey="description"
				value={isEditing ? editDescription : (lesson.description ?? "")}
				onChange={setEditDescription}
				multiline
				placeholder="Short lesson description"
				isEditing={isEditing}
				aiLoading={improveState["description"]?.loading}
				onAIImprove={handleImproveDescription}
			>
				{lesson.description && (
					<p className="text-sm text-(--text-secondary) max-w-2xl">{lesson.description}</p>
				)}
			</EditableField>

			{!isEditing && (
				<div className="flex flex-wrap items-center gap-4 text-xs text-(--text-muted)">
					{mins && (
						<div className="flex items-center gap-1">
							<Clock className="h-3.5 w-3.5" />
							<span>~{mins} min</span>
						</div>
					)}
					{progress?.weightedScore !== undefined && (
						<div className="flex items-center gap-1">
							<Trophy className="h-3.5 w-3.5" />
							<span>{progress.weightedScore}% score</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default LessonHeader;
