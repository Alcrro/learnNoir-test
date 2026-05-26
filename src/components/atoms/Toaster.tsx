import { X } from "lucide-react";
import { useToastStore } from "../../store/useToastStore";
import { cn } from "../../libs/utils/cn";

export function Toaster() {
	const { toasts, dismiss } = useToastStore();

	if (toasts.length === 0) return null;

	return (
		<div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
			{toasts.map((toast) => (
				<div
					key={toast.id}
					className={cn(
						"flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm shadow-lg backdrop-blur-sm",
						"border-(--border) bg-(--bg-elevated) text-(--text-primary)",
						"animate-in slide-in-from-bottom-2 fade-in duration-200",
					)}
				>
					<span className="flex-1 leading-5">{toast.message}</span>
					<button
						onClick={() => dismiss(toast.id)}
						className="mt-0.5 shrink-0 text-(--text-secondary) hover:text-(--text-primary)"
					>
						<X className="h-4 w-4" />
					</button>
				</div>
			))}
		</div>
	);
}
