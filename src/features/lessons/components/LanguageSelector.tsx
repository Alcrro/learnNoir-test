import { cn } from "../../../libs/utils/cn";
import type { ProgrammingLanguage } from "../api/lessonsApi";

const LANGUAGE_LABELS: Record<ProgrammingLanguage, string> = {
	python: "Python",
	javascript: "JavaScript",
	java: "Java",
	cpp: "C++",
};

type Props = {
	languages: ProgrammingLanguage[];
	selected: ProgrammingLanguage;
	onChange: (lang: ProgrammingLanguage) => void;
};

export function LanguageSelector({ languages, selected, onChange }: Props) {
	return (
		<div className="flex flex-wrap gap-2">
			{languages.map((lang) => (
				<button
					key={lang}
					type="button"
					onClick={() => onChange(lang)}
					className={cn(
						"rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
						selected === lang
							? "border-(--border-strong) bg-(--surface-raised) text-(--text-primary)"
							: "border-(--border) text-(--text-muted) hover:border-(--border-strong) hover:text-(--text-primary)",
					)}
				>
					{LANGUAGE_LABELS[lang]}
				</button>
			))}
		</div>
	);
}
