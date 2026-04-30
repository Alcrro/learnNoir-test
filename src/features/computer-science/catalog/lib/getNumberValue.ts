import { RawLesson } from "../api/getProgrammingCatalog";

export function getNumberValue(
	record: RawLesson,
	keys: string[],
): number | undefined {
	for (const key of keys) {
		const value = record[key];
		if (typeof value === "number" && Number.isFinite(value)) {
			return value;
		}
	}

	return undefined;
}
