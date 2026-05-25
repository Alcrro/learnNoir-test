import type { LessonContentNode } from "@shared/lesson-content";
import { LEVELS, type LevelId } from "./levelConfig";

export type CompletenessLabel = "incomplete" | "partial" | "good" | "complete";

export type CompletenessResult = {
	score: number;
	coveredLevelIds: LevelId[];
	missingLevelIds: LevelId[];
	label: CompletenessLabel;
};

// Puncte câștigate pentru un nivel în funcție de câte tipuri distincte sunt prezente.
// Nivelurile cu un singur tip (heading, code-runner) sunt binare.
// Nivelurile cu multiple tipuri cresc proporțional până la saturație la FULL_AT=3 tipuri.
function levelPoints(levelIndex: number, presentCount: number): number {
	const level = LEVELS[levelIndex];
	if (presentCount === 0) return 0;
	if (level.nodeTypes.length === 1) return level.points;
	const FULL_AT = Math.min(3, level.nodeTypes.length);
	return Math.round(level.points * Math.min(presentCount, FULL_AT) / FULL_AT);
}

export function computeCompleteness(nodes: LessonContentNode[]): CompletenessResult {
	const coveredLevelIds: LevelId[] = [];
	const missingLevelIds: LevelId[] = [];
	let score = 0;

	LEVELS.forEach((level, i) => {
		const presentCount = level.nodeTypes.filter((t) => nodes.some((n) => n.type === t)).length;
		const pts = levelPoints(i, presentCount);
		score += pts;
		if (presentCount > 0) coveredLevelIds.push(level.id);
		else missingLevelIds.push(level.id);
	});

	const label: CompletenessLabel =
		score <= 30 ? "incomplete" :
		score <= 59 ? "partial" :
		score <= 79 ? "good" : "complete";

	return { score, coveredLevelIds, missingLevelIds, label };
}
