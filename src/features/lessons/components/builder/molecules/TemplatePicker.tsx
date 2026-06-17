import { useState } from "react";
import { Sparkles, Loader2, ArrowRight, Check } from "lucide-react";
import { cn } from "../../../../../libs/utils/cn";
import { useIsCreator } from "../../../../subscriptions/hooks/useIsCreator";
import { CreatorPaywallBanner } from "../../../../subscriptions/components/molecules/CreatorPaywallBanner";
import { lessonAIApi } from "../../../api/lessonAIApi";
import { lessonBlocksApi } from "../../../api/lessonBlocksApi";
import { LAYOUT_TEMPLATES } from "../lib/layoutTemplates";
import { NODE_DEFAULTS } from "../lib/nodeDefaults";
import { resolveTemplate } from "../lib/lessonTemplateRegistry";
import type { LayoutTemplate } from "../lib/layoutTemplates";
import type { LessonContentNode } from "@shared/lesson-content";
import type { QuizQuestion } from "../../../types/ai.types";

type Props = {
	lessonTitle?: string;
	lessonDescription?: string;
	lessonId: string;
	blockId: string | null;
	subject?: string;
	category?: string;
	moduleSlug?: string;
	onApply: (nodes: LessonContentNode[]) => void;
};

type Phase = "idle" | "structural" | "quiz" | "saving" | "done" | "error";

const PHASE_LABELS: Record<Phase, string> = {
	idle: "",
	structural: "Generez concepte, pași și complexitate…",
	quiz: "Generez întrebări de verificare…",
	saving: "Salvez conținutul…",
	done: "Gata!",
	error: "",
};

function buildInlineQuiz(q: QuizQuestion): LessonContentNode {
	return {
		type: "inline-quiz",
		question: q.question,
		options: q.options,
		correct: q.correctIndex,
	} as unknown as LessonContentNode;
}

function buildRecall(questions: QuizQuestion[]): LessonContentNode {
	return {
		type: "recall",
		placedAfter: "steps",
		questions: questions.map((q) => ({
			id: `gen-${Math.random().toString(36).slice(2)}`,
			question: q.question,
			options: q.options,
			correctIndex: q.correctIndex,
			explanation: q.explanation,
		})),
	} as unknown as LessonContentNode;
}

