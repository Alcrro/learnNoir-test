import { inlineFormat } from "./inlineFormat";

const HEADING_RULES = [
	{ prefix: "### ", tag: "h4", cls: "md-h4" },
	{ prefix: "## ",  tag: "h3", cls: "md-h3" },
	{ prefix: "# ",   tag: "h2", cls: "md-h2" },
] as const;

export function renderMarkdown(raw: string): string {
	const parts: string[] = [];
	let inList = false;

	const closeList = () => {
		if (inList) { parts.push("</ul>"); inList = false; }
	};

	for (const line of raw.split("\n")) {
		const trimmed = line.trim();

		const heading = HEADING_RULES.find(({ prefix }) => trimmed.startsWith(prefix));
		if (heading) {
			closeList();
			parts.push(`<${heading.tag} class="${heading.cls}">${inlineFormat(trimmed.slice(heading.prefix.length))}</${heading.tag}>`);
		} else if (/^[-*] /.test(trimmed)) {
			if (!inList) { parts.push('<ul class="md-ul">'); inList = true; }
			parts.push(`<li>${inlineFormat(trimmed.slice(2))}</li>`);
		} else {
			closeList();
			parts.push(trimmed === "" ? "<br />" : `<p class="md-p">${inlineFormat(trimmed)}</p>`);
		}
	}

	closeList();
	return parts.join("");
}
