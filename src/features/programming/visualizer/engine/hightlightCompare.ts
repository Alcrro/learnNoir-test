import { gsap } from "gsap";

export const highlightCompare = (
	box1: HTMLDivElement,
	box2: HTMLDivElement,
) => {
	const tl = gsap.timeline();

	const arrow1 = box1.querySelector(".compare-arrow") as HTMLElement;
	const arrow2 = box2.querySelector(".compare-arrow") as HTMLElement;

	const bar1 = box1?.querySelector(`[data-role="bar"]`);
	const bar2 = box2?.querySelector(`[data-role="bar"]`);

	tl
		.to([arrow1, arrow2], {
			opacity: 1,
			y: -6,
			duration: 0.2,
		})
		.to([bar1, bar2], {
			scaleX: 1.15,
			scaleY: 1.15,
			backgroundColor: "var(--swap-color)",
			duration: 0.28,
			ease: "power2.out",
		})
		.to([bar1, bar2], {
			scaleX: 1,
			scaleY: 1,
			duration: 0.18,
		})
		.to([arrow1, arrow2], {
			opacity: 0,
			y: 0,
			duration: 0.15,
		});
};
