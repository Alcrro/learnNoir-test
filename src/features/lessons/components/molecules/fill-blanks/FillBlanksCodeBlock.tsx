import { CodeLine } from "./CodeLine";
import type { BlankDef } from "./lib/types";

type Props = {
	lines: string[];
	blankMap: Record<number, BlankDef>;
	answers: Record<number, string>;
	openId: number | null;
	onToggle: (id: number) => void;
};

export function FillBlanksCodeBlock({ lines, blankMap, answers, openId, onToggle }: Props) {
	return (
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
						<CodeLine
							key={li}
							line={line}
							lineNumber={li + 1}
							blankMap={blankMap}
							answers={answers}
							openId={openId}
							onToggle={onToggle}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}
