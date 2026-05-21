import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, ChevronLeft } from "lucide-react";
import { cn } from "../../../../../libs/utils/cn";
import { blocksToQuizList } from "./lib/quizBlockMapper";
import { QuizListPanel } from "./organisms/QuizListPanel";
import { QuizPreviewPanel } from "./organisms/QuizPreviewPanel";
import { QuizRelatedPanel } from "./organisms/QuizRelatedPanel";
import { QuizSession } from "./organisms/QuizSession";
import { useLessonBySlugQuery } from "../../../hooks/useLessonBySlugQuery";
import { progressApi } from "../../../api/progressApi";
import { useGetMe } from "../../../../auth/hooks/useAuth";
import type { AssessmentBlock } from "../../../api/lessonBlocksApi";

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
	const [mobilePanel, setMobilePanel] = useState<"list" | "content">("list");

	const selectedQuiz = quizList.find((q) => q.id === selectedId) ?? null;

	const handleSelect = (id: string) => {
		if (id !== selectedId) setSessionActive(false);
		setSelectedId(id);
		setMobilePanel("content");
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
			{/* Left — quiz list: full width on mobile (when active), fixed on md+ */}
			<div
				className={cn(
					"md:flex md:w-[280px] md:shrink-0",
					mobilePanel === "list" ? "flex w-full" : "hidden md:flex",
				)}
			>
				<QuizListPanel
					quizzes={quizList}
					selectedId={selectedId}
					onSelect={handleSelect}
				/>
			</div>

			{/* Center — preview or active quiz */}
			<main
				className={cn(
					"min-w-0 flex-1 flex-col overflow-y-auto",
					mobilePanel === "content" ? "flex" : "hidden md:flex",
				)}
			>
				{/* Back button — mobile only */}
				<button
					onClick={() => setMobilePanel("list")}
					className="flex items-center gap-1 border-b border-(--border) px-4 py-2.5 text-xs text-(--text-secondary) transition-colors hover:text-(--text-primary) md:hidden"
				>
					<ChevronLeft className="h-3.5 w-3.5" />
					Quizuri
				</button>

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

			{/* Right — related lessons & prerequisites: only on lg+ */}
			{selectedQuiz && (
				<div className="hidden lg:flex lg:w-[240px] lg:shrink-0">
					<QuizRelatedPanel quizId={selectedQuiz.id} />
				</div>
			)}
		</div>
	);
}
