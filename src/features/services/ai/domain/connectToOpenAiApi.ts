import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config({
	path: "/home/alex/vscode/reactDataStructureLEarning/.env",
});

export const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

//need to do reutilizble class to use in repository implementation
export class OpenAIClient {
	private client: OpenAI;

	constructor() {
		this.client = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
		});
	}
}
