import type { ExplanationLevel } from "../api/theoryLevelApi";
import type { ExplanationStatus } from "../../../../../shared/src/theory-level-explanation";
import { EXPLANATION_LEVELS } from "../../../../../shared/src/theory-level-explanation";

export const LEVEL_LABELS: Record<ExplanationLevel, string> = {
	copil: "Copil",
	licean: "Licean",
	student: "Student",
	expert: "Expert",
};

export const LEVEL_TOOLTIPS: Record<ExplanationLevel, string> = {
	copil: "Explicație simplă, cu analogii din viața de zi cu zi",
	licean: "Pași clari, logică de bază, fără cod",
	student: "Tehnic, cod real, complexitate algoritmică",
	expert: "Formal, notație matematică, proof-uri",
};

export const STATUS_ICON: Record<ExplanationStatus, string> = {
	teacher: "✓",
	ai: "✦",
	empty: "○",
};

const STORAGE_KEY = "theory-level-default";

export function getDefaultLevel(): ExplanationLevel {
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved && (EXPLANATION_LEVELS as string[]).includes(saved)) {
			return saved as ExplanationLevel;
		}
	} catch {
		// ignore
	}
	return "student";
}

export function saveDefaultLevel(level: ExplanationLevel): void {
	try {
		localStorage.setItem(STORAGE_KEY, level);
	} catch {
		// ignore
	}
}
