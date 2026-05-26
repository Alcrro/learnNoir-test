import { GripVertical } from "lucide-react";
import { cn } from "../../../../../libs/utils/cn";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

type Props = {
	listeners: SyntheticListenerMap | undefined;
	attributes: DraggableAttributes;
	className?: string;
};

export function DragHandle({ listeners, attributes, className }: Props) {
	return (
		<button
			type="button"
			aria-label="Reordonează bloc"
			className={cn(
				"cursor-grab active:cursor-grabbing touch-none",
				"text-(--text-muted) hover:text-(--text-secondary) transition-colors",
				className,
			)}
			{...listeners}
			{...attributes}
		>
			<GripVertical size={16} />
		</button>
	);
}
