import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "../../../../../../../libs/utils/cn";

export type OptionState = "default" | "selected-pending" | "correct" | "wrong" | "missed";

type Props = {
	label: string;
	state: OptionState;
	onClick?: () => void;
	disabled?: boolean;
};

export function QuizOption({ label, state, onClick, disabled }: Props) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={cn(
				"flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all",
				state === "default" &&
					"border-(--border) text-(--text-secondary) hover:border-(--border-strong) hover:bg-(--hover) disabled:cursor-not-allowed disabled:opacity-50",
				state === "selected-pending" &&
					"border-(--border-strong) bg-(--hover) text-(--text-primary)",
				state === "correct" && "border-emerald-500 bg-emerald-500/10 text-emerald-400",
				state === "wrong" && "border-red-400 bg-red-400/10 text-red-400",
				state === "missed" && "border-emerald-500/40 text-emerald-400/70",
			)}
		>
			<span>{label}</span>
			{state === "correct" && <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />}
			{state === "wrong" && <XCircle className="h-4 w-4 shrink-0 text-red-400" />}
		</button>
	);
}
