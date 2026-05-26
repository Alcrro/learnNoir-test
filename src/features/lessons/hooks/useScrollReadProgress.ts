import { useEffect, useRef, useState } from "react";

type Options = {
	disabled: boolean;
	onComplete: () => void;
};

export function useScrollReadProgress({ disabled, onComplete }: Options) {
	const contentRef = useRef<HTMLDivElement>(null);
	const [scrollProgress, setScrollProgress] = useState(0);
	const [hasScrollableContent, setHasScrollableContent] = useState(false);

	useEffect(() => {
		if (disabled) return;

		function calcProgress() {
			const el = contentRef.current;
			if (!el) return;

			const elTop = el.getBoundingClientRect().top + window.scrollY;
			const scrollEnd = elTop + el.offsetHeight - window.innerHeight;

			if (scrollEnd <= 0) {
				setHasScrollableContent(false);
				return;
			}

			setHasScrollableContent(true);
			const pct = Math.min(
				100,
				Math.max(0, Math.round(((window.scrollY - elTop) / scrollEnd) * 100)),
			);
			setScrollProgress(pct);
			if (pct >= 95) onComplete();
		}

		calcProgress();
		window.addEventListener("scroll", calcProgress, { passive: true });
		return () => window.removeEventListener("scroll", calcProgress);
	}, [disabled, onComplete]);

	return { contentRef, scrollProgress, hasScrollableContent };
}
