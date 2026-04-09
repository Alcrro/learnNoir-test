import { useRef, type ReactNode } from "react";
import useDraggableInteration, {
	type UseDragProps,
} from "../../../hooks/useDraggableInteration";
import { cn } from "../../../libs/utils/cn";

type DragInteractionProps = { children: ReactNode; className?: string } & Omit<
	UseDragProps,
	"ref"
>;

export const DragInteraction = ({
	children,
	id,
	onDragStart,
	onDrop,
	onHover,
	className,
}: DragInteractionProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useDraggableInteration({ ref, id, onDragStart, onDrop, onHover });

	return (
		<div
			ref={ref}
			data-id={id}
			draggable // 🔥 FĂRĂ ASTA NU EXISTĂ DRAG
			onDragStart={() => onDragStart?.(id)}
			onDragOver={(e) => e.preventDefault()} // 🔥 CRITICAL
			onDragEnter={() => onHover?.(id)} // 🔥 AICI SETEZI hover
			onDrop={onDrop}
			className={cn("cursor-grab flex gap-2", className)}
		>
			{children}
		</div>
	);
};
