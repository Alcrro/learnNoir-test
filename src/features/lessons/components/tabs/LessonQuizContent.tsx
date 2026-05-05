import { useState } from "react";
import { CheckCircle, XCircle, ChevronRight } from "lucide-react";
import { cn } from "../../../../libs/utils/cn";
import type { AssessmentBlock } from "../../api/lessonBlocksApi";
import { useUpsertProgressMutation } from "../../hooks/useLessonProgressQuery";

// ---------------------------------------------------------------------------
// MCQ quiz block
// ---------------------------------------------------------------------------

type McqData = {
	question: string;
	options: string[];
	correctIndex: number;
};

function McqBlock({
	block,
	onCorrect,
}: {
	block: AssessmentBlock;
	onCorrect: () => void;
}) {
	const data = block.data as unknown as McqData;
	const [selected, setSelected] = useState<number | null>(null);

	const answered = selected !== null;
	const isCorrect = selected === data.correctIndex;

	const handleSelect = (i: number) => {
		if (answered) return;
		setSelected(i);
		if (i === data.correctIndex) onCorrect();
	};

	return (
		<div className="rounded-xl border border-(--border) bg-(--surface) p-5">
			<p className="font-medium text-(--text-primary) mb-4">{data.question}</p>
			<div className="space-y-2">
				{data.options.map((option, i) => {
					const isSelected = selected === i;
					const correct = i === data.correctIndex;

					return (
						<button
							key={i}
							onClick={() => handleSelect(i)}
							disabled={answered}
							className={cn(
								"w-full text-left rounded-lg border px-4 py-3 text-sm transition-all",
								!answered && "hover:border-(--border-strong) hover:bg-(--hover)",
								isSelected && isCorrect && "border-emerald-500 bg-emerald-500/10 text-emerald-400",
								isSelected && !isCorrect && "border-red-400 bg-red-400/10 text-red-400",
								answered && correct && !isSelected && "border-emerald-500/50 text-emerald-400",
								!isSelected && !answered && "border-(--border) text-(--text-secondary)",
								answered && !correct && !isSelected && "border-(--border) text-(--text-muted) opacity-60",
							)}
						>
							<div className="flex items-center justify-between">
								<span>{option}</span>
								{answered && correct && <CheckCircle className="h-4 w-4 text-emerald-500" />}
								{isSelected && !isCorrect && <XCircle className="h-4 w-4 text-red-400" />}
							</div>
						</button>
					);
				})}
			</div>

			{answered && (
				<p
					className={cn(
						"mt-3 text-sm font-medium",
						isCorrect ? "text-emerald-400" : "text-red-400",
					)}
				>
					{isCorrect ? "Correct!" : `Wrong — the answer is: ${data.options[data.correctIndex]}`}
				</p>
			)}
		</div>
	);
}

// ---------------------------------------------------------------------------
// Input (text answer) quiz block
// ---------------------------------------------------------------------------

type InputData = { question: string; correctAnswer: string | number };

function InputBlock({ block }: { block: AssessmentBlock }) {
	const data = block.data as unknown as InputData;
	const [value, setValue] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const isCorrect =
		submitted &&
		value.trim().toLowerCase() === String(data.correctAnswer).trim().toLowerCase();

	return (
		<div className="rounded-xl border border-(--border) bg-(--surface) p-5">
			<p className="font-medium text-(--text-primary) mb-4">{data.question}</p>
			<div className="flex gap-2">
				<input
					type="text"
					value={value}
					disabled={submitted}
					onChange={(e) => setValue(e.target.value)}
					placeholder="Your answer…"
					className="flex-1 rounded-lg border border-(--border) bg-(--bg) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--border-strong) disabled:opacity-60"
				/>
				{!submitted && (
					<button
						onClick={() => setSubmitted(true)}
						disabled={!value.trim()}
						className="flex items-center gap-1 rounded-lg border border-(--border) px-4 py-2 text-sm text-(--text-primary) transition hover:border-(--border-strong) disabled:opacity-40"
					>
						<span>Check</span>
						<ChevronRight className="h-3.5 w-3.5" />
					</button>
				)}
			</div>
			{submitted && (
				<p
					className={cn(
						"mt-3 text-sm font-medium",
						isCorrect ? "text-emerald-400" : "text-red-400",
					)}
				>
					{isCorrect ? "Correct!" : `Wrong — expected: ${data.correctAnswer}`}
				</p>
			)}
		</div>
	);
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

type Props = {
	blocks: AssessmentBlock[];
	lessonId: string;
};

export function LessonQuizContent({ blocks, lessonId }: Props) {
	const { mutate: upsertProgress } = useUpsertProgressMutation(lessonId);

	// When a quiz question is answered correctly, push a partial score update.
	const handleCorrect = () => {
		upsertProgress({ status: "in_progress", quizScore: 100 });
	};

	if (blocks.length === 0) {
		return (
			<p className="text-sm text-(--text-muted) py-4">No quiz for this lesson yet.</p>
		);
	}

	return (
		<div className="space-y-6 py-2">
			{blocks.map((block) => {
				if (block.engine === "quiz:mcq")
					return <McqBlock key={block.id} block={block} onCorrect={handleCorrect} />;
				if (block.engine === "quiz:input")
					return <InputBlock key={block.id} block={block} />;
				return (
					<div key={block.id} className="rounded-xl border border-(--border) p-5 text-sm text-(--text-secondary)">
						Quiz type "{block.engine}" not yet supported.
					</div>
				);
			})}
		</div>
	);
}
