import { AIService } from "../../../../../../services/ai/application/usecase/useAI";
import { client } from "../../../../../../services/ai/domain/connectToOpenAiApi";
import { AIRepositoryImpl } from "../../../../../../services/ai/infrastructure/AIRepositoryImpl";
import { CacheServices } from "../../../../../../services/cache/application/usecase/CacheServices";
import { CacheRepositoryImpl } from "../../../../../../services/cache/infrastructure/CacheRepositoryImpl";
import { redis } from "../../../../../../services/cache/infrastructure/redisInstancate";

export const createServices = () => {
	const cacheRepository = new CacheRepositoryImpl(redis);
	const cacheService = new CacheServices(cacheRepository);

	const aiRepository = new AIRepositoryImpl(client);
	const aiService = new AIService(aiRepository);

	return {
		cacheService,
		aiService,
	};
};
