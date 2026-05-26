import type { Token, TokenKind } from "./types";

const KEYWORDS = new Set([
	"function", "for", "let", "const", "if", "else", "return",
	"while", "break", "continue", "new", "typeof", "var", "of", "in",
	"true", "false", "null", "undefined",
]);

export const TOKEN_VAR: Record<TokenKind, string> = {
	keyword:  "var(--lt-code-keyword)",
	string:   "var(--lt-code-string)",
	comment:  "var(--lt-code-comment)",
	number:   "var(--lt-code-number)",
	operator: "var(--lt-code-operator)",
	plain:    "var(--lt-code-plain)",
};

export function tokenize(text: string): Token[] {
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
