import { Code2 } from "lucide-react";
import { NodeBadge } from "../../../atoms/NodeBadge";
import { LangDropdown } from "../../../atoms/LangDropdown";

type Props = {
	title: string | undefined;
	language: string | undefined;
	languages?: string[];
	activeLanguage?: string;
	onLanguageChange?: (lang: string) => void;
};

export function FillBlanksHeader({ title, language, languages, activeLanguage, onLanguageChange }: Props) {
	return (
		<div
			className="lt-code-runner__header"
			style={{ background: "var(--lt-code-header-bg)", borderBottomColor: "var(--lt-code-border)" }}
		>
			<NodeBadge label={title ?? "Completează codul"} icon={<Code2 size={10} aria-hidden />} />
			{languages && languages.length > 1 && activeLanguage && onLanguageChange ? (
				<LangDropdown languages={languages} active={activeLanguage} onChange={onLanguageChange} />
			) : (
				language && (
					<span style={{ fontSize: 11, color: "var(--lt-code-comment)", fontFamily: "monospace" }}>
						{language}
					</span>
				)
			)}
		</div>
	);
}
