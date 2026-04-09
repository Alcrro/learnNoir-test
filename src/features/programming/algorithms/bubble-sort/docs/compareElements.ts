type LectureDocumentationProp = {
	id: number;
	title: string;
	description: string;
};

export const compareElements = {
	array_doc: { id: 0, title: "About Array", description: "array doc lecture" },
	swap_doc: { id: 1, title: "About swap", description: "swap doc lecture" },
	concept_compare_doc: {
		id: 2,
		title: "concept compare",
		description: "concept_compare_doc doc lecture",
	},
	compare_elements_doc: {
		id: 3,
		title: "compare element",
		description: "compare_elements_doc doc lecture",
	},
	comp_doc: { id: 4, title: "comp", description: "comp_doc doc lecture" },
} satisfies Record<string, LectureDocumentationProp>;

export type LectureType = keyof typeof compareElements;
