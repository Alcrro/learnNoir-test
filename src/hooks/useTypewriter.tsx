import { useEffect, useRef, useState } from "react";

const useTypewriter = (text: string, isActive: boolean, speed: number = 20) => {
	const [displayedText, setDisplayedText] = useState("");
	const hasPlayedRef = useRef(false);

	useEffect(() => {
		if (!isActive) return;

		if (hasPlayedRef.current) return;

		hasPlayedRef.current = true;
		let i = 0;
		setDisplayedText("");

		const interval = setInterval(() => {
			i++;
			setDisplayedText(text.slice(0, i));

			if (i >= text.length) clearInterval(interval);
		}, speed);

		return () => clearInterval(interval);
	}, [isActive, text, speed]);

	// useEffect(() => {
	// 	if (!isActive) {
	// 		hasPlayedRef.current = false;
	// 		setDisplayedText("");
	// 	}
	// }, [isActive]);
	return displayedText;
};

export default useTypewriter;
