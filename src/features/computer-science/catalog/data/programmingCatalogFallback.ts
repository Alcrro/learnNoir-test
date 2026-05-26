import {
	algorithms as sidebarCatalog,
	type SidebarItem,
} from "../../../../content/sidebarData";
import {
	algorithms as algorithmDetails,
	type Algorithm as AlgorithmDetail,
} from "../../algorithms/data/algorithmsData";
import {
	buildLessonChips,
	getDefaultDescription,
	getDefaultDifficulty,
	getGroupMeta,
} from "../lib/catalogPresentation";
import type {
	ProgrammingCatalogItem,
	ProgrammingCatalogResponse,
	ProgrammingCategory,
} from "../types/catalog.types";

type LessonOverride = Partial<{
	description: string;
	difficulty: AlgorithmDetail["difficulty"];
	timeComplexity: string;
	spaceComplexity: string;
	stable: boolean;
	group: string;
}>;

const algorithmOverrides: Record<string, LessonOverride> = {
	"selection-sort": {
		description:
			"Gaseste minimul din subarray-ul nesortat si il muta la pozitia corecta.",
		difficulty: "easy",
		timeComplexity: "O(n²)",
		spaceComplexity: "O(1)",
		stable: false,
	},
	"insertion-sort": {
		description:
			"Construieste sortarea inserand fiecare element in pozitia sa corecta.",
		difficulty: "easy",
		timeComplexity: "O(n²)",
		spaceComplexity: "O(1)",
		stable: true,
	},
	"heap-sort": {
		description:
			"Foloseste structura de heap pentru a extrage minimul sau maximul eficient.",
		difficulty: "medium",
		timeComplexity: "O(n log n)",
		spaceComplexity: "O(1)",
		stable: false,
	},
	"counting-sort": {
		description:
			"Sorteaza liniar bazat pe frecventa elementelor cand valorile au un domeniu mic.",
		difficulty: "hard",
		timeComplexity: "O(n+k)",
		spaceComplexity: "O(k)",
		stable: true,
	},
	"radix-sort": {
		description:
			"Sorteaza cifrele de la cel mai putin semnificativ la cel mai semnificativ.",
		difficulty: "hard",
		timeComplexity: "O(nk)",
		spaceComplexity: "O(n+k)",
		stable: true,
	},
	"bucket-sort": {
		description:
			"Distribuie elementele in galeti, sorteaza fiecare galeta si le concateneaza.",
		difficulty: "hard",
		timeComplexity: "O(n+k)",
		spaceComplexity: "O(n+k)",
		stable: true,
	},
	"linear-search": {
		description: "Parcurge secvential elementele pana gaseste valoarea cautata.",
		difficulty: "easy",
		timeComplexity: "O(n)",
		spaceComplexity: "O(1)",
	},
	"jump-search": {
		description:
			"Sare in blocuri intr-un vector sortat, apoi cauta liniar in blocul potrivit.",
		difficulty: "medium",
		timeComplexity: "O(√n)",
		spaceComplexity: "O(1)",
	},
	"interpolation-search": {
		description:
			"Estimeaza pozitia elementului cautat in functie de distributia valorilor.",
		difficulty: "hard",
		timeComplexity: "O(log log n)",
		spaceComplexity: "O(1)",
	},
	"exponential-search": {
		description:
			"Dubla intervalul de cautare si continua cu binary search in zona corecta.",
		difficulty: "medium",
		timeComplexity: "O(log n)",
		spaceComplexity: "O(1)",
	},
};

const algorithmDetailsById = new Map(
	algorithmDetails.map((algorithm) => [algorithm.id, algorithm]),
);

function buildAlgorithmFallback(): ProgrammingCatalogItem[] {
	return sidebarCatalog.algorithms.map((item, index) => {
		const detail = algorithmDetailsById.get(item.id);
		const override = algorithmOverrides[item.id];
		const groupMeta = getGroupMeta(
			"algorithms",
			item.id,
			override?.group ?? detail?.group ?? item.group,
		);
		const progress = 0;
		const status = "not-started" as const;

		return {
			id: item.id,
			name: item.name,
			path: item.path,
			category: "algorithms",
			group: groupMeta.key,
			groupLabel: groupMeta.label,
			groupOrder: groupMeta.order,
			sortOrder: index,
			description:
				override?.description ??
				detail?.description ??
				getDefaultDescription("algorithms", item.name, groupMeta.label),
			difficulty:
				override?.difficulty ??
				detail?.difficulty ??
				getDefaultDifficulty("algorithms", groupMeta.key),
			progress,
			status,
			chips: buildLessonChips({
				timeComplexity: override?.timeComplexity ?? detail?.timeComplexity,
				spaceComplexity: override?.spaceComplexity ?? detail?.spaceComplexity,
				stable: override?.stable ?? detail?.stable,
			}),
			estimatedTime: detail?.estimatedTime,
			isAvailable: item.id === "bubble-sort",
		};
	});
}

function buildDataStructureFallback(): ProgrammingCatalogItem[] {
	return sidebarCatalog.dataStructures.map((item, index) => {
		const groupMeta = getGroupMeta("data-structures", item.id, item.group);

		return {
			id: item.id,
			name: item.name,
			path: item.path,
			category: "data-structures",
			group: groupMeta.key,
			groupLabel: groupMeta.label,
			groupOrder: groupMeta.order,
			sortOrder: index,
			description: getDefaultDescription(
				"data-structures",
				item.name,
				groupMeta.label,
			),
			progress: 0,
			status: "not-started",
			chips: [],
			isAvailable: false,
		};
	});
}

export function getFallbackProgrammingCatalog(
	category: ProgrammingCategory,
): ProgrammingCatalogResponse {
	const lessons =
		category === "algorithms"
			? buildAlgorithmFallback()
			: buildDataStructureFallback();

	return {
		category,
		title: category === "algorithms" ? "Algoritmi" : "Structuri de date",
		description:
			category === "algorithms"
				? "Invata algoritmi cu filtre rapide, progres si rezumate scurte."
				: "Exploreaza structuri de date organizate pe familii si concepte.",
		lessons,
	};
}

export function buildFallbackLessonFromSidebar(
	item: SidebarItem,
	category: ProgrammingCategory,
	index: number,
): ProgrammingCatalogItem {
	const groupMeta = getGroupMeta(category, item.id, item.group);

	return {
		id: item.id,
		name: item.name,
		path: item.path,
		category,
		group: groupMeta.key,
		groupLabel: groupMeta.label,
		groupOrder: groupMeta.order,
		sortOrder: index,
		description: getDefaultDescription(category, item.name, groupMeta.label),
		difficulty: getDefaultDifficulty(category, groupMeta.key),
		progress: 0,
		status: "not-started",
		chips: [],
		isAvailable: true,
	};
}
