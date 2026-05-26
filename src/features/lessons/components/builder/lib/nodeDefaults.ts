import type { LessonContentNode } from "@shared/lesson-content";

export const NODE_DEFAULTS: Record<string, LessonContentNode> = {
	heading:       { type: "heading",      text: "",    level: 2 } as LessonContentNode,
	paragraph:     { type: "paragraph",    text: "" } as LessonContentNode,
	concept:       { type: "concept",      title: "",   sections: [] } as LessonContentNode,
	steps:         { type: "steps",        steps: [] } as LessonContentNode,
	example:       { type: "example",      initial: [], states: [] } as LessonContentNode,
	formula:       { type: "formula",      latex: "",   description: "" } as LessonContentNode,
	theorem:       { type: "theorem",      title: "",   statement: "" } as LessonContentNode,
	proof:         { type: "proof",        steps: [] } as LessonContentNode,
	code:          { type: "code",         code: "",    language: "javascript" } as LessonContentNode,
	complexity:    { type: "complexity",   cases: [],   space: "" } as LessonContentNode,
	think:         { type: "think",        question: "", reveal: "" } as LessonContentNode,
	predict:       { type: "predict",      question: "", answer: "" } as LessonContentNode,
	recall:        { type: "recall",       questions: [] } as LessonContentNode,
	"inline-quiz": { type: "inline-quiz",  question: "", options: [], correct: 0 } as LessonContentNode,
	"fill-blanks": { type: "fill-blanks",  content: "", blanks: [] } as LessonContentNode,
	"drag-sort":   { type: "drag-sort",    title: "",   items: [] } as LessonContentNode,
	"code-runner": { type: "code-runner",  code: "",    language: "javascript" } as LessonContentNode,
};

export function getNodeDefault(nodeType: string): LessonContentNode {
	const def = NODE_DEFAULTS[nodeType];
	if (!def) throw new Error(`Unknown node type: ${nodeType}`);
	return { ...def } as LessonContentNode;
}
