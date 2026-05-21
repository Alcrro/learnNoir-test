import { AIService } from "../../../../../../../features/services/ai/application/usecase/useAI";
import { client } from "../../../../../../../features/services/ai/domain/connectToOpenAiApi";
import { AIRepositoryImpl } from "../../../../../../../features/services/ai/infrastructure/AIRepositoryImpl";
import { CacheServices } from "../../../../../../../features/services/cache/application/usecase/CacheServices";
import { CacheRepositoryImpl } from "../../../../../../../features/services/cache/infrastructure/CacheRepositoryImpl";
import { redis } from "../../../../../../../features/services/cache/infrastructure/redisInstantiate";

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
