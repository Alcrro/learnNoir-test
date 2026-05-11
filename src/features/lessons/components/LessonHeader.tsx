import { Clock, Trophy } from "lucide-react";
import { EditableField } from "./edit/EditableField";

type Props = {
	title: string;
	description: string | null;
	durationSeconds: number;
	score: number | undefined;
	// edit mode
	isEditing?: boolean;
	editTitle?: string;
	editDescription?: string;
	onTitleChange?: (v: string) => void;
	onDescriptionChange?: (v: string) => void;
	aiImprovingTitle?: boolean;
	aiImprovingDescription?: boolean;
	onImproveTitle?: () => void;
	onImproveDescription?: () => void;
};

const LessonHeader = ({
	title,
	description,
	durationSeconds,
	score,
	isEditing = false,
	editTitle,
	editDescription,
	onTitleChange,
	onDescriptionChange,
	aiImprovingTitle,
	aiImprovingDescription,
	onImproveTitle,
	onImproveDescription,
}: Props) => {
	const mins = durationSeconds > 0 ? Math.round(durationSeconds / 60) : null;

	return (
		<div className="flex flex-col gap-2">
			<EditableField
				fieldKey="title"
				value={editTitle ?? title}
				onChange={onTitleChange ?? (() => {})}
				placeholder="Lesson title"
				isEditing={isEditing}
				aiLoading={aiImprovingTitle}
				onAIImprove={onImproveTitle}
			>
				<h1 className="text-2xl font-semibold capitalize tracking-tight text-(--text-primary)">
					{title}
				</h1>
			</EditableField>

			<EditableField
				fieldKey="description"
				value={editDescription ?? description ?? ""}
				onChange={onDescriptionChange ?? (() => {})}
				multiline
				placeholder="Short lesson description"
				isEditing={isEditing}
				aiLoading={aiImprovingDescription}
				onAIImprove={onImproveDescription}
			>
				{description && (
					<p className="text-sm text-(--text-secondary) max-w-2xl">{description}</p>
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
					{score !== undefined && (
						<div className="flex items-center gap-1">
							<Trophy className="h-3.5 w-3.5" />
							<span>{score}% score</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default LessonHeader;
