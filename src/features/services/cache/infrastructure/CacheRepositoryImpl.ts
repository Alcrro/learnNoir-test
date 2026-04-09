import type { CacheRepository } from "../application/repository/repository";
import { Redis } from "ioredis";

export class CacheRepositoryImpl implements CacheRepository {
	private redis: Redis;
	constructor(redis: Redis) {
		// Initialize Redis client here
		this.redis = redis;
	}

	async get(_key: string): Promise<string | null> {
		// Implement the logic to get a value from Redis cache using the given key
		// Placeholder implementation
		return await this.redis.get(_key);
	}
	async set(_key: string, _value: string): Promise<void> {
		// Implement the logic to set a value in Redis cache with the given key
		// Placeholder implementation
		// await this.redis.set(_key, _value);
	}
}
