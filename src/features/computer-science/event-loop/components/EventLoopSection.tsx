import { type FC } from "react";
import { cn } from "../../../../libs/utils/cn";
import type { EventLoopItem } from "../types/eventLoop.types";

type Props = {
	title: string;
	items: EventLoopItem[];
	color: string;
	minHeight?: number;
	className?: string;
};

const EventLoopSection: FC<Props> = ({
	title,
	items,
	color,
	minHeight = 120,
	className,
}) => (
	<div
		className={cn("relative rounded-xl border-2 p-4", className)}
		style={{
			borderColor: color,
			boxShadow: `0 0 20px ${color}30`,
			minHeight,
		}}
	>
		<span
			className="absolute -top-3.5 left-4 px-3 py-0.5 text-[11px] font-semibold rounded-md border"
			style={{
				backgroundColor: "#0a0a12",
				borderColor: `${color}60`,
				color,
			}}
		>
			{title}
		</span>

		<div className="flex flex-wrap gap-2 pt-1 content-start h-full">
			{items.map((item) => (
				<div
					key={item.id}
					data-flip-id={item.id}
					className="px-3 py-1.5 rounded-lg text-xs font-mono border"
					style={{
						borderColor: `${color}70`,
						color,
						backgroundColor: `${color}15`,
					}}
				>
					{item.label}
				</div>
			))}
		</div>
	</div>
);

export default EventLoopSection;
