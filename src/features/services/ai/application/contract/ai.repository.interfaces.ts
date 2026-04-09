export interface AIRepository {
	generateText: (prompt: string) => Promise<string>;
}
