import { useState } from "react";
import { Sparkles, Loader2, Save, Pencil, X, Star, Clock } from "lucide-react";
import { formatRelative } from "../../../../../libs/utils/formatRelative";
import { useLessonTheoryModel } from "../../hooks/useLessonTheoryModel";
import { useLessonReadProgress } from "../../hooks/useLessonReadProgress";
import { useAlgorithmLessonOverrides } from "../../hooks/useAlgorithmLessonOverrides";
import { useLessonContext } from "../../../../../features/lessons/context/LessonContext";
import { useLessonProgressQuery } from "../../../../../features/lessons/hooks/useLessonProgressQuery";
import useAuth from "../../../../../hooks/useAuth";
import { getThinkPrompts } from "../../lib/getThinkPrompts";
import { lessonAIApi } from "../../../../../features/lessons/api/lessonAIApi";
import "./lessonTheory.css";

import { ConceptReveal } from "./theory-v1/ConceptReveal";
import { ThinkPrompt } from "./theory-v1/ThinkPrompt";
import { StepsReveal } from "./theory-v1/StepsReveal";
import { ComplexityPanel } from "./theory-v1/ComplexityPanel";
import { WhenToUsePanel } from "./theory-v1/WhenToUsePanel";
import { MisconceptionReveal } from "./theory-v1/MisconceptionReveal";

import { PrerequisitesCard } from "./theory/sidebar/PrerequisitesCard";
import { RelatedLessonsCard } from "./theory/sidebar/RelatedLessonsCard";
import { MemoryTipCard } from "./theory/sidebar/MemoryTipCard";
import { NextLessonCard } from "./theory/sidebar/NextLessonCard";

// ── per-field AI improve ─────────────────────────────────────────────────────

function useFieldImprove() {
	const [loading, setLoading] = useState(false);
	const run = async (text: string, context?: string): Promise<string | null> => {
		setLoading(true);
		try {
			return await lessonAIApi.improve(text, context);
		} catch {
			return null;
		} finally {
			setLoading(false);
		}
	};
	return { run, loading };
}

// ── edit panel: Central idea ─────────────────────────────────────────────────

function ConceptEditPanel({
	initialKeyIdea,
	initialAnalogy,
	onSave,
	onCancel,
}: {
	initialKeyIdea: string;
	initialAnalogy: string;
	onSave: (keyIdea: string, analogy: string) => void;
	onCancel: () => void;
}) {
	const [keyIdea, setKeyIdea] = useState(initialKeyIdea);
	const [analogy, setAnalogy] = useState(initialAnalogy);
	const ki = useFieldImprove();
	const an = useFieldImprove();

	return (
		<div className="flex flex-col gap-4">
			<Field
				label="Key idea"
				value={keyIdea}
				onChange={setKeyIdea}
				onImprove={async () => { const r = await ki.run(keyIdea); if (r) setKeyIdea(r); }}
				improving={ki.loading}
			/>
			<Field
				label="Analogy"
				value={analogy}
				onChange={setAnalogy}
				multiline
				onImprove={async () => { const r = await an.run(analogy, `Key idea: ${keyIdea}`); if (r) setAnalogy(r); }}
				improving={an.loading}
			/>
			<PanelActions onSave={() => onSave(keyIdea, analogy)} onCancel={onCancel} />
		</div>
	);
}

// ── edit panel: Complexity explainer ─────────────────────────────────────────

function ComplexityEditPanel({
	initialExplainer,
	onSave,
	onCancel,
}: {
	initialExplainer: string;
	onSave: (explainer: string) => void;
	onCancel: () => void;
}) {
	const [explainer, setExplainer] = useState(initialExplainer);
	const ai = useFieldImprove();

	return (
		<div className="flex flex-col gap-4">
			<Field
				label="Why this complexity?"
				value={explainer}
				onChange={setExplainer}
				multiline
				onImprove={async () => { const r = await ai.run(explainer); if (r) setExplainer(r); }}
				improving={ai.loading}
			/>
			<PanelActions onSave={() => onSave(explainer)} onCancel={onCancel} />
		</div>
	);
}

// ── edit panel: When to use ───────────────────────────────────────────────────