export function TemplatePicker({ lessonTitle, lessonDescription, lessonId, blockId, subject = "", category = "", moduleSlug = "", onApply }: Props) {
	const suggestedTemplate = (subject || category || moduleSlug)
		? resolveTemplate(subject, category, moduleSlug)
		: null;

	const [selected, setSelected] = useState<LayoutTemplate | null>(suggestedTemplate);
	const [phase, setPhase] = useState<Phase>("idle");
	const [error, setError] = useState<string | null>(null);
	const isCreator = useIsCreator();

	async function handleGenerate() {
		if (!selected) return;
		setPhase("structural");
		setError(null);

		try {
			// Phase 1 — structural nodes (concept, steps, complexity, theorem etc.)
			const topic = [lessonTitle, lessonDescription].filter(Boolean).join(" — ");
			const aiNodes = (await lessonAIApi.generateBlocks(topic)) as LessonContentNode[];

			// Phase 2 — quiz questions derived from the structural content
			setPhase("quiz");
			const structuralText = aiNodes.map((n) => JSON.stringify(n)).join(" ");
			const quizTopic = lessonTitle
				? `${lessonTitle}: ${structuralText.slice(0, 600)}`
				: structuralText.slice(0, 600);
			let quizQuestions: QuizQuestion[] = [];
			try {
				quizQuestions = await lessonAIApi.generateQuiz(quizTopic, 5);
			} catch {
				// quiz generation is best-effort
			}

			// Build template sequence: fill from AI, then quizzes, then defaults
			const remaining = [...aiNodes];
			const quizPool = [...quizQuestions];

			const result: LessonContentNode[] = selected.nodeTypes.map((type) => {
				if (type === "inline-quiz") {
					const q = quizPool.splice(0, 1)[0];
					return q ? buildInlineQuiz(q) : ({ ...NODE_DEFAULTS["inline-quiz"] } as LessonContentNode);
				}
				if (type === "recall") {
					const qs = quizPool.splice(0, 2);
					return qs.length > 0
						? buildRecall(qs)
						: ({ ...NODE_DEFAULTS["recall"] } as LessonContentNode);
				}
				const idx = remaining.findIndex((n) => (n as Record<string, unknown>).type === type);
				if (idx !== -1) {
					return remaining.splice(idx, 1)[0]!;
				}
				return { ...(NODE_DEFAULTS[type] ?? { type }) } as LessonContentNode;
			});

			// Phase 3 — auto-save so content persists on refresh
			setPhase("saving");
			const payload = result.map(({ ...node }) => node as Record<string, unknown>);
			if (blockId) {
				await lessonBlocksApi.updateContent(blockId, payload);
			} else {
				await lessonBlocksApi.createContentBlock(lessonId, payload);
			}

			setPhase("done");
			onApply(result);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Eroare la generare. Încearcă din nou.");
			setPhase("error");
		}
	}

	function handleEmpty() {
		if (!selected) return;
		const nodes = selected.nodeTypes.map(
			(type) => ({ ...(NODE_DEFAULTS[type] ?? { type }) } as LessonContentNode),
		);
		onApply(nodes);
	}

	const busy = phase === "structural" || phase === "quiz" || phase === "saving";

	return (
		<div className="flex flex-col gap-5">
			<div>
				<h3 className="text-sm font-semibold text-(--text-primary) mb-1">
					Alege un layout de start
					{lessonTitle && (
						<span className="ml-2 font-normal text-(--text-muted)">— {lessonTitle}</span>
					)}
				</h3>
				<p className="text-xs text-(--text-muted)">
					Selectează tipul de lecție. AI-ul va genera conținut specific acestei lecții și va salva automat.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
				{LAYOUT_TEMPLATES.map((tpl) => {
					const isSuggested = suggestedTemplate?.id === tpl.id;
					const isSelected = selected?.id === tpl.id;
					return (
						<button
							key={tpl.id}
							type="button"
							onClick={() => { setSelected(tpl); setError(null); setPhase("idle"); }}
							disabled={busy}
							className={cn(
								"flex flex-col gap-2 rounded-xl border p-4 text-left transition-all disabled:pointer-events-none",
								isSelected
									? "border-(--border-active) bg-(--surface-hover) ring-1 ring-(--border-active)"
									: "border-(--border) bg-(--bg-card) hover:bg-(--surface-hover)",
							)}
						>
							<div className="flex items-center justify-between gap-2">
								<div className="flex items-center gap-2">
									<span className="text-lg leading-none">{tpl.icon}</span>
									<span className="text-sm font-medium text-(--text-primary)">{tpl.name}</span>
								</div>
								{isSuggested && (
									<span className="shrink-0 rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-semibold text-blue-400">
										recomandat
									</span>
								)}
							</div>
							<p className="text-xs text-(--text-muted)">{tpl.description}</p>
							<div className="flex flex-wrap gap-1 mt-1">
								{tpl.nodeTypes
									.filter((v, i, a) => a.indexOf(v) === i)
									.map((type) => (
										<span
											key={type}
											className="rounded-md bg-(--surface) px-1.5 py-0.5 text-[10px] font-mono text-(--text-muted)"
										>
											{type}
										</span>
									))}
							</div>
						</button>
					);
				})}
			</div>

			{error && <p className="text-xs text-red-500">{error}</p>}

			{selected && (
				<div className="flex flex-col gap-3">
					{busy && (
						<div className="flex items-center gap-2 text-xs text-(--text-secondary)">
							<Loader2 size={13} className="animate-spin shrink-0" />
							{PHASE_LABELS[phase]}
						</div>
					)}

					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={isCreator ? handleGenerate : undefined}
							disabled={busy || !isCreator}
							className={cn(
								"flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
								"bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-bg-hover)",
								(busy || !isCreator) && "opacity-60 cursor-not-allowed",
							)}
						>
							{busy ? (
								<Loader2 size={15} className="animate-spin" />
							) : (
								<Sparkles size={15} />
							)}
							Generează cu AI
						</button>
						<button
							type="button"
							onClick={handleEmpty}
							disabled={busy}
							className="flex items-center gap-1.5 rounded-lg border border-(--border) px-4 py-2 text-sm text-(--text-secondary) hover:bg-(--surface-hover) transition-colors disabled:opacity-50"
						>
							<ArrowRight size={14} />
							Structură goală
						</button>
						{phase === "done" && (
							<span className="flex items-center gap-1 text-xs text-green-500">
								<Check size={13} /> Salvat
							</span>
						)}
					</div>
					{!isCreator && (
						<CreatorPaywallBanner feature="Generare AI lecții" />
					)}
				</div>
			)}
		</div>
	);
}
