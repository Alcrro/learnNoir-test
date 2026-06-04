export const PRICING_SCHEMES = {
	neutral: {
		card: "border-(--border)",
		shadow: "",
		badge: "border-(--border) bg-(--bg-elevated) text-(--text-muted)",
	},
	amber: {
		card: "border-amber-500/50",
		shadow: "shadow-[0_0_40px_-8px_rgba(245,158,11,0.15)]",
		badge: "border-amber-500/40 bg-amber-500/10 text-amber-400",
	},
	violet: {
		card: "border-violet-500/50",
		shadow: "shadow-[0_0_40px_-8px_rgba(139,92,246,0.15)]",
		badge: "border-violet-500/40 bg-violet-500/10 text-violet-400",
	},
	sky: {
		card: "border-sky-500/40",
		shadow: "shadow-[0_0_40px_-8px_rgba(14,165,233,0.12)]",
		badge: "border-sky-500/40 bg-sky-500/10 text-sky-400",
	},
} as const;

export type ColorScheme = keyof typeof PRICING_SCHEMES;

export const PRICING_CHECK_COLOR: Record<ColorScheme, string> = {
	neutral: "text-(--text-muted)",
	amber: "text-amber-400",
	violet: "text-violet-400",
	sky: "text-sky-400",
};

export const PRICING_LABEL_COLOR: Record<ColorScheme, string> = {
	neutral: "text-(--text-muted)",
	amber: "text-amber-400",
	violet: "text-violet-400",
	sky: "text-sky-400",
};

export const PRICING_ACTIVE_STYLE: Record<ColorScheme, string> = {
	neutral: "border-(--border) bg-(--bg-elevated)",
	amber: "border-amber-500/40 bg-amber-500/10 text-amber-400",
	violet: "border-violet-500/40 bg-violet-500/10 text-violet-400",
	sky: "border-sky-500/40 bg-sky-500/10 text-sky-400",
};
