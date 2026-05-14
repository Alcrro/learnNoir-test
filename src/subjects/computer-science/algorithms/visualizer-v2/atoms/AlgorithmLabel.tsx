import type { FC } from "react";
import type { AlgorithmTypes } from "../../shared/AlgorithmTypes";
import { cn } from "../../../../../libs/utils/cn";

const nameMap: Record<AlgorithmTypes, string> = {
	"bubble-sort": "Bubble Sort",
	"insertion-sort": "Insertion Sort",
	"heap-sort": "Heap Sort",
	"quick-sort": "Quick Sort",
	"binary-tree-sort": "Binary Tree Sort",
};

type Props = {
	algorithm: AlgorithmTypes | null;
	className?: string;
};

const AlgorithmLabel: FC<Props> = ({ algorithm, className }) => {
	if (!algorithm) return null;
	return (
		<span
			className={cn(
				"text-sm font-semibold text-(--text-primary)",
				className,
			)}
		>
			{nameMap[algorithm] ?? algorithm}
		</span>
	);
};

export default AlgorithmLabel;
