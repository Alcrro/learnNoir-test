export type LevelId = 1 | 2 | 3 | 4 | 5 | 6;

export type LevelConfig = {
	id: LevelId;
	label: string;
	badge: string;
	color: string;
	description: string;
	points: number;
	nodeTypes: string[];
};

export const LEVELS: LevelConfig[] = [
	{
		id: 1,
		label: "Structurare",
		badge: "S",
		color: "bg-gray-100 text-gray-600 dark:bg-gray-800/60 dark:text-gray-400",
		description: "Titluri de secțiune — organizare vizuală, fără conținut pedagogic. Max 5% din scor.",
		points: 5,
		nodeTypes: ["heading"],
	},
	{
		id: 2,
		label: "Fundație",
		badge: "L1",
		color: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
		description: "Bloc de bază — definește ce este conceptul. Trebuie să existe cel puțin unul.",
		points: 20,
		nodeTypes: ["paragraph", "concept"],
	},
	{
		id: 3,
		label: "Înțelegere",
		badge: "L2",
		color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300",
		description: "Explică mecanismul — pași, exemple, formule. Scorul crește cu fiecare tip nou (3 tipuri = maxim).",
		points: 25,
		nodeTypes: ["steps", "example", "formula", "theorem", "proof", "code"],
	},
	{
		id: 4,
		label: "Analiză",
		badge: "L3",
		color: "bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
		description: "Gândire critică — complexitate, reflecție, predicție. Scorul crește cu fiecare tip nou.",
		points: 20,
		nodeTypes: ["complexity", "think", "predict"],
	},
	{
		id: 5,
		label: "Practică",
		badge: "L4",
		color: "bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300",
		description: "Consolidare prin exerciții — quiz, completare, sortare. Scorul crește cu fiecare tip nou.",
		points: 20,
		nodeTypes: ["recall", "inline-quiz", "fill-blanks", "drag-sort"],
	},
	{
		id: 6,
		label: "Aplicare",
		badge: "L5",
		color: "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300",
		description: "Transfer în context nou — cod executabil. Necesită toate nivelurile anterioare.",
		points: 10,
		nodeTypes: ["code-runner"],
	},
];

export function getLevelForNodeType(nodeType: string): LevelConfig | undefined {
	return LEVELS.find((l) => l.nodeTypes.includes(nodeType));
}
