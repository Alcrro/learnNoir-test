import { useEffect, type RefObject } from "react";

interface ToggleDivProps<T extends HTMLElement> {
	ref: RefObject<T | null>;
	active: boolean;
	setActive: () => void;
}
const useToggleDIv = <T extends HTMLElement>({
	ref,
	active,
	setActive,
}: ToggleDivProps<T>) => {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (!ref.current) return;

			if (
				active &&
				event.target instanceof Node &&
				!ref.current.contains(event.target)
			) {
				setActive();
			}
		}
		if (active) {
			window.addEventListener("click", handleClickOutside);
		}

		return () => {
			window.removeEventListener("click", handleClickOutside);
		};
	}, [active, setActive, ref]);
};

export default useToggleDIv;
