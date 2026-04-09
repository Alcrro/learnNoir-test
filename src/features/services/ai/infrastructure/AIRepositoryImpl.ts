import type OpenAI from "openai";
import type { AIRepository } from "../application/contract/ai.repository.interfaces";

export class AIRepositoryImpl implements AIRepository {
	private client: OpenAI;

	constructor(client: OpenAI) {
		this.client = client;
	}

	async generateText(prompt: string): Promise<string> {
		// Implement the logic to connect to the OpenAI API and generate text based on the prompt
		// For example, you can use the OpenAI client to send a request and get the response
		const response = await this.client.chat.completions.create({
			model: "gpt-4-mini",
			messages: [
				{
					role: "user",
					content: prompt,
				},
			],
			max_tokens: 300,
			temperature: 0.3,
		});
		return response.choices[0].message.content || "";
	}
}
