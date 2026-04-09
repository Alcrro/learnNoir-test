import { useEffect, type RefObject } from "react";

export type UseDragProps = {
	ref: RefObject<HTMLDivElement | null>;
	id: number;
	onDragStart?: (id: number) => void;
	onHover?: (overId: number) => void;
	onDrop?: () => void;
};
const useDraggableInteration = ({
	ref,
	id,
	onDragStart,
	onHover,
	onDrop,
}: UseDragProps) => {
	useEffect(() => {
		const el = ref?.current;
		if (!el) return;

		let handleMove: (value: PointerEvent) => void;
		let handleUp: () => void;

		const handlePointerDown = (e: PointerEvent) => {
			el.setPointerCapture(e.pointerId);

			onDragStart?.(Number(id));
			let lastHoverId: string | undefined;

			handleMove = (e: PointerEvent) => {
				const elements = document.elementsFromPoint(e.clientX, e.clientY);

				const target = elements
					.map((el) => (el as HTMLElement).closest?.("[data-id]"))
					.find(Boolean) as HTMLElement | null;

				const targetId = target?.dataset.id;

				if (targetId && targetId !== String(id) && targetId !== lastHoverId) {
					lastHoverId = targetId;
					onHover?.(Number(targetId));
				}
			};

			handleUp = () => {
				el.releasePointerCapture(e.pointerId);

				window.removeEventListener("pointermove", handleMove);
				window.removeEventListener("pointerup", handleUp);

				onDrop?.();
			};

			window.addEventListener("pointermove", handleMove);
			window.addEventListener("pointerup", handleUp);
		};

		el.addEventListener("pointerdown", handlePointerDown);

		return () => {
			el.removeEventListener("pointerdown", handlePointerDown);

			// 🔥 cleanup forțat (important)
			if (handleMove) window.removeEventListener("pointermove", handleMove);
			if (handleUp) window.removeEventListener("pointerup", handleUp);
		};
	}, [id, onDragStart, onDrop, onHover, ref]); // 🔥 redu dependențele
};

export default useDraggableInteration;
