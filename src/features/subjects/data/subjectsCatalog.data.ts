import type {
	FilterOption,
	SubjectAvailability,
	SubjectDomain,
	SubjectTrack,
} from "../../../types/types";

export const SUBJECT_TRACK_OPTIONS: FilterOption<"all" | SubjectTrack>[] = [
	{ value: "all", label: "All tracks" },
	{ value: "technology", label: "Technology" },
	{ value: "mathematics", label: "Mathematics" },
	{ value: "science", label: "Science" },
];

export const SUBJECT_AVAILABILITY_OPTIONS: FilterOption<
	"all" | SubjectAvailability
>[] = [
	{ value: "all", label: "All statuses" },
	{ value: "available", label: "Available now" },
	{ value: "coming-soon", label: "Coming soon" },
];

export const SUBJECT_DOMAINS: SubjectDomain[] = [
	{
		id: "computer-science",
		title: "Computer Science",
		subtitle: "Algorithms, data structures and software thinking",
		description:
			"Programming fundamentals, algorithms, data structures and practical system design lessons.",
		track: "technology",
		availability: "available",
		accent: "indigo",
		href: "/subjects/computer-science",
		modules: 7,
		completedModules: 3,
		lessons: 238,
		estimatedHours: 126,
		topics: ["Algorithms", "Data Structures", "Web", "Databases"],
		featured: true,
	},
	{
		id: "mathematics",
		title: "Mathematics",
		subtitle: "Core theory for problem solving and logic",
		description:
			"Foundational math topics for reasoning, proofs, geometry and discrete thinking.",
		track: "mathematics",
		availability: "available",
		accent: "emerald",
		href: "/subjects/mathematics",
		modules: 4,
		completedModules: 1,
		lessons: 64,
		estimatedHours: 42,
		topics: ["Geometry", "Algebra", "Functions", "Proofs"],
		featured: true,
	},
	{
		id: "physics",
		title: "Physics",
		subtitle: "Motion, energy and the laws behind systems",
		description:
			"Mechanics, electricity, waves and problem-based intuition for how systems behave.",
		track: "science",
		availability: "coming-soon",
		accent: "amber",
		modules: 5,
		completedModules: 0,
		lessons: 72,
		estimatedHours: 48,
		topics: ["Mechanics", "Optics", "Electromagnetism", "Thermodynamics"],
	},
	{
		id: "chemistry",
		title: "Chemistry",
		subtitle: "Structures, reactions and molecular intuition",
		description:
			"Atomic structure, chemical bonding, reactions and problem-solving around matter.",
		track: "science",
		availability: "coming-soon",
		accent: "rose",
		modules: 4,
		completedModules: 0,
		lessons: 58,
		estimatedHours: 39,
		topics: ["Atoms", "Reactions", "Stoichiometry", "Organic Basics"],
	},
	{
		id: "biology",
		title: "Biology",
		subtitle: "Living systems from cells to organisms",
		description:
			"Cell biology, genetics and physiology explained through visual, structured lessons.",
		track: "science",
		availability: "coming-soon",
		accent: "cyan",
		modules: 4,
		completedModules: 0,
		lessons: 61,
		estimatedHours: 36,
		topics: ["Cells", "Genetics", "Human Body", "Ecology"],
	},
	{
		id: "statistics",
		title: "Statistics",
		subtitle: "Data intuition for analysis and decision making",
		description:
			"Probability, distributions, inference and the math behind reading data correctly.",
		track: "mathematics",
		availability: "coming-soon",
		accent: "violet",
		modules: 3,
		completedModules: 0,
		lessons: 45,
		estimatedHours: 28,
		topics: ["Probability", "Distributions", "Sampling", "Inference"],
	},
];
