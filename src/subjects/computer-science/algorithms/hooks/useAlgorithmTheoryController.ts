// Controller hook pentru AlgorithmLessonTheoryV2.
// Compune toate sursele de date, derivă valorile cu override-uri aplicate,
// și construiește funcția G — factory de props pentru TheoryInteractionBlock.
// View-ul primește un obiect flat, fără să știe nimic despre hooks sau API.

import { useParams } from "react-router-dom";
import { useLessonTheoryModel } from "./useLessonTheoryModel";
import { useAlgorithmLessonOverrides } from "./useAlgorithmLessonOverrides";
import { useTheoryInteractionsEditor } from "./useTheoryInteractions";
import { useLessonEditStore } from "../../../../features/lessons/store/useLessonEditStore";
import { useLessonDataStore } from "../../../../features/lessons/store/useLessonDataStore";
import { COMPONENT_LABELS } from "../components/lesson/theory-v2/componentLabels";
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
};

export function useAlgorithmTheoryController(dbLessonIdProp = ""): AlgorithmTheoryController {
	const { category } = useParams<{ category: string }>();

	// Lessonul din store e fallback când prop-ul lipsește — suportă și usage direct fără prop
	const lessonFromStore = useLessonDataStore((s) => s.lesson);
	const dbLessonId = dbLessonIdProp || lessonFromStore?.id || "";

	const { model } = useLessonTheoryModel();
	const { overrides } = useAlgorithmLessonOverrides(dbLessonId);
	const isEditing = useLessonEditStore((s) => s.isEditing);

	// Editor-ul e activ doar în modul editare — string gol dezactivează query-urile
	const editor = useTheoryInteractionsEditor(isEditing ? dbLessonId : "");

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
	// Centralizată în controller ca să nu existe logică în view.
	// Dacă lessonContext e null (model neîncărcat), onGenerate e no-op sigur.
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

	return { model, dbLessonId, isEditing, keyIdea, analogy, complexityExplainer, G };
}
