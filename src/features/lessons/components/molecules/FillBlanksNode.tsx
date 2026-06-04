import { useState } from "react";
import type { AnyNode } from "../../types/node.types";
import { useLessonContext } from "../../context/LessonContext";
import { useFillBlanks } from "../../hooks/useFillBlanks";
import type { BlankDef } from "./fill-blanks/lib/types";
import { FillBlanksHeader } from "./fill-blanks/atoms/FillBlanksHeader";
import { FillBlanksFeedback } from "./fill-blanks/atoms/FillBlanksFeedback";
import { FillBlanksCodeBlock } from "./fill-blanks/FillBlanksCodeBlock";
import { FillBlanksOptionsBar } from "./fill-blanks/FillBlanksOptionsBar";
import "../../../../features/computer-science/algorithms/components/lesson/lessonTheory.css";

type Variant = { language: string; content: string; blanks: BlankDef[] };

function FillBlanksBody({
	lessonId,
	content,
	blanks,
}: {
	lessonId: string;
	content: string;
	blanks: BlankDef[];
}) {
	const { answers, openId, setOpenId, handleSelect, allAnswered, allCorrect, wrongCount } =
		useFillBlanks({ lessonId, blanks });

	const blankMap = Object.fromEntries(blanks.map((b) => [b.id, b]));
	const lines = content.split("\n");
	const activeBlank = openId !== null ? blankMap[openId] : null;

	return (
		<>
			<FillBlanksCodeBlock
				lines={lines}
				blankMap={blankMap}
				answers={answers}
				openId={openId}
				onToggle={(id) => setOpenId((p) => (p === id ? null : id))}
			/>
			{activeBlank && openId !== null && (
				<FillBlanksOptionsBar blank={activeBlank} openId={openId} onSelect={handleSelect} />
			)}
			{allAnswered && (
				<FillBlanksFeedback allCorrect={allCorrect} wrongCount={wrongCount} />
			)}
		</>
	);
}

function parseVariants(node: AnyNode): Variant[] {
	if (Array.isArray(node.variants)) {
		return (node.variants as Variant[]).filter(
			(v) =>
				typeof v.language === "string" &&
				typeof v.content === "string" &&
				Array.isArray(v.blanks) &&
				v.blanks.every(
					(b) => typeof b.id === "number" && Array.isArray(b.options) && typeof b.correct === "string",
				),
		);
	}
	const content = typeof node.content === "string" ? node.content : "";
	const language = typeof node.language === "string" ? node.language : "code";
	const blanks: BlankDef[] = Array.isArray(node.blanks)
		? (node.blanks as BlankDef[]).filter(
				(b) => typeof b.id === "number" && Array.isArray(b.options) && typeof b.correct === "string",
			)
		: [];
	if (!content || blanks.length === 0) return [];
	return [{ language, content, blanks }];
}

export function FillBlanksNode({ node }: { node: AnyNode }) {
	const title = typeof node.title === "string" ? node.title : undefined;
	const variants = parseVariants(node);
	const [activeIdx, setActiveIdx] = useState(0);
	const { lessonId } = useLessonContext();

	if (variants.length === 0) return null;

	const active = variants[activeIdx]!;

	return (
		<div className="lt-code-runner">
			<FillBlanksHeader
				title={title}
				language={active.language}
				languages={variants.length > 1 ? variants.map((v) => v.language) : undefined}
				activeLanguage={active.language}
				onLanguageChange={(lang) => {
					const idx = variants.findIndex((v) => v.language === lang);
					if (idx !== -1) setActiveIdx(idx);
				}}
			/>
			<FillBlanksBody key={activeIdx} lessonId={lessonId} content={active.content} blanks={active.blanks} />
		</div>
	);
}
