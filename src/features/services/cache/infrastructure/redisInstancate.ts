import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config({
	path: "/home/alex/vscode/reactDataStructureLEarning/.env",
});

console.log(process.env.REDIS_URL);

export const redis = new Redis(
	process.env.REDIS_URL || "redis://localhost:6379",
);
