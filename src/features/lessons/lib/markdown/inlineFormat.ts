import { escapeHtml } from "./escapeHtml";

export function inlineFormat(text: string): string {
	return escapeHtml(text)
		.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
		.replace(/\*(.+?)\*/g, "<em>$1</em>")
		.replace(/`(.+?)`/g, "<code>$1</code>");
}
