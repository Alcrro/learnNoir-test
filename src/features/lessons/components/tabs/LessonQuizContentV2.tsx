import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookOpen } from "lucide-react";
import { blocksToQuizList } from "./quiz/lib/quizBlockMapper";
import { QuizListPanel } from "./quiz/organisms/QuizListPanel";
import { QuizPreviewPanel } from "./quiz/organisms/QuizPreviewPanel";
import { QuizRelatedPanel } from "./quiz/organisms/QuizRelatedPanel";
import { QuizSession } from "./quiz/organisms/QuizSession";
import { useLessonBySlugQuery } from "../../hooks/useLessonBySlugQuery";
import { progressApi } from "../../api/progressApi";
import { useGetMe } from "../../../auth/hooks/useAuth";
import type { AssessmentBlock } from "../../api/lessonBlocksApi";

type Props = {
	blocks: AssessmentBlock[];
	lessonSlug: string;
	lessonId: string;
};

export function LessonQuizContentV2({ blocks, lessonSlug, lessonId }: Props) {
	const { data: lesson } = useLessonBySlugQuery(lessonSlug);
	const lessonTitle = lesson?.title;
	const { data: me } = useGetMe();

	const { data: blockScoreRows = [] } = useQuery({
		queryKey: ["quiz-block-scores", lessonId],
		queryFn: () => progressApi.getQuizBlockScores(lessonId),
		enabled: !!lessonId && !!me?.userId,
		staleTime: 30 * 1000,
		retry: false,
	});

	const blockScores = useMemo(
		() => new Map(blockScoreRows.map((s) => [s.lessonBlockId, s.score])),
		[blockScoreRows],
	);

	const quizList = useMemo(
		() => blocksToQuizList(blocks, lessonTitle, blockScores),
		[blocks, lessonTitle, blockScores],
	);

	const firstAvailableId = quizList.find((q) => q.status !== "locked")?.id ?? null;

	const [selectedId, setSelectedId] = useState<string | null>(() => firstAvailableId);
	const [sessionActive, setSessionActive] = useState(false);

	const selectedQuiz = quizList.find((q) => q.id === selectedId) ?? null;

	const handleSelect = (id: string) => {
		if (id !== selectedId) setSessionActive(false);
		setSelectedId(id);
	};

	if (quizList.length === 0) {
		return (
			<div className="flex h-full items-center justify-center">
				<div className="space-y-2 text-center">
					<BookOpen className="mx-auto h-8 w-8 opacity-20 text-(--text-muted)" />
					<p className="text-sm text-(--text-muted)">Niciun quiz disponibil pentru această lecție.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex h-full min-h-0">
			{/* Left — quiz list */}
			<QuizListPanel
				quizzes={quizList}
				selectedId={selectedId}
				onSelect={handleSelect}
			/>

			{/* Center — preview or active quiz */}
			<main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
				{!selectedQuiz ? (
					<div className="flex flex-1 flex-col items-center justify-center gap-2 text-(--text-muted)">
						<BookOpen className="h-8 w-8 opacity-30" />
						<p className="text-sm">Selectează un quiz din stânga</p>
					</div>
				) : sessionActive && selectedQuiz.quiz ? (
					<div className="p-6">
						<QuizSession
							quiz={selectedQuiz.quiz}
							lessonId={lessonId}
							lessonBlockId={selectedQuiz.id}
							lessonTitle={lessonTitle}
							autoStart
							onRestart={() => setSessionActive(false)}
						/>
					</div>
				) : (
					<QuizPreviewPanel
						quiz={selectedQuiz}
						onStart={() => setSessionActive(true)}
					/>
				)}
			</main>

			{/* Right — related lessons & prerequisites */}
			{selectedQuiz && <QuizRelatedPanel quizId={selectedQuiz.id} />}
		</div>
	);
}
