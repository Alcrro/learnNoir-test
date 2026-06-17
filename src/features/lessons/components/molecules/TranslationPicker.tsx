import { Loader2, Globe } from "lucide-react";
import { LangDropdown } from "../atoms/LangDropdown";
import {
	SUPPORTED_TRANSLATION_LANGS,
	ORIGINAL_LANG,
	getLangLabel,
} from "../../lib/translationLanguages";
import { useLessonTranslationStore } from "../../store/useLessonTranslationStore";
import { useLessonTranslationQuery } from "../../hooks/useLessonTranslationQuery";

const ALL_LANG_LABELS = [
	"Original",
	...SUPPORTED_TRANSLATION_LANGS.map((l) => l.label),
];

const LABEL_TO_CODE = new Map<string, string>([
	["Original", ORIGINAL_LANG],
	...SUPPORTED_TRANSLATION_LANGS.map((l): [string, string] => [l.label, l.code]),
]);

type Props = { lessonId: string };

export function TranslationPicker({ lessonId }: Props) {
	const getLang = useLessonTranslationStore((s) => s.getLang);
	const setLang = useLessonTranslationStore((s) => s.setLang);
	const activeLang = getLang(lessonId);
	const { isLoading } = useLessonTranslationQuery(lessonId, activeLang);

	function handleChange(label: string) {
		const code = LABEL_TO_CODE.get(label) ?? ORIGINAL_LANG;
		setLang(lessonId, code);
	}

	return (
		<div className="flex items-center gap-1.5">
			{isLoading ? (
				<Loader2 size={12} className="animate-spin text-(--text-muted)" />
			) : (
				<Globe size={12} className="text-(--text-muted) shrink-0" />
			)}
			<LangDropdown
				languages={ALL_LANG_LABELS}
				active={getLangLabel(activeLang)}
				onChange={handleChange}
			/>
		</div>
	);
}
