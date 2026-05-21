import { gsap } from "gsap";
export const resetHighlight = (box1: HTMLDivElement, box2: HTMLDivElement) => {
  return gsap.to([box1, box2], { backgroundColor: "#3b82f6", duration: 0.2 });
};
