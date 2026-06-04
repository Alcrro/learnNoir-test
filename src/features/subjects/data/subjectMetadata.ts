import type { SubjectAccent, SubjectTrack } from "../../../types/types";

type SubjectMetadata = {
	subtitle: string;
	track: SubjectTrack;
	accent: SubjectAccent;
	topics: string[];
	featured?: boolean;
};

const FALLBACK: SubjectMetadata = {
	subtitle: "",
	track: "technology",
	accent: "indigo",
	topics: [],
};

const SUBJECT_METADATA: Record<string, SubjectMetadata> = {
	"logic-and-critical-thinking": {
		subtitle: "Deductive reasoning, argumentation, and LSAT/GMAT prep",
		track: "mathematics",
		accent: "violet",
		topics: ["Logic Grids", "Fallacies", "LSAT", "GMAT"],
		featured: true,
	},
	"computer-science": {
		subtitle: "Algorithms, data structures and software thinking",
		track: "technology",
		accent: "indigo",
		topics: ["Algorithms", "Data Structures", "Web", "Databases"],
		featured: true,
	},
	mathematics: {
		subtitle: "Core theory for problem solving and logic",
		track: "mathematics",
		accent: "emerald",
		topics: ["Geometry", "Algebra", "Functions", "Proofs"],
		featured: true,
	},
	physics: {
		subtitle: "Motion, energy and the laws behind systems",
		track: "science",
		accent: "amber",
		topics: ["Mechanics", "Optics", "Electromagnetism", "Thermodynamics"],
	},
	chemistry: {
		subtitle: "Structures, reactions and molecular intuition",
		track: "science",
		accent: "rose",
		topics: ["Atoms", "Reactions", "Stoichiometry", "Organic Basics"],
	},
	biology: {
		subtitle: "Living systems from cells to organisms",
		track: "science",
		accent: "cyan",
		topics: ["Cells", "Genetics", "Human Body", "Ecology"],
	},
	statistics: {
		subtitle: "Data intuition for analysis and decision making",
		track: "mathematics",
		accent: "violet",
		topics: ["Probability", "Distributions", "Sampling", "Inference"],
	},
};

export function getSubjectMetadata(slug: string): SubjectMetadata {
	return SUBJECT_METADATA[slug] ?? FALLBACK;
}
