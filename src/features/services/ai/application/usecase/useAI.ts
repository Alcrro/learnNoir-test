import type { AIRepository } from "../contract/ai.repository.interfaces";

export class AIService {
	private aiRepository: AIRepository;

	constructor(aiRepository: AIRepository) {
		this.aiRepository = aiRepository;
	}

	async generateText(prompt: string): Promise<string> {
		return await this.aiRepository.generateText(prompt);
	}
}
