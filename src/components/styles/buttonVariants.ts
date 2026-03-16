export const buttonVariants: Record<ButtonVariantType, string> = {
	primary: "bg-indigo-500 text-white hover:bg-indigo-600",

	secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",

	ghost: "text-(--text-muted) cursor-not-allowed",

	link: "underline text-indigo-500 hover:opacity-80",

	destructive: "bg-red-500 text-white hover:bg-red-600",

	icon: "text-(--text-muted) hover:text-(--text-primary)",
} as const;

export type ButtonVariantType =
	| "primary"
	| "secondary"
	| "ghost"
	| "link"
	| "destructive"
	| "icon";

export const buttonSizes: Record<ButtonSizeType, string> = {
	default: "h-10 px-4 py-2",
	sm: "h-8 px-3",
	lg: "h-12 px-6",
	icon: "h-10 w-10 p-0 flex items-center justify-center",
} as const;

export type ButtonSizeType = "default" | "sm" | "lg" | "icon";
