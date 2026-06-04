import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "../../../../libs/utils/cn";
import type { LessonDTO } from "../../api/lessonsApi";
import { LANGUAGE_LABELS } from "../../hooks/useLessonListPage";

type Props = {
	variants: LessonDTO[];
	currentSlug: string;
};

export function LessonLanguageSwitcher({ variants, currentSlug }: Props) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const {
		subject = "",
		category = "",
		module: moduleSlug = "",
	} = useParams<{ subject: string; category: string; module: string }>();

	useEffect(() => {
		if (!open) return;
		function onOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
		}
		document.addEventListener("mousedown", onOutside);
		return () => document.removeEventListener("mousedown", onOutside);
	}, [open]);

	const current = variants.find((v) => v.slug === currentSlug);
	const currentLabel = current?.language ? LANGUAGE_LABELS[current.language] : currentSlug;

	function handleSelect(variant: LessonDTO) {
		setOpen(false);
		navigate(`/subjects/${subject}/${category}/${moduleSlug}/${variant.slug}`);
	}

	return (
		<div ref={ref} className="relative inline-block normal-case">
			<button
				type="button"
				onClick={() => setOpen((p) => !p)}
				className={cn(
					"inline-flex items-baseline gap-1 font-medium transition-colors",
					open ? "text-(--text-secondary)" : "text-(--text-muted) hover:text-(--text-secondary)",
				)}
			>
				{currentLabel}
				<ChevronDown
					size={13}
					className={cn(
						"self-center transition-transform duration-150",
						open && "rotate-180",
					)}
				/>
			</button>

			{open && (
				<div className="absolute left-0 top-full z-50 mt-1 min-w-[130px] rounded-lg border border-(--border) bg-(--bg-card) shadow-lg py-1">
					{variants.map((v) => {
						const label = v.language ? LANGUAGE_LABELS[v.language] : v.title;
						const isActive = v.slug === currentSlug;
						return (
							<button
								key={v.slug}
								type="button"
								onClick={() => handleSelect(v)}
								className={cn(
									"flex w-full items-center justify-between gap-3",
									"px-3 py-1.5 text-left text-sm transition-colors",
									isActive
										? "text-(--text-primary) bg-(--surface-hover)"
										: "text-(--text-secondary) hover:bg-(--surface-hover) hover:text-(--text-primary)",
								)}
							>
								{label}
								{isActive && <Check size={11} className="shrink-0 text-(--text-muted)" />}
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
}
