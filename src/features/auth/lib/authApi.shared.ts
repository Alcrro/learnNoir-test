import { API_URL } from "../../../libs/config";

export { API_URL as API_URI };

export function extractAuthMessage(
	payload: unknown,
	fallbackMessage: string,
): string {
	if (!payload) {
		return fallbackMessage;
	}

	if (typeof payload === "string" && payload.trim().length > 0) {
		return payload;
	}

	if (typeof payload !== "object") {
		return fallbackMessage;
	}

	const record = payload as Record<string, unknown>;
	const message = record.message;
	const errors = record.errors;
	const nestedData = record.data;

	if (typeof message === "string" && message.trim().length > 0) {
		return message;
	}

	if (Array.isArray(message) && message.length > 0) {
		return message.filter(Boolean).join(", ");
	}

	if (typeof record.error === "string" && record.error.trim().length > 0) {
		return record.error;
	}

	if (Array.isArray(errors) && errors.length > 0) {
		return errors
			.map((error) => String(error).trim())
			.filter(Boolean)
			.join(", ");
	}

	if (nestedData && typeof nestedData === "object") {
		return extractAuthMessage(nestedData, fallbackMessage);
	}

	return fallbackMessage;
}

export async function readApiResponse<T>(
	response: Response,
	fallbackMessage: string,
): Promise<T> {
	const contentType = response.headers.get("content-type") ?? "";
	let payload: unknown = null;

	if (contentType.includes("application/json")) {
		try {
			payload = await response.json();
		} catch {
			payload = null;
		}
	} else {
		const textPayload = await response.text().catch(() => "");
		payload = textPayload ? { message: textPayload } : null;
	}

	if (!response.ok) {
		throw new Error(extractAuthMessage(payload, fallbackMessage));
	}

	return (payload ?? {}) as T;
}
