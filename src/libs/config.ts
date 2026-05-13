const raw =
	(import.meta.env.VITE_API_URI as string | undefined) ??
	"http://0.0.0.0:3000/api";

// Remove trailing slash from the API URI
const sanitized = raw.replace(/\/$/, "");

export const API_URL = sanitized.endsWith("/api")
	? sanitized
	: `${sanitized}/api`;
