import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Trophy } from "lucide-react";
import { cn } from "../../../../../../libs/utils/cn";
import { useQuizSession } from "../hooks/useQuizSession";
import { QuizProgressHeader } from "../molecules/QuizProgressHeader";
import { McqQuestion } from "../molecules/McqQuestion";
import { InputQuestion } from "../molecules/InputQuestion";
import { QuizSummary } from "../molecules/QuizSummary";
import { DifficultyBadge } from "../atoms/DifficultyBadge";
import { DIFFICULTY_WEIGHT } from "../lib/quizTypes";
import { maxPoints, countByDifficulty } from "../lib/quizScoring";
import { useUpsertProgressMutation, useUpsertQuizBlockScoreMutation } from "../../../../hooks/useLessonProgressQuery";
import type { MockQuiz, Difficulty } from "../lib/quizTypes";

const DIFFICULTY_ORDER: Difficulty[] = ["beginner", "intermediate", "expert"];

type Props = {
	quiz: MockQuiz;
	lessonId: string;
	lessonBlockId: string;
	lessonTitle?: string;
	autoStart?: boolean;
	onRestart?: () => void;
};

export function QuizSession({
	quiz,
	lessonId,
	lessonBlockId,
	lessonTitle,
	autoStart,
	onRestart,
}: Props) {
	const session = useQuizSession(quiz);
	const { mutate: upsertProgress } = useUpsertProgressMutation(lessonId);
	const { mutate: upsertBlockScore } = useUpsertQuizBlockScoreMutation(lessonId);
	const startedRef = useRef(false);

	useEffect(() => {
		if (autoStart && !startedRef.current) {
			startedRef.current = true;
			session.start();
		}
		// session.start is stable (useCallback with no deps), safe to omit
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [autoStart]);

	useEffect(() => {
		if (session.phase === "summary") {
			upsertBlockScore({ blockId: lessonBlockId, score: session.score });
			upsertProgress({
				quizScore: session.score,
				status: session.score >= 70 ? "completed" : "in_progress",
			});
		}
	}, [session.phase, session.score, lessonBlockId, upsertBlockScore, upsertProgress]);

	// ── Start screen ──────────────────────────────────────────────────────────
	if (session.phase === "start") {
		const counts = countByDifficulty(quiz.questions);
		const max = maxPoints(quiz.questions);
		const estimatedMin = Math.max(1, Math.ceil(quiz.questions.length * 0.75));

		return (
			<div className="mx-auto flex max-w-md flex-col items-center gap-6 py-8">
				<div className="space-y-1 text-center">
					<p className="text-xs font-medium uppercase tracking-wider text-(--text-muted)">
						Knowledge Check
					</p>
					<h2 className="text-xl font-bold text-(--text-primary)">
						{lessonTitle ?? quiz.title}
					</h2>
				</div>

				<div className="flex items-center gap-5 text-sm text-(--text-muted)">
					<span className="flex items-center gap-1.5">
						<BookOpen className="h-3.5 w-3.5" />
						{quiz.questions.length} questions
					</span>
					<span className="flex items-center gap-1.5">
						<Clock className="h-3.5 w-3.5" />~{estimatedMin} min
					</span>
					<span className="flex items-center gap-1.5">
						<Trophy className="h-3.5 w-3.5" />
						{max} pts max
					</span>
				</div>

				<div className="w-full divide-y divide-(--border) rounded-xl border border-(--border)">
					{DIFFICULTY_ORDER.filter((d) => counts[d] > 0).map((d) => (
						<div
							key={d}
							className="flex items-center justify-between px-4 py-3"
						>
							<div className="flex items-center gap-2">
								<DifficultyBadge difficulty={d} />
								<span className="text-xs text-(--text-muted)">
									×{DIFFICULTY_WEIGHT[d]} pts each
								</span>
							</div>
							<span className="text-xs font-medium text-(--text-secondary)">
								{counts[d]} question{counts[d] !== 1 ? "s" : ""}
							</span>
						</div>
					))}
				</div>

				<button
					onClick={session.start}
					className="w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-500 transition-colors"
				>
					Începe Quiz-ul →
				</button>
			</div>
		);
	}

	// ── Summary screen ────────────────────────────────────────────────────────
	if (session.phase === "summary") {
		return (
			<div className="mx-auto max-w-lg py-4">
				<QuizSummary
					questions={quiz.questions}
					results={session.results}
					score={session.score}
					onRestart={onRestart ?? session.restart}
				/>
			</div>
		);
	}

	// ── Question screen ───────────────────────────────────────────────────────
	const q = session.currentQuestion;
	const result = session.getResult(q.id);
	const isLast = session.currentIndex === session.totalQuestions - 1;
	const canAdvance = result.locked;

	return (
		<div className="mx-auto max-w-2xl space-y-6 py-2">
			<QuizProgressHeader
				currentIndex={session.currentIndex}
				questions={quiz.questions}
				results={session.results}
				score={session.score}
			/>

			<div className="rounded-xl border border-(--border) bg-(--surface) p-5">
				{q.type === "mcq" && (
					<McqQuestion
						question={q}
						result={result}
						onSelect={(i) => session.answerMcq(q.id, i)}
					/>
				)}
				{q.type === "input" && (
					<InputQuestion
						question={q}
						result={result}
						onValueChange={(v) => session.setInputValue(q.id, v)}
						onSubmit={(v) => session.submitInput(q.id, v)}
					/>
				)}
			</div>

			<div className="flex items-center justify-between">
				<button
					onClick={session.goPrev}
					disabled={session.currentIndex === 0}
					className="flex items-center gap-1.5 rounded-lg border border-(--border) px-4 py-2 text-sm text-(--text-secondary) transition hover:border-(--border-strong) disabled:cursor-not-allowed disabled:opacity-40"
				>
					<ArrowLeft className="h-3.5 w-3.5" />
					Înapoi
				</button>

				<button
					onClick={session.goNext}
					disabled={!canAdvance}
					className={cn(
						"flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition",
						canAdvance && isLast
							? "border-blue-600 bg-blue-600 text-white hover:bg-blue-500"
							: canAdvance
								? "border-(--border-strong) text-(--text-primary) hover:bg-(--hover)"
								: "cursor-not-allowed border-(--border) text-(--text-muted) opacity-40",
					)}
				>
					{isLast ? "Vezi Rezultatele" : "Următoarea"}
					<ArrowRight className="h-3.5 w-3.5" />
				</button>
			</div>
		</div>
	);
}
