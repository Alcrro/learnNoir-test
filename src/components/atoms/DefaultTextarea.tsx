import type { TextareaHTMLAttributes } from "react";
import { cn } from "../../libs/utils/cn";

type TextareaVariant = "default" | "modal";

type Props = {
	variant?: TextareaVariant;
	className?: string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">;

const variants: Record<TextareaVariant, string> = {
	default:
		"w-full resize-y rounded border border-(--border) bg-(--bg) p-2 text-sm text-(--text) placeholder:text-(--text-muted) focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50",
	modal:
		"w-full rounded-2xl border border-(--border) bg-(--bg-secondary) px-4 py-3 text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:border-(--blue) focus:outline-none transition resize-none disabled:opacity-50",
};

export function DefaultTextarea({ variant = "default", className, ...props }: Props) {
	return <textarea className={cn(variants[variant], className)} {...props} />;
}
