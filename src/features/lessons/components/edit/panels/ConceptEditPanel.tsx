import { useState } from "react";
import type { ConceptBlock, ConceptSection, ConceptQuizOption } from "@shared/lesson-content";
import { Field } from "../shared/Field";
import { PanelActions } from "../shared/PanelActions";
import type { AnyNode } from "../../tabs/theory/node-registry";

type Props = {
	node: ConceptBlock;
	onSave: (n: AnyNode) => void;
	onCancel: () => void;
};

const EMPTY_OPTIONS: ConceptQuizOption[] = [
	{ text: "", correct: false },
	{ text: "", correct: false },
	{ text: "", correct: true },
];

type SectionQuizState = {
	enabled: boolean;
	question: string;
	options: ConceptQuizOption[];
};

function initQuizState(section: ConceptSection): SectionQuizState {
	return {
		enabled: !!section.quiz,
		question: section.quiz?.question ?? "",
		options: section.quiz?.options ?? EMPTY_OPTIONS.map((o) => ({ ...o })),
	};
}

export function ConceptEditPanel({ node, onSave, onCancel }: Props) {
	const [title, setTitle] = useState(node.title);
	const [sectionTexts, setSectionTexts] = useState(node.sections.map((s) => s.text));
	const [quizzes, setQuizzes] = useState<SectionQuizState[]>(() => node.sections.map(initQuizState));

	function updateQuiz(si: number, patch: Partial<SectionQuizState>) {
		setQuizzes((prev) => prev.map((q, i) => (i === si ? { ...q, ...patch } : q)));
	}
	function setOptionField(si: number, oi: number, patch: Partial<ConceptQuizOption>) {
		setQuizzes((prev) =>
			prev.map((q, i) =>
				i !== si ? q : { ...q, options: q.options.map((o, j) => (j === oi ? { ...o, ...patch } : o)) },
			),
		);
	}
	function markCorrect(si: number, oi: number) {
		setQuizzes((prev) =>
			prev.map((q, i) =>
				i !== si ? q : { ...q, options: q.options.map((o, j) => ({ ...o, correct: j === oi })) },
			),
		);
	}

	const updated: ConceptBlock = {
		...node,
		title,
		sections: node.sections.map((s, i) => {
			const qz = quizzes[i];
			const quiz =
				qz?.enabled && qz.question.trim()
					? { question: qz.question, options: qz.options.filter((o) => o.text.trim()) }
					: undefined;
			return { ...s, text: sectionTexts[i] ?? s.text, quiz };
		}),
	};

	return (
		<div className="flex flex-col gap-6">
			<Field label="Title" value={title} onChange={setTitle} />

			{node.sections.map((s, si) => (
				<div key={si} className="flex flex-col gap-3 border border-(--border) rounded-lg p-3">
					<p className="text-xs font-semibold uppercase tracking-widest text-(--text-muted)">{s.label}</p>

					<Field
						label="Text"
						value={sectionTexts[si] ?? s.text}
						onChange={(v) => setSectionTexts((prev) => prev.map((p, j) => (j === si ? v : p)))}
						multiline
					/>

					<label className="flex items-center gap-2 text-xs font-medium text-(--text-primary) cursor-pointer">
						<input
							type="checkbox"
							checked={quizzes[si]?.enabled ?? false}
							onChange={(e) => updateQuiz(si, { enabled: e.target.checked })}
						/>
						Quiz sub această secțiune
					</label>

					{quizzes[si]?.enabled && (
						<>
							<Field
								label="Întrebare"
								value={quizzes[si].question}
								onChange={(v) => updateQuiz(si, { question: v })}
								multiline
							/>
							<p className="text-xs text-(--text-muted)">Opțiuni — click cercul = corect</p>
							{quizzes[si].options.map((opt, oi) => (
								<div key={oi} className="flex items-start gap-2">
									<button
										type="button"
										onClick={() => markCorrect(si, oi)}
										className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 transition-colors ${
											opt.correct
												? "border-teal-500 bg-teal-500"
												: "border-(--border-strong) bg-transparent"
										}`}
									/>
									<div className="flex-1 flex flex-col gap-1">
										<Field
											label={`Opțiunea ${oi + 1}`}
											value={opt.text}
											onChange={(v) => setOptionField(si, oi, { text: v })}
										/>
										<Field
											label="Explicație (opțional)"
											value={opt.explanation ?? ""}
											onChange={(v) => setOptionField(si, oi, { explanation: v })}
										/>
									</div>
								</div>
							))}
						</>
					)}
				</div>
			))}

			<PanelActions onSave={() => onSave(updated)} onCancel={onCancel} />
		</div>
	);
}
