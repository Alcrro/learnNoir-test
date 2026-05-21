import { cn } from "../../../../../../libs/utils/cn";
import { DifficultyBadge } from "../atoms/DifficultyBadge";
import type { DragDropQuestion as DragDropQuestionType } from "../lib/quizTypes";
import type { QuestionResult } from "../hooks/useQuizSession";

type Segment =
	| { kind: "text"; text: string }
	| { kind: "blank"; index: number };

function parseSentence(sentence: string): Segment[] {
	const parts = sentence.split("[blank]");
	return parts.flatMap((text, i) => {
		const acc: Segment[] = [];
		if (text) acc.push({ kind: "text", text });
		if (i < parts.length - 1) acc.push({ kind: "blank", index: i });
		return acc;
	});
}

type SlotState = "empty" | "filled" | "correct" | "wrong";

type Props = {
	question: DragDropQuestionType;
	result: QuestionResult;
	onPlaceItem: (slotIndex: number, item: string) => void;
	onRemoveFromSlot: (slotIndex: number) => void;
	onSubmit: () => void;
};

export function DragDropQuestion({
	question,
	result,
	onPlaceItem,
	onRemoveFromSlot,
	onSubmit,
}: Props) {
	const { dragDropSlots, locked } = result;
	const usedItems = new Set(Object.values(dragDropSlots));
	const allFilled = Object.keys(dragDropSlots).length === question.blanks.length;
	const segments = parseSentence(question.sentence);

	function slotState(index: number): SlotState {
		const item = dragDropSlots[index];
		if (!item) return "empty";
		if (!locked) return "filled";
		return item === question.blanks[index] ? "correct" : "wrong";
	}

	function handleDragStart(e: React.DragEvent, item: string) {
		e.dataTransfer.setData("text/plain", item);
		e.dataTransfer.effectAllowed = "move";
	}

	function handleSlotDragOver(e: React.DragEvent) {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	}

	function handleSlotDrop(e: React.DragEvent, slotIndex: number) {
		e.preventDefault();
		const item = e.dataTransfer.getData("text/plain");
		if (item) onPlaceItem(slotIndex, item);
	}

	return (
		<div className="space-y-5">
			<div className="flex items-start justify-between gap-3">
				<p className="text-sm text-(--text-muted)">
					Drag the correct terms into the blanks.
				</p>
				<DifficultyBadge difficulty={question.difficulty} showWeight />
			</div>

			{/* Sentence with inline drop zones */}
			<div className="rounded-lg bg-(--surface-subtle) px-4 py-4 text-base leading-[2.4rem]">
				{segments.map((seg, i) => {
					if (seg.kind === "text") {
						return <span key={i}>{seg.text}</span>;
					}
					const state = slotState(seg.index);
					const item = dragDropSlots[seg.index];
					return (
						<span
							key={i}
							onDrop={!locked ? (e) => handleSlotDrop(e, seg.index) : undefined}
							onDragOver={!locked ? handleSlotDragOver : undefined}
							onClick={!locked && !!item ? () => onRemoveFromSlot(seg.index) : undefined}
							title={!locked && !!item ? "Click to remove" : undefined}
							className={cn(
								"mx-1 inline-flex min-w-[7rem] items-center justify-center rounded-md border px-2.5 py-0.5 text-sm font-medium transition-colors",
								state === "empty" &&
									"border-dashed border-(--border) text-(--text-muted)",
								state === "filled" &&
									"cursor-pointer border-(--border-strong) bg-(--surface) text-(--text-primary) hover:border-red-400/50 hover:text-red-400",
								state === "correct" &&
									"border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
								state === "wrong" &&
									"border-red-400/50 bg-red-400/10 text-red-400",
							)}
						>
							{item ?? <span className="opacity-40">drop here</span>}
						</span>
					);
				})}
			</div>

			{/* Draggable items pool */}
			{!locked && (
				<div className="flex flex-wrap gap-2">
					{question.items.map((item) => {
						const isUsed = usedItems.has(item);
						return (
							<div
								key={item}
								draggable={!isUsed}
								onDragStart={!isUsed ? (e) => handleDragStart(e, item) : undefined}
								className={cn(
									"select-none rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
									isUsed
										? "cursor-default border-(--border) text-(--text-muted) opacity-30"
										: "cursor-grab border-(--border-strong) text-(--text-primary) hover:bg-(--hover) active:cursor-grabbing",
								)}
							>
								{item}
							</div>
						);
					})}
				</div>
			)}

			{/* Correct answers shown after a wrong submission */}
			{locked && !result.isCorrect && (
				<p className="text-sm text-(--text-muted)">
					Correct:{" "}
					{question.blanks.map((b, i) => (
						<span key={i} className="font-semibold text-emerald-400">
							{b}
							{i < question.blanks.length - 1 ? ", " : ""}
						</span>
					))}
				</p>
			)}

			{/* Check button */}
			{!locked && (
				<button
					disabled={!allFilled}
					onClick={onSubmit}
					className={cn(
						"rounded-lg px-4 py-2 text-sm font-medium transition-colors",
						allFilled
							? "bg-blue-600 text-white hover:bg-blue-500"
							: "cursor-not-allowed border border-(--border) text-(--text-muted) opacity-50",
					)}
				>
					Check Answer
				</button>
			)}

			{/* Explanation */}
			{locked && (
				<div
					className={cn(
						"rounded-lg border px-4 py-3 text-sm leading-relaxed",
						result.isCorrect
							? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
							: "border-red-400/30 bg-red-400/5 text-red-400",
					)}
				>
					{question.explanation}
				</div>
			)}
		</div>
	);
}
