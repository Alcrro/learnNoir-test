import { EXPLANATION_LEVELS } from "../../../../../shared/src/theory-level-explanation";
import type { ExplanationLevel } from "../api/theoryLevelApi";
import { useTheoryLevelSection } from "../hooks/useTheoryLevelSection";
import { LevelTabButton } from "./atoms/LevelTabButton";
import { LevelExplanationContent } from "./molecules/LevelExplanationContent";
import { TheoryLevelTeacherPanel } from "./TheoryLevelTeacherPanel";

type Props = { blockId: string };

export function TheoryLevelSection({ blockId }: Props) {
	const { lessonId, canEdit, activeLevel, explanation, isLoading, isFetching, handleLevelChange, getStatus } =
		useTheoryLevelSection(blockId);

	return (
		<div className="mt-6 rounded-xl border border-(--border) bg-(--surface) p-4">
			<p className="mb-3 text-xs font-semibold uppercase tracking-wide text-(--text-muted)">
				Explică-mi altfel
			</p>

			<div className="flex gap-1.5 overflow-x-auto pb-1">
				{(EXPLANATION_LEVELS as ExplanationLevel[]).map((level) => (
					<LevelTabButton
						key={level}
						level={level}
						isActive={level === activeLevel}
						status={getStatus(level)}
						showDot={canEdit}
						onClick={() => handleLevelChange(level)}
					/>
				))}
			</div>

			<div className="mt-4 min-h-[60px]">
				<LevelExplanationContent
					explanation={explanation}
					isLoading={isLoading}
					isFetching={isFetching}
				/>
			</div>

			{canEdit && (
				<TheoryLevelTeacherPanel
					lessonId={lessonId}
					blockId={blockId}
					activeLevel={activeLevel}
					currentExplanation={explanation}
				/>
			)}
		</div>
	);
}
