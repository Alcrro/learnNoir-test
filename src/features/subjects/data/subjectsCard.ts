// ── Tailwind color map per categorie ─────────────────────────────────────────
// IMPORTANT: clasele Tailwind trebuie să fie complete în cod (nu construite dinamic)
// altfel Tailwind purge le elimină în build de producție.
type ColorKey =
	| "indigo"
	| "blue"
	| "violet"
	| "slate"
	| "cyan"
	| "emerald"
	| "amber";

type ColorClasses = {
	icon: string;
	tag: string;
	progress: string;
	stripe: string;
	ring: string;
};
export const COLOR_MAP: Record<ColorKey, ColorClasses> = {
	indigo: {
		icon: "bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400",
		tag: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60",
		progress: "bg-indigo-500 dark:bg-indigo-400",
		stripe: "bg-indigo-500",
		ring: "focus-visible:ring-indigo-500",
	},
	blue: {
		icon: "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
		tag: "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60",
		progress: "bg-blue-500 dark:bg-blue-400",
		stripe: "bg-blue-500",
		ring: "focus-visible:ring-blue-500",
	},
	violet: {
		icon: "bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400",
		tag: "bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/60",
		progress: "bg-violet-500 dark:bg-violet-400",
		stripe: "bg-violet-500",
		ring: "focus-visible:ring-violet-500",
	},
	slate: {
		icon: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
		tag: "bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60",
		progress: "bg-slate-500 dark:bg-slate-400",
		stripe: "bg-slate-500",
		ring: "focus-visible:ring-slate-500",
	},
	cyan: {
		icon: "bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400",
		tag: "bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-800/60",
		progress: "bg-cyan-500 dark:bg-cyan-400",
		stripe: "bg-cyan-500",
		ring: "focus-visible:ring-cyan-500",
	},
	emerald: {
		icon:
			"bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400",
		tag: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60",
		progress: "bg-emerald-500 dark:bg-emerald-400",
		stripe: "bg-emerald-500",
		ring: "focus-visible:ring-emerald-500",
	},
	amber: {
		icon: "bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
		tag: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60",
		progress: "bg-amber-500 dark:bg-amber-400",
		stripe: "bg-amber-500",
		ring: "focus-visible:ring-amber-500",
	},
};

type DifficultyMeta = "beginner" | "intermediate" | "advanced";
type CategoryMetaMap = Record<DifficultyMeta, CategoryMeta>;
type CategoryMeta = {
	label: string;
	cls: string;
};

export const DIFFICULTY: CategoryMetaMap = {
	beginner: {
		label: "Beginner",
		cls: "dark:bg-emerald-100 dark:text-emerald-800 border border-emerald-300 bg-emerald-900/40 text-emerald-300 dark:border-emerald-700",
	},
	intermediate: {
		label: "Intermediate",
		cls: "dark:bg-amber-100 dark:text-amber-800 border border-amber-300 bg-amber-900/40 text-amber-300 dark:border-amber-700",
	},
	advanced: {
		label: "Advanced",
		cls: "dark:bg-rose-100 dark:text-rose-800 border border-rose-300 bg-rose-900/40 text-rose-300 dark:border-rose-700",
	},
};
