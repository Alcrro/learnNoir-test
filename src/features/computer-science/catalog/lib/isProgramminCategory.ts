import { ProgrammingCategory } from "../types/catalog.types";

export function isProgrammingCategory(
	value: string,
): value is ProgrammingCategory {
	return value === "algorithms" || value === "data-structures";
}
