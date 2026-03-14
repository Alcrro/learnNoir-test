import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config({
	path: "/home/alex/vscode/reactDataStructureLEarning/.env",
});

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export const connectToOpenAiApi = async () => {
	try {
		const response = await client.responses.create({
			model: "gpt-4.1-mini",
			input: "Explain bubblesort simply",
		});
		console.log("Response from OpenAI API:", response);
	} catch (error) {
		console.error("Error connecting to OpenAI API:", error);
	}
};

connectToOpenAiApi();
