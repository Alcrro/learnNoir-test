import DefaultButton from "../../../components/atoms/DefaultButton";
import { DefaultTextarea } from "../../../components/atoms/DefaultTextarea";
import type { ExplanationLevel, TheoryLevelExplanation } from "../api/theoryLevelApi";
import { useTheoryLevelTeacherPanel } from "../hooks/useTheoryLevelTeacherPanel";

type Props = {
	lessonId: string;
	blockId: string;
	activeLevel: ExplanationLevel;
	currentExplanation: TheoryLevelExplanation | null | undefined;
};

export function TheoryLevelTeacherPanel({ lessonId, blockId, activeLevel, currentExplanation }: Props) {
	const { draft, setDraft, handleSave, handleGenerate, isSaving, isGenerating } =
		useTheoryLevelTeacherPanel({ lessonId, blockId, activeLevel, currentExplanation });

	return (
		<div className="mt-3 rounded-lg border border-(--border) bg-(--surface) p-3">
			<div className="mb-2 flex items-center gap-2">
				<span className="text-xs font-medium text-(--text-muted) uppercase tracking-wide">
					Edit instructor — {activeLevel}
				</span>
				{currentExplanation?.source === "ai" && (
					<span className="rounded bg-purple-100 px-1.5 py-0.5 text-[10px] text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
						generat AI
					</span>
				)}
			</div>

			<DefaultTextarea
				value={draft}
				onChange={(e) => setDraft(e.target.value)}
				rows={5}
				placeholder="Scrie explicația pentru acest nivel..."
			/>

			<div className="mt-2 flex gap-2">
				<DefaultButton
					variant="primary"
					size="sm"
					onClick={handleSave}
					disabled={isSaving || !draft.trim()}
					className="text-xs disabled:opacity-50"
				>
					{isSaving ? "Se salvează..." : currentExplanation?.source === "ai" ? "Salvează ca instructor" : "Salvează"}
				</DefaultButton>

				<DefaultButton
					variant="outline"
					size="sm"
					onClick={handleGenerate}
					disabled={isGenerating}
					className="text-xs disabled:opacity-50"
				>
					{isGenerating ? "Se generează..." : "Generează cu AI"}
				</DefaultButton>
			</div>
		</div>
	);
}
