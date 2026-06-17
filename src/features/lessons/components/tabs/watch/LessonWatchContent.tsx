import { useWatchTabState } from "../../../hooks/useWatchTabState";
import { WatchLoadingSkeleton } from "../../atoms/WatchLoadingSkeleton";
import { WatchEmptyState } from "../../organisms/WatchEmptyState";
import { WatchAudioPlayer } from "../../organisms/WatchAudioPlayer";

export function LessonWatchContent() {
	const {
		isLoading, isTeacherOrAdmin, isCreator,
		audio, isPendingGenerate, isGenerateError, handleGenerate,
	} = useWatchTabState();

	const teacherControls = { isTeacherOrAdmin, isPendingGenerate, isCreator, onGenerate: handleGenerate };

	if (isLoading) return <WatchLoadingSkeleton />;

	if (!audio) {
		return (
			<WatchEmptyState
				{...teacherControls}
				isGenerateError={isGenerateError}
			/>
		);
	}

	return <WatchAudioPlayer audio={audio} {...teacherControls} />;
}
