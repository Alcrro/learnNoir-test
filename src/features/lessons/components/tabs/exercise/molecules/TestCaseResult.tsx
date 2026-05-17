import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "../../../../../../libs/utils/cn";
import type { TestRunResult } from "../lib/exerciseTypes";

type Props = {
	result: TestRunResult;
	index: number;
};

export function TestCaseResult({ result, index }: Props) {
	const Icon = result.error
		? AlertCircle
		: result.passed
			? CheckCircle2
			: XCircle;

	return (
		<div
			className={cn(
				"rounded-lg border p-3 text-xs font-mono space-y-1.5",
				result.passed
					? "border-emerald-500/30 bg-emerald-500/5"
					: result.error
						? "border-amber-500/30 bg-amber-500/5"
						: "border-red-500/30 bg-red-500/5",
			)}
		>
			<div className="flex items-center gap-2">
				<Icon
					className={cn(
						"h-3.5 w-3.5 shrink-0",
						result.passed
							? "text-emerald-400"
							: result.error
								? "text-amber-400"
								: "text-red-400",
					)}
				/>
				<span
					className={cn(
						"font-semibold",
						result.passed ? "text-emerald-400" : result.error ? "text-amber-400" : "text-red-400",
					)}
				>
					Test {index + 1} — {result.passed ? "trecut" : result.error ? "eroare" : "eșuat"}
				</span>
				<span className="ml-auto text-(--text-muted)">{result.executionTimeMs}ms</span>
			</div>

			<div className="space-y-1 pl-5 text-(--text-muted)">
				<div>
					<span className="text-(--text-secondary)">Input: </span>
					{JSON.stringify(result.input)}
				</div>
				<div>
					<span className="text-(--text-secondary)">Așteptat: </span>
					{JSON.stringify(result.expected)}
				</div>
				{!result.passed && (
					<div>
						<span className="text-(--text-secondary)">Primit: </span>
						{result.error ? (
							<span className="text-amber-400">{result.error}</span>
						) : (
							JSON.stringify(result.actual)
						)}
					</div>
				)}
			</div>
		</div>
	);
}
