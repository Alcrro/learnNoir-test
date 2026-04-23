export type Difficulty = "easy" | "medium" | "hard";

type InteractionData = {
	question: string;
	answer: string;
};

export type InteractionStep = {
	id: number;
	type: "drag" | "fill" | "mcq" | "info";
	difficulty: Difficulty;
	data: InteractionData;
};

export type Subject = "computer-science" | "mathematics";
