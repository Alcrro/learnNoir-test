import type { CacheRepositoryImpl } from "../../infrastructure/CacheRepositoryImpl";

export class CacheServices {
	constructor(private readonly cacheRepositoryImpl: CacheRepositoryImpl) {}

	async get(key: string): Promise<string | null> {
		return await this.cacheRepositoryImpl.get(key);
	}

	async set(key: string, value: string): Promise<void> {
		await this.cacheRepositoryImpl.set(key, value);
	}
}
