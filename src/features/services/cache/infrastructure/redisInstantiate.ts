import Redis from "ioredis";

export const redis = new Redis(
	(import.meta.env.VITE_REDIS_URL as string | undefined) || "redis://localhost:6379",
);