function WhenToUseEditPanel({
	initialWhenGood,
	initialWhenAvoid,
	onSave,
	onCancel,
}: {
	initialWhenGood: string[];
	initialWhenAvoid: string[];
	onSave: (good: string[], avoid: string[]) => void;
	onCancel: () => void;
}) {
	const [whenGood, setWhenGood] = useState(initialWhenGood.join("\n"));
	const [whenAvoid, setWhenAvoid] = useState(initialWhenAvoid.join("\n"));
	const g = useFieldImprove();
	const a = useFieldImprove();

	const split = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);

	return (
		<div className="flex flex-col gap-4">
			<Field
				label="Good fit (one per line)"
				value={whenGood}
				onChange={setWhenGood}
				multiline
				onImprove={async () => { const r = await g.run(whenGood, "good fit cases"); if (r) setWhenGood(r); }}
				improving={g.loading}
			/>
			<Field
				label="Avoid when (one per line)"
				value={whenAvoid}
				onChange={setWhenAvoid}
				multiline
				onImprove={async () => { const r = await a.run(whenAvoid, "avoid cases"); if (r) setWhenAvoid(r); }}
				improving={a.loading}
			/>
			<PanelActions onSave={() => onSave(split(whenGood), split(whenAvoid))} onCancel={onCancel} />
		</div>
	);
}

// ── edit panel: Think prompt ──────────────────────────────────────────────────

function ThinkPromptEditPanel({
	initialQuestion,
	onSave,
	onCancel,
}: {
	initialQuestion: string;
	onSave: (question: string) => void;
	onCancel: () => void;
}) {
	const [question, setQuestion] = useState(initialQuestion);
	const ai = useFieldImprove();

	return (
		<div className="flex flex-col gap-4">
			<Field
				label="Prompt question"
				value={question}
				onChange={setQuestion}
				multiline
				onImprove={async () => { const r = await ai.run(question, "think prompt for a lesson"); if (r) setQuestion(r); }}
				improving={ai.loading}
			/>
			<PanelActions onSave={() => onSave(question)} onCancel={onCancel} />
		</div>
	);
}

// ── shared primitives ─────────────────────────────────────────────────────────

