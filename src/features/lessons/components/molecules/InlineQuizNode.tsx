import { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import "../../../../features/computer-science/algorithms/components/lesson/lessonTheory.css";
import "../../../../features/computer-science/algorithms/components/lesson/theory-v2/theoryV2.css";
import type { AnyNode } from "../tabs/theory/node-registry";
import { useLessonContext } from "../../context/LessonContext";
import { useUpsertProgressMutation } from "../tabs/../../../lessons/hooks/useLessonProgressQuery";

type Option = { text: string; correct?: boolean; explanation?: string };

export function InlineQuizNode({ node }: { node: AnyNode }) {
	const question = typeof node.question === "string" ? node.question : "";
	const options = Array.isArray(node.options) ? (node.options as Option[]) : [];
	const [selected, setSelected] = useState<number | null>(null);
	const { lessonId } = useLessonContext();
	const { mutate: upsertProgress } = useUpsertProgressMutation(lessonId);

	if (!question || options.length === 0) return null;

	const answered = selected !== null;
	const selectedOpt = answered ? options[selected] : null;
	const isCorrect = answered && !!selectedOpt?.correct;

	function handleSelect(idx: number) {
		setSelected(idx);
		upsertProgress({ status: "in_progress" });
	}

	return (
		<div className="lt-card">
			<div className="lt-card__header">
				<div className="lt-card__icon lt-card__icon--purple">
					<HelpCircle size={12} aria-hidden />
				</div>
				<span className="lt-card__title">Quick check</span>
			</div>
			<div className="lt-card__body">
				<p className="lt-recall__question">{question}</p>
				<div className="lt-recall__options" style={{ marginTop: "10px" }}>
					{options.map((opt, i) => {
						let cls = "lt-recall__opt";
						if (answered) {
							if (opt.correct) cls += " lt-recall__opt--correct";
							else if (i === selected) cls += " lt-recall__opt--wrong";
							else cls += " lt-recall__opt--dim";
						}
						return (
							<button
								key={i}
								type="button"
								disabled={answered}
								onClick={() => handleSelect(i)}
								className={cls}
							>
								{opt.text}
							</button>
						);
					})}
				</div>
				{answered && (
					<div
						className={`lt-recall__explanation${isCorrect ? " lt-recall__explanation--correct" : " lt-recall__explanation--wrong"}`}
						style={{ marginTop: "8px" }}
					>
						<div className="lt-recall__explanation-icon">
							{isCorrect ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
							<span>{isCorrect ? "Corect!" : "Nu — încearcă să recitești secțiunea."}</span>
						</div>
						{selectedOpt?.explanation && <p>{selectedOpt.explanation}</p>}
					</div>
				)}
			</div>
		</div>
	);
}
