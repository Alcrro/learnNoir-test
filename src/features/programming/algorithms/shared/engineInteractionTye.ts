type InteractionType =
	| "single_choice"
	| "multiple_choice"
	| "boolean"
	| "code"
	| "action";

type DifficultyType = "easy" | "medium" | "hard";

export type AnswerOptionType = {
	id: string;
	label: string | boolean;
};

export type AnswerOptionProps = {
	options?: AnswerOptionType[];
	selectedId?: string;
	onSelect: (option: AnswerOptionType) => void;
};

export type Interaction = {
	id: string;
	type: InteractionType;
	difficulty: DifficultyType | "easy";

	question: (ctx: unknown) => React.ReactNode;

	options?: AnswerOptionType[];

	validate: (ctx: unknown, answer: string[] | boolean) => boolean;

	feedback: {
		correct: (ctx: unknown) => React.ReactNode;
		wrong: (ctx: unknown) => React.ReactNode;
	};
};
