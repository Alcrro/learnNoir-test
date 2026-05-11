import { OpenAI } from "openai";

export const client = new OpenAI({
	apiKey: import.meta.env.VITE_OPENAI_API_KEY as string | undefined,
	dangerouslyAllowBrowser: true,
});

export class OpenAIClient {
	private client: OpenAI;

	constructor() {
		this.client = new OpenAI({
			apiKey: import.meta.env.VITE_OPENAI_API_KEY as string | undefined,
			dangerouslyAllowBrowser: true,
		});
	}
}
