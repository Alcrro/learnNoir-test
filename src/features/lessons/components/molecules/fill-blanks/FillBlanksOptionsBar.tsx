import { cn } from "../../../../../libs/utils/cn";
import type { BlankDef } from "./lib/types";

type Props = {
	blank: BlankDef;
	openId: number;
	onSelect: (id: number, val: string) => void;
};

export function FillBlanksOptionsBar({ blank, openId, onSelect }: Props) {
	return (
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
			{blank.options.map((opt) => (
				<button
					key={opt}
					type="button"
					onClick={() => onSelect(openId, opt)}
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
	);
}
