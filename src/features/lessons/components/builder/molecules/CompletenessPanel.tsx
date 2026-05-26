import { useState } from "react";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { cn } from "../../../../../libs/utils/cn";
import { CompletenessBar } from "../atoms/CompletenessBar";
import { LEVELS } from "../lib/levelConfig";
import type { CompletenessResult, CompletenessLabel } from "../lib/completenessScore";

const LABEL_MESSAGES: Record<CompletenessLabel, { text: string; color: string }> = {
	incomplete: { text: "Lecție incompletă — prea puțin conținut pentru studenți", color: "text-red-500" },
	partial:    { text: "Lecție parțială — lipsesc interacțiunile", color: "text-orange-500" },
	good:       { text: "Lecție bună — mai ai loc de îmbunătățit", color: "text-yellow-500 dark:text-yellow-400" },
	complete:   { text: "Lecție completă", color: "text-green-500" },
};

const NODE_DESCRIPTIONS: Record<string, string> = {
	heading: "Titlu de secțiune", paragraph: "Text liber", concept: "Definiție structurată",
	steps: "Pași numerotați", example: "Vizualizare array", formula: "Expresie LaTeX",
	theorem: "Enunț formal", proof: "Demonstrație matematică", code: "Cod cu syntax highlighting",
	complexity: "Tabel Big-O", think: "Reflecție cu reveal", predict: "Predicție înainte de exemplu",
	recall: "Quiz spaced recall", "inline-quiz": "MCQ rapid", "fill-blanks": "Completare spații",
	"drag-sort": "Drag-to-sort", "code-runner": "Editor Monaco executabil",
};

type Props = {
	result: CompletenessResult;
	onAddSuggested: (nodeType: string) => void;
};

export function CompletenessPanel({ result, onAddSuggested }: Props) {
	const [open, setOpen] = useState(false);
	const { score, label, coveredLevelIds, missingLevelIds } = result;
	const msg = LABEL_MESSAGES[label];

	const coveredNames = coveredLevelIds
		.map((id) => LEVELS.find((l) => l.id === id)?.label)
		.filter(Boolean)
		.join(", ");

	const suggestions = missingLevelIds
		.map((id) => {
			const level = LEVELS.find((l) => l.id === id);
			if (!level) return null;
			const nodeType = level.nodeTypes[0];
			return { levelLabel: level.label, nodeType };
		})
		.filter(Boolean) as { levelLabel: string; nodeType: string }[];

	return (
		<div className="rounded-lg border border-(--border) bg-(--bg-card) p-3 space-y-2">
			<div className="flex items-center justify-between gap-2">
				<span className="text-sm font-medium text-(--text-primary)">
					Completitudine: <span className="font-bold">{score}%</span>
				</span>
				{suggestions.length > 0 && (
					<button
						type="button"
						onClick={() => setOpen((o) => !o)}
						className="flex items-center gap-1 text-xs text-(--text-secondary) hover:text-(--text-primary) transition-colors"
					>
						Sugestii
						{open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
					</button>
				)}
			</div>

			<CompletenessBar score={score} label={label} />

			<div className="flex items-center justify-between gap-2 flex-wrap">
				<p className={cn("text-xs", msg.color)}>{msg.text}</p>
				{coveredNames && (
					<p className="text-xs text-(--text-muted)">Acoperit: {coveredNames}</p>
				)}
			</div>

			{open && suggestions.length > 0 && (
				<div className="border-t border-(--border) pt-2 space-y-1">
					{suggestions.map(({ levelLabel, nodeType }) => (
						<div key={nodeType} className="flex items-center justify-between gap-2">
							<div className="flex items-center gap-2 min-w-0">
								<span className="text-xs text-(--text-muted) shrink-0">{levelLabel}</span>
								<span className="text-xs font-mono text-(--text-secondary) truncate">
									{nodeType} — {NODE_DESCRIPTIONS[nodeType]}
								</span>
							</div>
							<button
								type="button"
								onClick={() => onAddSuggested(nodeType)}
								className="flex items-center gap-0.5 text-xs text-blue-600 dark:text-blue-400 hover:underline shrink-0"
							>
								<Plus size={11} /> Adaugă
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
