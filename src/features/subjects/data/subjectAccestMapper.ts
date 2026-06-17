import { SubjectAccent } from "../../../types/types";

export const ACCENT_STYLES: Record<
	SubjectAccent,
	{
		badge: string;
		icon: string;
		progress: string;
		ring: string;
		topic: string;
	}
> = {
	indigo: {
		badge:
			"border-[color:var(--blue-border)] bg-[var(--blue-bg)] text-[var(--blue-text)]",
		icon: "bg-[var(--blue-bg)] text-[var(--blue-text)]",
		progress: "bg-[var(--blue)]",
		ring:
			"hover:border-[color:var(--blue-border)] focus-visible:ring-[var(--blue-bg)]",
		topic:
			"border-[color:var(--blue-border)] bg-[var(--blue-bg)] text-[var(--blue-text)]",
	},
	cyan: {
		badge:
			"border-[color:var(--teal-border)] bg-[var(--teal-bg)] text-[var(--teal-text)]",
		icon: "bg-[var(--teal-bg)] text-[var(--teal-text)]",
		progress: "bg-[var(--teal)]",
		ring:
			"hover:border-[color:var(--teal-border)] focus-visible:ring-[var(--teal-bg)]",
		topic:
			"border-[color:var(--teal-border)] bg-[var(--teal-bg)] text-[var(--teal-text)]",
	},
	emerald: {
		badge:
			"border-[color:var(--teal-border)] bg-[var(--teal-bg)] text-[var(--teal-text)]",
		icon: "bg-[var(--teal-bg)] text-[var(--teal-text)]",
		progress: "bg-[var(--teal)]",
		ring:
			"hover:border-[color:var(--teal-border)] focus-visible:ring-[var(--teal-bg)]",
		topic:
			"border-[color:var(--teal-border)] bg-[var(--teal-bg)] text-[var(--teal-text)]",
	},
	amber: {
		badge:
			"border-amber-200 bg-amber-50 text-[var(--amber-text)] dark:border-amber-500/30 dark:bg-[var(--amber-bg)] dark:text-[var(--amber-text)]",
		icon:
			"bg-amber-100 text-amber-700 dark:bg-[var(--amber-bg)] dark:text-[var(--amber-text)]",
		progress: "bg-amber-500 dark:bg-amber-400",
		ring:
			"hover:border-amber-300 dark:hover:border-amber-400/40 focus-visible:ring-amber-100 dark:focus-visible:ring-[var(--amber-bg)]",
		topic:
			"border-amber-200 bg-amber-50 text-[var(--amber-text)] dark:border-amber-500/30 dark:bg-[var(--amber-bg)] dark:text-[var(--amber-text)]",
	},
	rose: {
		badge:
			"border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/12 dark:text-rose-300",
		icon: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
		progress: "bg-rose-500 dark:bg-rose-400",
		ring:
			"hover:border-rose-300 dark:hover:border-rose-400/40 focus-visible:ring-rose-100 dark:focus-visible:ring-rose-500/20",
		topic:
			"border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/12 dark:text-rose-300",
	},
	violet: {
		badge:
			"border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/12 dark:text-violet-300",
		icon:
			"bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
		progress: "bg-violet-500 dark:bg-violet-400",
		ring:
			"hover:border-violet-300 dark:hover:border-violet-400/40 focus-visible:ring-violet-100 dark:focus-visible:ring-violet-500/20",
		topic:
			"border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/12 dark:text-violet-300",
	},
	orange: {
		badge:
			"border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/12 dark:text-orange-300",
		icon:
			"bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
		progress: "bg-orange-500 dark:bg-orange-400",
		ring:
			"hover:border-orange-300 dark:hover:border-orange-400/40 focus-visible:ring-orange-100 dark:focus-visible:ring-orange-500/20",
		topic:
			"border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/12 dark:text-orange-300",
	},
	purple: {
		badge:
			"border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-500/30 dark:bg-purple-500/12 dark:text-purple-300",
		icon:
			"bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300",
		progress: "bg-purple-500 dark:bg-purple-400",
		ring:
			"hover:border-purple-300 dark:hover:border-purple-400/40 focus-visible:ring-purple-100 dark:focus-visible:ring-purple-500/20",
		topic:
			"border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-500/30 dark:bg-purple-500/12 dark:text-purple-300",
	},
};
