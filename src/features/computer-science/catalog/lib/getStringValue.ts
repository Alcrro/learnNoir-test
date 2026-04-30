import { RawLesson } from "../api/getProgrammingCatalog";

export function getStringValue(
	record: RawLesson,
	keys: string[],
): string | undefined {
	for (const key of keys) {
		const value = record[key];
		if (typeof value === "string" && value.trim()) {
			return value;
		}
	}

	return undefined;
}
