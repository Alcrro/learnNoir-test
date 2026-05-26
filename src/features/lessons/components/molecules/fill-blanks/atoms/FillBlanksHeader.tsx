import { Code2 } from "lucide-react";
import { NodeBadge } from "../../../atoms/NodeBadge";

type Props = { title: string | undefined; language: string | undefined };

export function FillBlanksHeader({ title, language }: Props) {
	return (
		<div
			className="lt-code-runner__header"
			style={{ background: "var(--lt-code-header-bg)", borderBottomColor: "var(--lt-code-border)" }}
		>
			<NodeBadge label={title ?? "Completează codul"} icon={<Code2 size={10} aria-hidden />} />
			{language && (
				<span style={{ fontSize: 11, color: "var(--lt-code-comment)", fontFamily: "monospace" }}>
					{language}
				</span>
			)}
		</div>
	);
}
