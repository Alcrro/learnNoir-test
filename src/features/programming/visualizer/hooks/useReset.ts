import type { RefObject } from "react";
import { gsap } from "gsap";

export const useReset = (
	boxesRef: RefObject<HTMLDivElement[]>,
	setCurrentStep: (value: number) => void,
) => {
	const reset = () => {
		if (!boxesRef.current) return;

		boxesRef.current.forEach((box) => {
			const bar = box?.querySelector('[data-role="bar"]');
			if (!bar) return;
			gsap.killTweensOf(bar);

			gsap.set(bar, {
				x: 0,
				y: 0,
				zIndex: 1,
				clearProps: "backgroundColor",
				color: "var(--text-primary)",
				scale: 1,
			});
		});

		setCurrentStep(-1);
		resetAllHighlights(boxesRef.current);
	};

	return { reset };
};
export const resetAllHighlights = (boxes: HTMLDivElement[]) => {
	boxes.forEach((box) => {
		if (!box) return;

		gsap.killTweensOf(box);
		// gsap.set(box, { clearProps: "backgroundColor" });
	});
};
