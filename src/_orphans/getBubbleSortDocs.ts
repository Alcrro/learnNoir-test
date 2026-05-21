import { createServices } from "./services/composition/createServices";

export const getBubbleSortDocs = async () => {
	const { cacheService, aiService } = createServices();
	const key = "bubble-sort-docs";

	const cached = await cacheService.get(key);

	if (cached) return cached;

	const res = await aiService.generateText("Explain bubble sort simply");
	const text = res;

	await cacheService.set(key, text);

	return text;
};
