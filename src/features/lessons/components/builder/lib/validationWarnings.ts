import type { LessonContentNode } from "@shared/lesson-content";
import { getLevelForNodeType } from "./levelConfig";

export type ValidationWarning = {
	message: string;
	severity: "info" | "warning";
};

export function getWarningsForAddition(
	existingNodes: LessonContentNode[],
	newNodeType: string,
): ValidationWarning[] {
	const warnings: ValidationWarning[] = [];
	const newLevel = getLevelForNodeType(newNodeType)?.id ?? 0;
	const hasL1 = existingNodes.some((n) => getLevelForNodeType(n.type)?.id === 1);
	const hasL2 = existingNodes.some((n) => getLevelForNodeType(n.type)?.id === 2);
	const hasTypes = (types: string[]) => existingNodes.some((n) => types.includes(n.type));

	if ((newLevel === 4 || newLevel === 5) && !hasL1) {
		warnings.push({
			severity: "warning",
			message:
				"Adaugă mai întâi un bloc de fundație (concept, paragraph). Studenții nu vor înțelege fără baza conceptuală.",
		});
	}

	if (newNodeType === "complexity" && !hasTypes(["steps", "example"])) {
		warnings.push({
			severity: "warning",
			message: "Complexitatea are mai mult sens după ce ai explicat pașii.",
		});
	}

	if (newNodeType === "code-runner" && !hasTypes(["code", "steps"])) {
		warnings.push({
			severity: "warning",
			message: "Exercițiul de cod e mai eficient după ce ai arătat sintaxa și pașii.",
		});
	}

	if (newLevel === 3 && !hasL2) {
		warnings.push({
			severity: "info",
			message: "De obicei analiza vine după explicarea mecanismului (steps, example).",
		});
	}

	return warnings;
}
