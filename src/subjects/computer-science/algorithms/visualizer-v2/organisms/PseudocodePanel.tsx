import type { FC } from "react";
import { Code2, Lightbulb } from "lucide-react";
import { cn } from "../../../../../libs/utils/cn";
import type { AlgorithmTypes, Step } from "../../shared/AlgorithmTypes";
import { pseudocodeRegistry } from "../registry/pseudocodeRegistry";

type Props = {
	algorithm: AlgorithmTypes | null;
	currentStep: number;
	steps: Step[];
};

const PseudocodePanel: FC<Props> = ({ algorithm, currentStep, steps }) => {
	const entry = algorithm ? pseudocodeRegistry[algorithm] : null;
	if (!entry) return null;

	const step = currentStep >= 0 ? steps[currentStep] : null;

	const activeLines: number[] =
		step?.line === undefined
			? []
			: Array.isArray(step.line)
				? step.line
				: [step.line];

	const doc = step ? entry.docs(step) : null;

	return (
		<div className="flex flex-col gap-3 h-full">
			{/* Pseudocode block */}
			<div className="rounded-xl border border-(--border) overflow-hidden">
				<div className="flex items-center gap-2 px-4 py-2.5 border-b border-(--border) bg-(--bg-secondary)">
					<Code2 size={12} className="text-(--text-muted)" strokeWidth={2} />
					<span className="text-xs font-medium text-(--text-secondary) tracking-wide">
						Pseudocode
					</span>
				</div>

				<div className="p-3 font-mono">
					{entry.lines.map((line, index) => {
						const isActive = activeLines.includes(index);
						return (
							<div
								key={index}
								style={{ paddingLeft: `${line.indent * 14}px` }}
								className={cn(
									"flex items-baseline gap-2.5 py-[3px] px-2 rounded-md",
									"transition-colors duration-150",
									isActive
										? "bg-(--default_color)/10 text-(--text-primary)"
										: "text-(--text-muted) hover:text-(--text-secondary)",
								)}
							>
								<span className="text-[10px] tabular-nums w-4 text-right shrink-0 select-none opacity-40">
									{index + 1}
								</span>
								<span
									className={cn(
										"text-xs leading-relaxed",
										isActive && "font-semibold",
									)}
								>
									{line.text}
								</span>
							</div>
						);
					})}
				</div>
			</div>

			{/* Step explanation */}
			{doc ? (
				<div className="rounded-xl border border-(--border) overflow-hidden">
					<div className="flex items-center gap-2 px-4 py-2.5 border-b border-(--border) bg-(--bg-secondary)">
						<Lightbulb size={12} className="text-(--text-muted)" strokeWidth={2} />
						<span className="text-xs font-medium text-(--text-secondary) tracking-wide uppercase">
							{doc.title}
						</span>
					</div>
					<div className="p-4 flex flex-col gap-3">
						<p className="text-xs text-(--text-primary) leading-relaxed">
							{doc.explanation}
						</p>
						{doc.logic && (
							<p className="text-xs text-(--text-muted) leading-relaxed">
								{doc.logic}
							</p>
						)}
						{doc.mnemonic && (
							<p className="text-xs text-(--text-muted) italic border-t border-(--border) pt-3">
								✦ {doc.mnemonic}
							</p>
						)}
					</div>
				</div>
			) : (
				<div className="rounded-xl border border-(--border) border-dashed p-5 flex items-center justify-center">
					<p className="text-xs text-(--text-muted) text-center">
						Press play or step forward to see the explanation
					</p>
				</div>
			)}
		</div>
	);
};

export default PseudocodePanel;
