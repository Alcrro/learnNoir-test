import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { blocksToQuizList } from "../lib/quizBlockMapper";
import { useLessonBySlugQuery } from "../../../../hooks/useLessonBySlugQuery";
import { progressApi } from "../../../../api/progressApi";
import { useGetMe } from "../../../../../auth/hooks/useAuth";
import { lessonQueryKeys } from "../../../../lib/lessonQueryKeys";
import { useLessonTabContext } from "../../../../context/LessonTabContext";
import { useLessonTranslationStore } from "../../../../store/useLessonTranslationStore";
import { useLessonTranslationQuery } from "../../../../hooks/useLessonTranslationQuery";
import type { TranslatedBlockPayload } from "@shared/lesson-translation";

export function useQuizContent() {
	const { assessmentBlocks: blocks, lessonSlug, lessonId } = useLessonTabContext();
	const { data: lesson } = useLessonBySlugQuery(lessonSlug);
	const lessonTitle = lesson?.title;
	const { data: me } = useGetMe();

	const { data: blockScoreRows = [] } = useQuery({
		queryKey: lessonQueryKeys.quizBlockScores(lessonId),
		queryFn: () => progressApi.getQuizBlockScores(lessonId),
		enabled: !!lessonId && !!me?.userId,
		staleTime: 30 * 1000,
		retry: false,
	});

	const blockScores = useMemo(
		() => new Map(blockScoreRows.map((s) => [s.lessonBlockId, s.score])),
		[blockScoreRows],
	);

	const activeLang = useLessonTranslationStore((s) => s.getLang(lessonId));
	const { data: translation } = useLessonTranslationQuery(lessonId, activeLang);

	const translatedBlocksMap = useMemo<Map<string, TranslatedBlockPayload>>(() => {
		if (!translation) return new Map();
		return new Map(translation.blocks.map((b) => [b.blockId, b]));
	}, [translation]);

	const quizList = useMemo(
		() => blocksToQuizList(blocks, lessonTitle, blockScores, translatedBlocksMap),
		[blocks, lessonTitle, blockScores, translatedBlocksMap],
	);

	const firstAvailableId = quizList.find((q) => q.status !== "locked")?.id ?? null;

	const [selectedId, setSelectedId] = useState<string | null>(() => firstAvailableId);
	const [sessionActive, setSessionActive] = useState(false);
	const [mobilePanel, setMobilePanel] = useState<"list" | "content">("list");

	const selectedQuiz = quizList.find((q) => q.id === selectedId) ?? null;

	const handleSelect = (id: string) => {
		if (id !== selectedId) setSessionActive(false);
		setSelectedId(id);
		setMobilePanel("content");
	};

	return {
		lessonId,
		lessonTitle,
		quizList,
		selectedId,
		selectedQuiz,
		sessionActive,
		setSessionActive,
		mobilePanel,
		setMobilePanel,
		handleSelect,
	};
}
