export type TranslatedContentNode = {
	type: string;
	[key: string]: unknown;
};

export type TranslatedQuizQuestion = {
	question: string;
	options: { text: string; explanation?: string }[];
	hint?: string;
};

export type TranslatedBlockPayload = {
	blockId: string;
	type: "content" | "interactive" | "assessment";
	nodes?: TranslatedContentNode[];
	questions?: TranslatedQuizQuestion[];
	instructions?: string;
};

export type LessonTranslation = {
	lessonId: string;
	lang: string;
	title?: string;
	description?: string;
	blocks: TranslatedBlockPayload[];
};
