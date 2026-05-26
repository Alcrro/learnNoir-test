import { TokenSpan } from "./atoms/TokenSpan";
import { BlankButton } from "./atoms/BlankButton";
import { parseLineSegs } from "./lib/parseLineSegs";
import type { BlankDef } from "./lib/types";

type Props = {
	line: string;
	lineNumber: number;
	blankMap: Record<number, BlankDef>;
	answers: Record<number, string>;
	openId: number | null;
	onToggle: (id: number) => void;
};

export function CodeLine({ line, lineNumber, blankMap, answers, openId, onToggle }: Props) {
	return (
		<tr style={{ verticalAlign: "top" }}>
			<td style={{
				padding: "0 16px 0 14px",
				color: "var(--lt-code-linenum)",
				textAlign: "right",
				userSelect: "none",
				minWidth: 36,
				whiteSpace: "nowrap",
			}}>
				{lineNumber}
			</td>
			<td style={{ padding: "0 20px 0 0", whiteSpace: "pre" }}>
				{parseLineSegs(line).map((seg, si) => {
					if (seg.kind === "text") {
						return (
							<span key={si}>
								{seg.tokens.map((tok, ti) => (
									<TokenSpan key={ti} token={tok} />
								))}
							</span>
						);
					}
					const blank = blankMap[seg.id];
					if (!blank) return null;
					return (
						<BlankButton
							key={si}
							id={seg.id}
							answer={answers[seg.id]}
							correct={blank.correct}
							isOpen={openId === seg.id}
							onToggle={onToggle}
						/>
					);
				})}
			</td>
		</tr>
	);
}
