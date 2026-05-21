import { useState } from "react";
import { CheckCircle2, Code2, XCircle } from "lucide-react";
import "../../../../features/computer-science/algorithms/components/lesson/lessonTheory.css";
import type { AnyNode } from "../tabs/theory/node-registry";
import { useLessonContext } from "../../context/LessonContext";
import { useUpsertProgressMutation } from "../../hooks/useLessonProgressQuery";
import { cn } from "../../../../libs/utils/cn";

// ── syntax highlighting ───────────────────────────────────────────────────────

const KEYWORDS = new Set([
	"function", "for", "let", "const", "if", "else", "return",
	"while", "break", "continue", "new", "typeof", "var", "of", "in",
	"true", "false", "null", "undefined",
]);

type TokenKind = "keyword" | "string" | "comment" | "number" | "operator" | "plain";
type Token = { kind: TokenKind; text: string };

// CSS variable names — resolved from _themes.scss at runtime
const TOKEN_VAR: Record<TokenKind, string> = {
	keyword:  "var(--lt-code-keyword)",
	string:   "var(--lt-code-string)",
	comment:  "var(--lt-code-comment)",
	number:   "var(--lt-code-number)",
	operator: "var(--lt-code-operator)",
	plain:    "var(--lt-code-plain)",
};

function tokenize(text: string): Token[] {
	const out: Token[] = [];
	let i = 0;
	while (i < text.length) {
		if (text[i] === "/" && text[i + 1] === "/") {
			out.push({ kind: "comment", text: text.slice(i) });
			return out;
		}
		const q = text[i];
		if (q === '"' || q === "'") {
			let j = i + 1;
			while (j < text.length && text[j] !== q) j++;
			out.push({ kind: "string", text: text.slice(i, j + 1) });
			i = j + 1;
			continue;
		}
		if (/[a-zA-Z_$]/.test(text[i])) {
			let j = i;
			while (j < text.length && /[a-zA-Z_$0-9]/.test(text[j])) j++;
			const word = text.slice(i, j);
			out.push({ kind: KEYWORDS.has(word) ? "keyword" : "plain", text: word });
			i = j;
			continue;
		}
		if (/\d/.test(text[i])) {
			let j = i;
			while (j < text.length && /\d/.test(text[j])) j++;
			out.push({ kind: "number", text: text.slice(i, j) });
			i = j;
			continue;
		}
		if ("+-*/<>=!&|?:".includes(text[i])) {
			out.push({ kind: "operator", text: text[i] });
			i++;
			continue;
		}
		let j = i;
		while (j < text.length && !/[a-zA-Z_$0-9"'/+\-*<>=!&|?:]/.test(text[j])) j++;
		if (j === i) j++;
		out.push({ kind: "plain", text: text.slice(i, j) });
		i = j;
	}
	return out;
}

// ── line segment parsing ──────────────────────────────────────────────────────

type Seg = { kind: "text"; tokens: Token[] } | { kind: "blank"; id: number };

function parseLineSegs(line: string): Seg[] {
	return line.split(/\{\{(\d+)\}\}/).map((part, i) =>
		i % 2 === 0
			? { kind: "text" as const, tokens: tokenize(part) }
			: { kind: "blank" as const, id: Number(part) },
	);
}

type BlankDef = { id: number; options: string[]; correct: string };

// ── component ─────────────────────────────────────────────────────────────────

export function FillBlanksNode({ node }: { node: AnyNode }) {
	const title    = typeof node.title    === "string" ? node.title    : undefined;
	const content  = typeof node.content  === "string" ? node.content  : "";
	const language = typeof node.language === "string" ? node.language : undefined;
	const blanks: BlankDef[] = Array.isArray(node.blanks)
		? (node.blanks as BlankDef[]).filter(
				(b) => typeof b.id === "number" && Array.isArray(b.options) && typeof b.correct === "string",
			)
		: [];

	const { lessonId } = useLessonContext();
	const { mutate: upsertProgress } = useUpsertProgressMutation(lessonId);

	const [answers, setAnswers] = useState<Record<number, string>>({});
	const [openId,  setOpenId]  = useState<number | null>(null);

	if (!content || blanks.length === 0) return null;

	const blankMap    = Object.fromEntries(blanks.map((b) => [b.id, b]));
	const lines       = content.split("\n");
	const allAnswered = blanks.every((b) => answers[b.id] !== undefined);
	const allCorrect  = allAnswered && blanks.every((b) => answers[b.id] === b.correct);
	const wrongCount  = blanks.filter((b) => answers[b.id] !== undefined && answers[b.id] !== b.correct).length;
	const activeBlank = openId !== null ? blankMap[openId] : null;

	function handleSelect(id: number, val: string) {
		setAnswers((prev) => ({ ...prev, [id]: val }));
		setOpenId(null);
		upsertProgress({ status: "in_progress" });
	}

	return (
		<div className="lt-code-runner">
			{/* Header */}
			<div className="lt-code-runner__header" style={{ background: "var(--lt-code-header-bg)", borderBottomColor: "var(--lt-code-border)" }}>
				<div className="lt-code-runner__badge">
					<Code2 size={10} aria-hidden />
					{title ?? "Completează codul"}
				</div>
				{language && (
					<span style={{ fontSize: 11, color: "var(--lt-code-comment)", fontFamily: "monospace" }}>
						{language}
					</span>
				)}
			</div>

			{/* Code block */}
			<div style={{ background: "var(--lt-code-bg)", overflowX: "auto" }}>
				<table style={{
					borderCollapse: "collapse",
					width: "100%",
					fontFamily: "JetBrains Mono, Fira Code, ui-monospace, monospace",
					fontSize: 13,
					lineHeight: "22px",
				}}>
					<tbody>
						{lines.map((line, li) => (
							<tr key={li} style={{ verticalAlign: "top" }}>
								<td style={{
									padding: "0 16px 0 14px",
									color: "var(--lt-code-linenum)",
									textAlign: "right",
									userSelect: "none",
									minWidth: 36,
									whiteSpace: "nowrap",
								}}>
									{li + 1}
								</td>
								<td style={{ padding: "0 20px 0 0", whiteSpace: "pre" }}>
									{parseLineSegs(line).map((seg, si) => {
										if (seg.kind === "text") {
											return (
												<span key={si}>
													{seg.tokens.map((tok, ti) => (
														<span key={ti} style={{ color: TOKEN_VAR[tok.kind] }}>
															{tok.text}
														</span>
													))}
												</span>
											);
										}
										const blank    = blankMap[seg.id];
										if (!blank) return null;
										const answer   = answers[seg.id];
										const answered = answer !== undefined;
										const isCorrect = answered && answer === blank.correct;
										const isOpen   = openId === seg.id;
										const borderColor = answered
											? isCorrect ? "var(--lt-code-blank-correct)" : "var(--lt-code-blank-wrong)"
											: "var(--lt-code-blank-idle)";
										const textColor = answered
											? isCorrect ? "var(--lt-code-blank-correct)" : "var(--lt-code-blank-wrong)"
											: "var(--lt-code-blank-idle)";
										return (
											<button
												key={si}
												type="button"
												onClick={() => { if (!answered) setOpenId((p) => (p === seg.id ? null : seg.id)); }}
												style={{
													display: "inline-block",
													padding: "0 8px",
													margin: "0 2px",
													borderRadius: 4,
													border: `1px ${answered ? "solid" : "dashed"} ${borderColor}`,
													background: isOpen ? `color-mix(in srgb, ${borderColor} 15%, transparent)` : "transparent",
													color: textColor,
													fontFamily: "inherit",
													fontSize: "inherit",
													lineHeight: "inherit",
													cursor: answered ? "default" : "pointer",
													whiteSpace: "nowrap",
													transition: "background 0.15s",
												}}
											>
												{answered ? answer : "___"}
											</button>
										);
									})}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Options bar */}
			{activeBlank && (
				<div style={{
					borderTop: "1px solid var(--lt-code-border)",
					background: "var(--lt-code-options-bg)",
					padding: "10px 14px",
					display: "flex",
					alignItems: "center",
					gap: 8,
					flexWrap: "wrap",
				}}>
					<span style={{ fontSize: 11, color: "var(--lt-code-comment)", fontFamily: "monospace", marginRight: 4 }}>
						alege:
					</span>
					{activeBlank.options.map((opt) => (
						<button
							key={opt}
							type="button"
							onClick={() => handleSelect(openId!, opt)}
							className={cn(
								"px-3 py-1 rounded text-xs font-mono transition-colors",
								"border border-(--border) bg-(--surface) text-(--text-primary)",
								"hover:border-blue-400 hover:text-blue-400",
							)}
						>
							{opt}
						</button>
					))}
				</div>
			)}

			{/* Feedback */}
			{allAnswered && (
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
			)}
		</div>
	);
}