function Field({
	label,
	value,
	onChange,
	multiline = false,
	onImprove,
	improving,
}: {
	label: string;
	value: string;
	onChange: (v: string) => void;
	multiline?: boolean;
	onImprove: () => void;
	improving: boolean;
}) {
	return (
		<div className="flex flex-col gap-1.5">
			<span className="text-xs font-medium text-(--text-muted) uppercase tracking-wide">{label}</span>
			{multiline ? (
				<textarea
					value={value}
					onChange={(e) => onChange(e.target.value)}
					rows={3}
					className="w-full resize-none rounded-lg border border-(--border) bg-(--bg-base) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--accent) transition-colors"
				/>
			) : (
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className="w-full rounded-lg border border-(--border) bg-(--bg-base) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--accent) transition-colors"
				/>
			)}
			<button
				type="button"
				onClick={onImprove}
				disabled={improving || !value.trim()}
				className="self-start flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-(--text-muted) hover:text-(--accent) hover:bg-(--accent-subtle) transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
			>
				{improving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
				{improving ? "Improving…" : "Improve with AI"}
			</button>
		</div>
	);
}

function PanelActions({ onSave, onCancel }: { onSave: () => void; onCancel: () => void }) {
	return (
		<div className="flex items-center gap-2 border-t border-(--border) pt-3">
			<button
				type="button"
				onClick={onSave}
				className="flex items-center gap-1.5 rounded-lg bg-(--accent) px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity"
			>
				<Save className="h-3.5 w-3.5" />
				Save
			</button>
			<button
				type="button"
				onClick={onCancel}
				className="rounded-lg border border-(--border) px-3 py-1.5 text-xs font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors"
			>
				Cancel
			</button>
		</div>
	);
}

// ── inline edit button ────────────────────────────────────────────────────────

function EditBtn({ open, onOpen, onClose }: { open: boolean; onOpen: () => void; onClose: () => void }) {
	if (open) {
		return (
			<button
				type="button"
				onClick={onClose}
				className="ml-auto flex items-center gap-1 rounded-md px-2 py-0.5 text-xs text-(--text-muted) hover:text-(--text-primary) transition-colors"
			>
				<X className="h-3 w-3" />
				Close
			</button>
		);
	}
	return (
		<button
			type="button"
			onClick={onOpen}
			className="ml-auto flex items-center gap-1 rounded-md px-2 py-0.5 text-xs text-(--text-muted) hover:text-(--accent) hover:bg-(--accent-subtle) transition-all"
		>
			<Pencil className="h-3 w-3" />
			Edit
		</button>
	);
}

// ── edit panel container ──────────────────────────────────────────────────────

function EditPanel({ children }: { children: React.ReactNode }) {
	return (
		<div className="mt-3 rounded-xl border border-(--accent) border-dashed bg-(--bg-surface) p-4">
			{children}
		</div>
	);
}

// ── main component ────────────────────────────────────────────────────────────

// ── footer ────────────────────────────────────────────────────────────────────

function TheoryFooter({ updatedAt }: { updatedAt?: string }) {
	return (
		<div className="mt-10 border-t border-(--border) pt-6 flex flex-col gap-6">
			{updatedAt && (
				<div className="flex items-center gap-1.5 text-xs text-(--text-muted)">
					<Clock className="h-3.5 w-3.5" />
					Last updated {formatRelative(updatedAt)}
				</div>
			)}

			<div>
				<div className="flex items-center gap-2 mb-3">
					<Star className="h-4 w-4 text-(--text-muted)" />
					<span className="text-sm font-medium text-(--text-primary)">Student reviews</span>
				</div>
				<div className="rounded-xl border border-(--border) bg-(--bg-surface) p-4 text-sm text-(--text-muted) text-center">
					Reviews coming soon — students will be able to rate and leave feedback here.
				</div>
			</div>
		</div>
	);
}

// ── main ──────────────────────────────────────────────────────────────────────

type Section = "concept" | "stepsPrompt" | "complexity" | "whenToUse" | "miscPrompt";

const AlgorithmLessonTheoryV1 = ({ lessonId: dbLessonId = "", updatedAt }: { lessonId?: string; updatedAt?: string }) => {
	const { model, lessonId, lessonSlug } = useLessonTheoryModel();
	const { user } = useAuth();
	const isAuthenticated = !!user;
	const { stepsRevealed, setStepsRevealed, setMiscRevealed, confidence, setConfidence } =
		useLessonReadProgress(dbLessonId, model, isAuthenticated);
	const { overrides, save } = useAlgorithmLessonOverrides(dbLessonId);
	const { canEdit } = useLessonContext();
	const { data: progress } = useLessonProgressQuery(isAuthenticated ? dbLessonId : "");
	const canFeedback = isAuthenticated && (progress?.weightedScore ?? 0) > 0;
	const [editing, setEditing] = useState<Section | null>(null);

	if (!model) return null;

	const effectiveId = dbLessonId || lessonId || lessonSlug || "";
	const prompts = getThinkPrompts(effectiveId);
	const modelAnalogy = model.mainCards.find((c) => c.title.startsWith("Analogy"))?.body ?? "";

	const keyIdea = overrides?.keyIdea ?? model.keyIdea;
	const analogy = overrides?.analogy ?? modelAnalogy;
	const complexityExplainer = overrides?.complexityExplainer ?? model.complexityExplainer;
	const whenGood = overrides?.whenGood ?? model.whenGood;
	const whenAvoid = overrides?.whenAvoid ?? model.whenAvoid;
	const stepsPrompt = overrides?.stepsPrompt ?? prompts.steps;
	const miscPrompt = overrides?.miscPrompt ?? prompts.misconceptions;

	const editBtn = (section: Section) =>
		canEdit ? (
			<EditBtn
				open={editing === section}
				onOpen={() => setEditing(section)}
				onClose={() => setEditing(null)}
			/>
		) : null;

	return (
		<div className="lesson-theory">
			<div className="lesson-theory__layout">
				<main className="lesson-theory__main">
					<ConceptReveal keyIdea={keyIdea} analogy={analogy} editButton={editBtn("concept")} lastUpdated={overrides?.conceptUpdatedAt} canFeedback={canFeedback} />
					{editing === "concept" && (
						<EditPanel>
							<ConceptEditPanel
								initialKeyIdea={keyIdea}
								initialAnalogy={analogy}
								onSave={(ki, an) => { save({ keyIdea: ki, analogy: an, conceptUpdatedAt: new Date().toISOString() }); setEditing(null); }}
								onCancel={() => setEditing(null)}
							/>
						</EditPanel>
					)}

					<ThinkPrompt
						question={stepsPrompt}
						revealLabel="I've thought about it — show me the steps →"
						onReveal={() => setStepsRevealed(true)}
						editButton={editBtn("stepsPrompt")}
						lastUpdated={overrides?.stepsPromptUpdatedAt}
						canFeedback={canFeedback}
					>
						<StepsReveal steps={model.steps} />
					</ThinkPrompt>
					{editing === "stepsPrompt" && (
						<EditPanel>
							<ThinkPromptEditPanel
								initialQuestion={stepsPrompt}
								onSave={(q) => { save({ stepsPrompt: q, stepsPromptUpdatedAt: new Date().toISOString() }); setEditing(null); }}
								onCancel={() => setEditing(null)}
							/>
						</EditPanel>
					)}

					<ComplexityPanel
						complexityCases={model.complexityCases}
						complexityExplainer={complexityExplainer}
						stepsRevealed={stepsRevealed}
						confidence={confidence}
						onConfidence={setConfidence}
						editButton={editBtn("complexity")}
						lastUpdated={overrides?.complexityUpdatedAt}
						canFeedback={canFeedback}
					/>
					{editing === "complexity" && (
						<EditPanel>
							<ComplexityEditPanel
								initialExplainer={complexityExplainer}
								onSave={(ex) => { save({ complexityExplainer: ex, complexityUpdatedAt: new Date().toISOString() }); setEditing(null); }}
								onCancel={() => setEditing(null)}
							/>
						</EditPanel>
					)}

					<WhenToUsePanel whenGood={whenGood} whenAvoid={whenAvoid} editButton={editBtn("whenToUse")} lastUpdated={overrides?.whenToUseUpdatedAt} canFeedback={canFeedback} />
					{editing === "whenToUse" && (
						<EditPanel>
							<WhenToUseEditPanel
								initialWhenGood={whenGood}
								initialWhenAvoid={whenAvoid}
								onSave={(g, a) => { save({ whenGood: g, whenAvoid: a, whenToUseUpdatedAt: new Date().toISOString() }); setEditing(null); }}
								onCancel={() => setEditing(null)}
							/>
						</EditPanel>
					)}

					<ThinkPrompt
						question={miscPrompt}
						revealLabel="Reveal common mistakes →"
						onReveal={() => setMiscRevealed(true)}
						editButton={editBtn("miscPrompt")}
						lastUpdated={overrides?.miscPromptUpdatedAt}
						canFeedback={canFeedback}
					>
						<MisconceptionReveal misconceptions={model.misconceptions} />
					</ThinkPrompt>
					{editing === "miscPrompt" && (
						<EditPanel>
							<ThinkPromptEditPanel
								initialQuestion={miscPrompt}
								onSave={(q) => { save({ miscPrompt: q, miscPromptUpdatedAt: new Date().toISOString() }); setEditing(null); }}
								onCancel={() => setEditing(null)}
							/>
						</EditPanel>
					)}
					<TheoryFooter updatedAt={updatedAt} />
				</main>

				<aside className="lesson-theory__sidebar">
					<PrerequisitesCard
						prerequisites={model.prerequisites}
						prereqNote={model.prereqNote}
					/>
					<RelatedLessonsCard relatedLessons={model.relatedLessons} />
					<MemoryTipCard title={model.title} sidebarCards={model.sidebarCards} />
					{model.nextLesson && <NextLessonCard nextLesson={model.nextLesson} />}
				</aside>
			</div>
		</div>
	);
};

export default AlgorithmLessonTheoryV1;
