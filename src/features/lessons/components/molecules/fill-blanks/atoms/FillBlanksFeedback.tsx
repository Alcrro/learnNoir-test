import { CheckCircle2, XCircle } from "lucide-react";

type Props = { allCorrect: boolean; wrongCount: number };

export function FillBlanksFeedback({ allCorrect, wrongCount }: Props) {
	return (
		<div style={{
			borderTop: "1px solid var(--lt-code-border)",
			padding: "10px 14px",
			display: "flex",
			alignItems: "center",
			gap: 8,
			fontSize: 13,
			fontWeight: 500,
			color: allCorrect ? "var(--lt-code-blank-correct)" : "var(--amber-text)",
		}}>
			{allCorrect ? (
				<><CheckCircle2 size={15} /> Toate golurile sunt corecte!</>
			) : (
				<><XCircle size={15} /> {wrongCount} gol{wrongCount !== 1 ? "uri" : ""} greșit{wrongCount !== 1 ? "e" : ""} — recitește și încearcă din nou.</>
			)}
		</div>
	);
}
