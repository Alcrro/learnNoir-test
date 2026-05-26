import type { AnyNode } from "../../types/node.types";
import { useLessonContext } from "../../context/LessonContext";
import { useFillBlanks } from "../../hooks/useFillBlanks";
import type { BlankDef } from "./fill-blanks/lib/types";
import { FillBlanksHeader } from "./fill-blanks/atoms/FillBlanksHeader";
import { FillBlanksFeedback } from "./fill-blanks/atoms/FillBlanksFeedback";
import { FillBlanksCodeBlock } from "./fill-blanks/FillBlanksCodeBlock";
import { FillBlanksOptionsBar } from "./fill-blanks/FillBlanksOptionsBar";
import "../../../../features/computer-science/algorithms/components/lesson/lessonTheory.css";

export function FillBlanksNode({ node }: { node: AnyNode }) {
	const title    = typeof node.title    === "string" ? node.title    : undefined;
	const content  = typeof node.content  === "string" ? node.content  : "";
	const language = typeof node.language === "string" ? node.language : undefined;
	const blanks: BlankDef[] = Array.isArray(node.blanks)
		? (node.blanks as BlankDef[]).filter(
				(b) => typeof b.id === "number" && Array.isArray(b.options) && typeof b.correct === "string",
			)
		: [];

	const { lessonId } = useLessonContext();
	const { answers, openId, setOpenId, handleSelect, allAnswered, allCorrect, wrongCount } =
		useFillBlanks({ lessonId, blanks });

	if (!content || blanks.length === 0) return null;

	const blankMap = Object.fromEntries(blanks.map((b) => [b.id, b]));
	const lines = content.split("\n");
	const activeBlank = openId !== null ? blankMap[openId] : null;

	return (
		<div className="lt-code-runner">
			<FillBlanksHeader title={title} language={language} />
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
		</div>
	);
}
