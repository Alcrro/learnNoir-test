import { slugToText } from "../../../../libs/utils/slugToText";
import type {
	LessonChip,
	LessonDifficulty,
	LessonStatus,
	ProgrammingCategory,
} from "../types/catalog.types";

type GroupMeta = {
	key: string;
	label: string;
	order: number;
};

const algorithmGroupMeta: Record<string, GroupMeta> = {
	sort: { key: "sort", label: "Sortare", order: 1 },
	search: { key: "search", label: "Cautare", order: 2 },
	graph: { key: "graph", label: "Grafuri", order: 3 },
	string: { key: "string", label: "Siruri", order: 4 },
	"dynamic-programming": {
		key: "dynamic-programming",
		label: "Programare dinamica",
		order: 5,
	},
	greedy: { key: "greedy", label: "Greedy", order: 6 },
	math: { key: "math", label: "Matematica", order: 7 },
};

const dataStructureGroupMeta: Record<string, GroupMeta> = {
	linear: { key: "linear", label: "Liniar", order: 1 },
	hash: { key: "hash", label: "Hash", order: 2 },
	tree: { key: "tree", label: "Arbori", order: 3 },
	heap: { key: "heap", label: "Heap", order: 4 },
	string: { key: "string", label: "Siruri", order: 5 },
	graph: { key: "graph", label: "Grafuri", order: 6 },
	misc: { key: "misc", label: "Concepte", order: 7 },
};

export const difficultyLabels: Record<LessonDifficulty, string> = {
	easy: "Usor",
	medium: "Mediu",
	hard: "Avansat",
};

export const difficultyBadgeClasses: Record<LessonDifficulty, string> = {
	easy: "bg-[#E4F6EE] text-[#2C8C67]",
	medium: "bg-[#F8EED2] text-[#A06600]",
	hard: "bg-[#F8E1E8] text-[#B2526F]",
};

export const progressToneClasses: Record<LessonStatus, string> = {
	"not-started": "bg-[#666666]",
	"in-progress": "bg-[#459DFF]",
	completed: "bg-[#23C38E]",
};

export function getGroupMeta(
	category: ProgrammingCategory,
	itemId: string,
	group?: string | null,
): GroupMeta {
	if (category === "algorithms") {
		const algorithmGroup = group ? algorithmGroupMeta[group] : null;
		return (
			algorithmGroup ?? {
				key: group ?? "other",
				label: slugToText(group ?? "other"),
				order: 99,
			}
		);
	}

	if (group && dataStructureGroupMeta[group]) {
		return dataStructureGroupMeta[group];
	}

	if (
		itemId.includes("array") ||
		itemId.includes("list") ||
		itemId.includes("stack") ||
		itemId.includes("queue") ||
		itemId.includes("deque")
	) {
		return dataStructureGroupMeta.linear;
	}

	if (itemId.includes("hash")) {
		return dataStructureGroupMeta.hash;
	}

	if (itemId.includes("tree")) {
		return dataStructureGroupMeta.tree;
	}

	if (itemId.includes("heap")) {
		return dataStructureGroupMeta.heap;
	}

	if (itemId.includes("trie")) {
		return dataStructureGroupMeta.string;
	}

	if (itemId.includes("graph") || itemId.includes("disjoint-set")) {
		return dataStructureGroupMeta.graph;
	}

	return dataStructureGroupMeta.misc;
}

export function deriveStatus(
	progress?: number | null,
	status?: string | null,
): LessonStatus {
	if (status === "completed" || status === "in-progress" || status === "not-started") {
		return status;
	}

	if ((progress ?? 0) >= 100) return "completed";
	if ((progress ?? 0) > 0) return "in-progress";
	return "not-started";
}

export function deriveProgress(
	progress?: number | null,
	status?: string | null,
): number {
	if (typeof progress === "number") {
		return Math.max(0, Math.min(100, progress));
	}

	const derivedStatus = deriveStatus(progress, status);
	if (derivedStatus === "completed") return 100;
	if (derivedStatus === "in-progress") return 45;
	return 0;
}

export function buildLessonChips(input: {
	timeComplexity?: string | null;
	spaceComplexity?: string | null;
	stable?: boolean | null;
	chips?: Array<string | { id?: string; label?: string | null } | null> | null;
}): LessonChip[] {
	if (input.chips?.length) {
		return input.chips
			.map((chip, index) => {
				if (!chip) return null;
				if (typeof chip === "string") {
					return { id: `${chip}-${index}`, label: chip };
				}

				if (!chip.label) return null;
				return {
					id: chip.id ?? `${chip.label}-${index}`,
					label: chip.label,
				};
			})
			.filter((chip): chip is LessonChip => chip !== null);
	}

	const derivedChips: LessonChip[] = [];

	if (input.timeComplexity) {
		derivedChips.push({
			id: "time-complexity",
			label: input.timeComplexity,
		});
	}

	if (input.spaceComplexity) {
		derivedChips.push({
			id: "space-complexity",
			label: `${input.spaceComplexity} spatiu`,
		});
	}

	if (typeof input.stable === "boolean") {
		derivedChips.push({
			id: "stability",
			label: input.stable ? "Stabil" : "Instabil",
		});
	}

	return derivedChips;
}

export function getDefaultDifficulty(
	category: ProgrammingCategory,
	group: string,
): LessonDifficulty | undefined {
	if (category !== "algorithms") return undefined;

	if (group === "sort" || group === "search") return "easy";
	if (group === "graph" || group === "string" || group === "greedy") return "medium";
	return "hard";
}

export function getDefaultDescription(
	category: ProgrammingCategory,
	name: string,
	groupLabel: string,
): string {
	if (category === "data-structures") {
		return `${name} organizeaza datele pentru operatii rapide si explicatii pas cu pas.`;
	}

	return `${name} este o lectie din categoria ${groupLabel.toLowerCase()} cu exemple clare si vizualizare.`;
}
