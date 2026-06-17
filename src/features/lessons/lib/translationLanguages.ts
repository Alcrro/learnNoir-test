export type TranslationLang = { code: string; label: string };

export const ORIGINAL_LANG = "original";

export const SUPPORTED_TRANSLATION_LANGS: TranslationLang[] = [
	{ code: "en", label: "English" },
	{ code: "fr", label: "Français" },
	{ code: "de", label: "Deutsch" },
	{ code: "es", label: "Español" },
	{ code: "it", label: "Italiano" },
	{ code: "pt", label: "Português" },
	{ code: "nl", label: "Nederlands" },
	{ code: "pl", label: "Polski" },
	{ code: "tr", label: "Türkçe" },
	{ code: "ja", label: "日本語" },
	{ code: "zh", label: "中文" },
];

export function getLangLabel(code: string): string {
	if (code === ORIGINAL_LANG) return "Original";
	return SUPPORTED_TRANSLATION_LANGS.find((l) => l.code === code)?.label ?? code;
}
