import { tokenize } from "./tokenize";
import type { Seg } from "./types";

export function parseLineSegs(line: string): Seg[] {
	return line.split(/\{\{(\d+)\}\}/).map((part, i) =>
		i % 2 === 0
			? { kind: "text" as const, tokens: tokenize(part) }
			: { kind: "blank" as const, id: Number(part) },
	);
}
