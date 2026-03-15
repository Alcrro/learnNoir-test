import { useLayoutEffect, type RefObject } from "react";
import { highlightCompare } from "../engine/hightlightCompare";
import { gsap } from "gsap";
import { getComparedIndexes } from "../engine/getComparedIndex";
import { getSortedIndexes } from "../engine/getSortedIndexes";
import type { Step } from "../../algorithms/shared/AlgorithmTypes";

type CompareHighlightProps = {
	hasStarted: boolean;
	steps: Step[];
	currentStep: number;
	boxesRef: RefObject<HTMLDivElement[]>;
};

const useCompareHighlight = (ctx: CompareHighlightProps) => {
	const { hasStarted, boxesRef, currentStep, steps } = ctx;

	useLayoutEffect(() => {
		if (currentStep < -1) return;
		if (!steps.length) return;

		const boxes = boxesRef.current;
		if (!boxes || !boxes.length) return; // ⭐ important

		gsap.set(
			boxes.map((b) => b.querySelector('[data-role="bar"]')).filter(Boolean),
			{
				backgroundColor: "var(--color-blue-500)",
				color: "var(--text-primary)",
				scale: 1,
			},
		);

		const compared = getComparedIndexes(steps, currentStep);
		const sorted = getSortedIndexes(steps, currentStep);

		gsap.set(
			[...compared].map((index) =>
				boxes[index]?.querySelector(`[data-role="bar"]`),
			),
			{
				backgroundColor: "var(--compare-color)",
				color: "var(--text-inverse)",
			},
		);

		gsap.set(
			[...sorted].map((i) => boxes[i]?.querySelector(`[data-role="bar"]`)),
			{
				backgroundColor: "var(--sorted-color)",
			},
		);

		const step = steps[currentStep];
		if (!step?.compare) return;

		const [a, b] = step.compare;

		highlightCompare(boxes[a], boxes[b]);
	}, [currentStep, steps, hasStarted, boxesRef]);
};

export default useCompareHighlight;
