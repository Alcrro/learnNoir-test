export const buttonVariants: Record<ButtonVariantType, string> = {
	primary: `
		bg-(--btn-primary-bg)
		text-(--btn-primary-text)
		hover:bg-(--btn-primary-bg-hover)
	`,

	secondary: `
		bg-(--btn-secondary-bg)
		text-(--btn-secondary-text)
		hover:bg-(--btn-secondary-bg-hover)
	`,

	destructive: `
		bg-(--btn-danger-bg)
		text-(--btn-danger-text)
		hover:bg-(--btn-danger-bg-hover)
	`,

	ghost: `
		text-(--text-muted)
		hover:bg-(--btn-ghost-hover)
	`,

	link: `
		text-(--link-color)
		underline
		hover:opacity-80
	`,

	icon: `
		text-(--text-muted)
		hover:text-(--btn-secondary-text)
	`,

	// NEW: outline variant (what you asked)
	outline: `
		border
		border-(--border-color)
		text-(--text-primary)
		bg-transparent
		hover:bg-(--btn-outline-hover)
	`,
} as const;

export type ButtonVariantType =
	| "primary"
	| "secondary"
	| "ghost"
	| "link"
	| "destructive"
	| "icon"
	| "outline";

export const buttonSizes: Record<ButtonSizeType, string> = {
	default: "px-4 py-2",
	sm: "h-8 px-3",
	lg: "h-12 px-6",
	icon: "h-10 w-10 p-0 flex items-center justify-center",
} as const;

export type ButtonSizeType = "default" | "sm" | "lg" | "icon";
