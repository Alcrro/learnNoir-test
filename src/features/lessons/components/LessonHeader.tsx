import { Clock, Trophy } from "lucide-react";
import { EditableField } from "./edit/EditableField";
import { LessonEditBar } from "./edit/LessonEditBar";
import { useLessonContext } from "../context/LessonContext";
import { useLessonBySlugQuery } from "../hooks/useLessonBySlugQuery";
import { useLessonProgressQuery } from "../hooks/useLessonProgressQuery";
import { useLessonLanguageVariants } from "../hooks/useLessonLanguageVariants";
import { useLessonEditStore } from "../store/useLessonEditStore";
import { useLessonAIStore } from "../store/useLessonAIStore";
import { useGetMe } from "../../auth/hooks/useAuth";
import { useIsCreator } from "../../subscriptions/hooks/useIsCreator";
import { LessonLanguageSwitcher } from "./atoms/LessonLanguageSwitcher";

const SEPARATORS = [" — ", " - ", ": "];

const StyledTitle = ({ title }: { title: string }) => {
	const sep = SEPARATORS.find((s) => title.includes(s));
	if (!sep) {
		return (
			<span className="font-bold text-(--text-primary)">{title}</span>
		);
	}
	const idx = title.indexOf(sep);
	const main = title.slice(0, idx);
	const sub = title.slice(idx + sep.length);
	return (
		<>
			<span className="font-bold text-(--text-primary)">{main}</span>
			<span className="font-medium text-(--text-muted)"> — {sub}</span>
		</>
	);
};

const LessonHeader = () => {
	const { lessonSlug, lessonId, canEdit } = useLessonContext();
	const { data: lesson } = useLessonBySlugQuery(lessonSlug);
	const langVariants = useLessonLanguageVariants(lessonId);
	const { data: progress } = useLessonProgressQuery(lessonId);
	const { data: me } = useGetMe();
	const isAuthenticated = !!me?.userId;
	const isCreator = useIsCreator();
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
				onAIImprove={() => handleImproveTitle(editTitle, `This is a lesson TITLE — keep it under 10 words, max 100 characters. Lesson: ${lesson.title}`)}
				isCreatorRequired={!isCreator}
			>
				<h1 className="text-2xl tracking-tight capitalize">
					{langVariants.hasVariants ? (
						<>
							<span className="font-bold text-(--text-primary)">{langVariants.baseTitle}</span>
							<span className="font-medium text-(--text-muted)"> — </span>
							<LessonLanguageSwitcher
								variants={langVariants.variants}
								currentSlug={lessonSlug}
							/>
						</>
					) : (
						<StyledTitle title={lesson.title} />
					)}
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
				onAIImprove={() =>
					handleImproveDescription(editDescription, `Lesson: ${lesson.title}`)
				}
				isCreatorRequired={!isCreator}
			>
				{lesson.description && (
					<p className="text-sm text-(--text-secondary) max-w-2xl">{lesson.description}</p>
				)}
			</EditableField>

			<div className="flex flex-wrap items-center justify-between gap-4">
				{!isEditing && (
					<div className="flex flex-wrap items-center gap-4 text-xs text-(--text-muted)">
						{mins && (
							<div className="flex items-center gap-1">
								<Clock className="h-3.5 w-3.5" />
								<span>~{mins} min</span>
							</div>
						)}
						{isAuthenticated && (
							<div className="flex items-center gap-2">
								<Trophy className="h-3.5 w-3.5 shrink-0" />
								<div className="flex items-center gap-2">
									<div className="w-24 h-1.5 rounded-full bg-(--border) overflow-hidden">
										<div
											className="h-1.5 rounded-full bg-blue-500 transition-all duration-500"
											style={{ width: `${progress?.weightedScore ?? 0}%` }}
										/>
									</div>
									<span className="tabular-nums">
										{progress?.status === "completed"
											? "Completat"
											: `${progress?.weightedScore ?? 0}%`}
									</span>
								</div>
							</div>
						)}
					</div>
				)}
				{canEdit && <LessonEditBar />}
			</div>
		</div>
	);
};

export default LessonHeader;
