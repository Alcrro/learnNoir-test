// Controller hook pentru AlgorithmLessonTheoryV2.
// Compune toate sursele de date, derivă valorile cu override-uri aplicate,
// și construiește funcția G — factory de props pentru TheoryInteractionBlock.
// View-ul primește un obiect flat, fără să știe nimic despre hooks sau API.

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useLessonTheoryModel } from "./useLessonTheoryModel";
import { useAlgorithmLessonOverrides } from "./useAlgorithmLessonOverrides";
import { useTheoryInteractionsEditor } from "./useTheoryInteractions";
import { useTheoryProgressReducer } from "./useTheoryProgressReducer";
import { useLessonEditStore } from "../../../../features/lessons/store/useLessonEditStore";
import { useLessonContext } from "../../../../features/lessons/context/LessonContext";
import { COMPONENT_LABELS } from "../components/lesson/theory-v2/componentLabels";
import { patchLessonProgress } from "../api/progressApi";
import { useGuestProgressStore } from "../../../../features/lessons/store/useGuestProgressStore";
import UseGetProfile from "../../../../features/profiles/hooks/UseGetProfile";
import type { LessonContextForAI, TheoryInteractionComponentType } from "../../../../features/lessons/api/lessonTheoryInteractionsApi";
import type { TheoryInteractionDTO } from "../../../../features/lessons/api/lessonTheoryInteractionsApi";

// ── tipul returnat de G — props pentru TheoryInteractionBlock ─────────────────
export type TheoryBlockProps = {
	component: TheoryInteractionComponentType;
	label: string;
	isEditing: boolean;
	interaction: TheoryInteractionDTO | undefined;
	isGenerating: boolean;
	isApproving: boolean;
	onGenerate: () => void;
	onApprove: (id: string) => void;
};

// ── tipul returnat de controller ──────────────────────────────────────────────
export type AlgorithmTheoryController = {
	model: ReturnType<typeof useLessonTheoryModel>["model"];
	dbLessonId: string;
	isEditing: boolean;
	keyIdea: string;
	analogy: string;
	complexityExplainer: string;
	// G construiește props-urile pentru TheoryInteractionBlock pe baza numelui componentei
	G: (component: TheoryInteractionComponentType) => TheoryBlockProps;
	// recordAttempt înregistrează engagement-ul studentului cu o componentă interactivă
	recordAttempt: (component: TheoryInteractionComponentType) => void;
	// quizScore: scorul curent al studentului (0-100) bazat pe componentele completate
	quizScore: number;
	completedCount: number;
	totalComponents: number;
	justCompleted: boolean;
	// readScore callbacks — trimise ca onReveal la ThinkPrompt-urile din view
	onStepsReveal: () => void;
	onMiscReveal: () => void;
};

export function useAlgorithmTheoryController(dbLessonIdProp = ""): AlgorithmTheoryController {
	const { category } = useParams<{ category: string }>();

	// lessonId din context e fallback când prop-ul lipsește — suportă și usage direct fără prop
	const { lessonId: contextLessonId } = useLessonContext();
	const dbLessonId = dbLessonIdProp || contextLessonId;

	const { model } = useLessonTheoryModel();
	const { overrides } = useAlgorithmLessonOverrides(dbLessonId);
	const isEditing = useLessonEditStore((s) => s.isEditing);
	const { isAuthenticated } = UseGetProfile();
	const setGuestReadProgress = useGuestProgressStore((s) => s.setReadProgress);

	// Editor-ul e activ doar în modul editare — string gol dezactivează query-urile
	const editor = useTheoryInteractionsEditor(isEditing ? dbLessonId : "");

	// Reducer local pentru quiz progress — funcționează atât pentru guest cât și pentru logat
	const { quizScore, completedCount, totalComponents, justCompleted, recordComplete } = useTheoryProgressReducer(
		isEditing ? "" : dbLessonId,
	);

	// ── readScore tracking ────────────────────────────────────────────────────
	// 60 pts: pașii lecției releați · 40 pts: greșelile frecvente relevate → total 100
	const [stepsRevealed, setStepsRevealed] = useState(false);
	const [miscRevealed, setMiscRevealed] = useState(false);
	const lastSentReadScore = useRef(-1);

	useEffect(() => {
		if (isEditing || !dbLessonId) return;
		const readScore = (stepsRevealed ? 60 : 0) + (miscRevealed ? 40 : 0);
		if (readScore === lastSentReadScore.current) return;
		lastSentReadScore.current = readScore;
		const status = readScore === 100 ? "completed" : "in_progress";
		if (isAuthenticated) {
			void patchLessonProgress(dbLessonId, { readScore, status });
		} else {
			setGuestReadProgress(dbLessonId, readScore, status);
		}
	}, [stepsRevealed, miscRevealed, dbLessonId, isEditing, isAuthenticated, setGuestReadProgress]);

	// ── valori derivate cu override-uri aplicate ──────────────────────────────
	const modelAnalogy = model?.mainCards.find((c) => c.title.startsWith("Analogy"))?.body ?? "";
	const keyIdea = overrides?.keyIdea ?? model?.keyIdea ?? "";
	const analogy = overrides?.analogy ?? modelAnalogy;
	const complexityExplainer = overrides?.complexityExplainer ?? model?.complexityExplainer ?? "";

	// Contextul trimis la AI pentru generare — construit din model + override-uri aplicate
	const lessonContext: LessonContextForAI | null = model
		? {
				subject: category ?? "computer-science",
				lessonType: "algorithm",
				title: model.title,
				mainContent: [
					keyIdea,
					model.steps.map((s) => `${s.title}: ${s.description}`).join(". "),
					complexityExplainer,
				].join("\n\n"),
				keyPoints: model.steps.map((s) => s.title),
			}
		: null;

	// ── G: factory de props pentru TheoryInteractionBlock ────────────────────
	const G = (component: TheoryInteractionComponentType): TheoryBlockProps => ({
		component,
		label: COMPONENT_LABELS[component] ?? component,
		isEditing,
		interaction: editor.latestByComponent(component),
		isGenerating: editor.generatingComponent === component,
		isApproving: editor.approvingId === editor.latestByComponent(component)?.id,
		onGenerate: () => { if (lessonContext) void editor.generate(component, lessonContext); },
		onApprove: (id: string) => void editor.approve(id),
	});

	return {
		model, dbLessonId, isEditing, keyIdea, analogy, complexityExplainer, G,
		recordAttempt: recordComplete,
		quizScore, completedCount, totalComponents, justCompleted,
		onStepsReveal: () => setStepsRevealed(true),
		onMiscReveal: () => setMiscRevealed(true),
	};
}
