import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "../../../../libs/utils/cn";

type Props = {
	languages: string[];
	active: string;
	onChange: (lang: string) => void;
};

export function LangDropdown({ languages, active, onChange }: Props) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		function onOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
		}
		document.addEventListener("mousedown", onOutside);
		return () => document.removeEventListener("mousedown", onOutside);
	}, [open]);

	return (
		<div ref={ref} className="relative">
			<button
				type="button"
				onClick={() => setOpen((p) => !p)}
				className={cn(
					"flex items-center gap-1 rounded-md px-2 py-0.5",
					"text-[11px] font-mono transition-colors",
					"border border-transparent",
					open
						? "bg-(--surface-hover) border-(--border) text-(--text-primary)"
						: "text-(--lt-code-comment) hover:text-(--text-secondary)",
				)}
			>
				{active}
				<ChevronDown
					size={10}
					className={cn("transition-transform duration-150", open && "rotate-180")}
				/>
			</button>

			{open && (
				<div
					className={cn(
						"absolute right-0 top-full z-50 mt-1 min-w-[110px]",
						"rounded-lg border border-(--border) bg-(--bg-card) shadow-lg",
						"py-1 overflow-hidden",
					)}
				>
					{languages.map((lang) => (
						<button
							key={lang}
							type="button"
							onClick={() => { onChange(lang); setOpen(false); }}
							className={cn(
								"flex w-full items-center justify-between gap-3",
								"px-3 py-1.5 text-left text-[12px] font-mono transition-colors",
								lang === active
									? "text-(--text-primary) bg-(--surface-hover)"
									: "text-(--text-secondary) hover:bg-(--surface-hover) hover:text-(--text-primary)",
							)}
						>
							{lang}
							{lang === active && <Check size={10} className="shrink-0 text-(--text-muted)" />}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
