import { useLessonContext } from "../context/LessonContext";
import { useLessonAudio } from "./useLessonAudio";
import UseGetProfile from "../../profiles/hooks/UseGetProfile";
import { useIsCreator } from "../../subscriptions/hooks/useIsCreator";

export function useWatchTabState() {
	const { lessonId } = useLessonContext();
	const { query, generate } = useLessonAudio(lessonId);
	const { data: profile } = UseGetProfile();
	const isCreator = useIsCreator();

	const isTeacherOrAdmin = profile?.role === "teacher" || profile?.role === "admin";
	const audio = query.data ?? null;

	function handleGenerate() {
		if (isCreator) generate.mutate();
	}

	return {
		isLoading: query.isLoading,
		isTeacherOrAdmin,
		isCreator,
		audio,
		isPendingGenerate: generate.isPending,
		isGenerateError: generate.isError,
		handleGenerate,
	};
}
