import { gsap } from "gsap";
export const resetXAxis = (box1: HTMLDivElement, box2: HTMLDivElement) => {
  return gsap.set([box1, box2], { x: 0 });
};
