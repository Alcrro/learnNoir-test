import { AlertTriangle } from "lucide-react";
import { cn } from "../../../../../libs/utils/cn";
import { getLevelForNodeType } from "../lib/levelConfig";
import { LevelBadge } from "../atoms/LevelBadge";
import { NodeTypeBadge } from "../atoms/NodeTypeBadge";
import { NodeMiniature } from "./NodeMiniature";

const NODE_DESCRIPTIONS: Record<string, string> = {
	heading:       "Titlu de secțiune",
	paragraph:     "Text liber",
	concept:       "Definiție structurată",
	steps:         "Pași numerotați",
	example:       "Vizualizare array",
	formula:       "Expresie LaTeX",
	theorem:       "Enunț formal",
	proof:         "Demonstrație matematică",
	code:          "Cod cu syntax highlighting",
	complexity:    "Tabel Big-O",
	think:         "Reflecție cu reveal",
	predict:       "Predicție înainte de exemplu",
	recall:        "Quiz spaced recall",
	"inline-quiz": "MCQ rapid",
	"fill-blanks": "Completare spații",
	"drag-sort":   "Drag-to-sort",
	"code-runner": "Editor Monaco executabil",
};

type Props = {
	nodeType: string;
	onSelect: (nodeType: string) => void;
	disabled?: boolean;
	hasWarning?: boolean;
};

export function NodePickerCard({ nodeType, onSelect, disabled, hasWarning }: Props) {
	const level = getLevelForNodeType(nodeType);

	return (
		<button
			type="button"
			onClick={() => !disabled && onSelect(nodeType)}
			className={cn(
				"relative flex flex-col gap-2 rounded-lg border p-2 text-left transition-all",
				"border-(--border) bg-(--bg-card) hover:border-(--border-active) hover:shadow-sm",
				disabled && "cursor-not-allowed opacity-50 pointer-events-none",
				hasWarning && "border-orange-400 dark:border-orange-500",
			)}
		>
			{hasWarning && (
				<AlertTriangle
					size={12}
					className="absolute top-1.5 right-1.5 text-orange-400"
				/>
			)}

			<div className="flex items-center gap-1.5 flex-wrap">
				{level && <LevelBadge levelId={level.id} />}
				<NodeTypeBadge nodeType={nodeType} />
			</div>

			<NodeMiniature nodeType={nodeType} />

			<p className="text-xs text-(--text-secondary) leading-tight">
				{NODE_DESCRIPTIONS[nodeType] ?? nodeType}
			</p>
		</button>
	);
}
