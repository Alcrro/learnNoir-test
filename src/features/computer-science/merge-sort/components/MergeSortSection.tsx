import { type FC } from "react";
import { cn } from "../../../../libs/utils/cn";
import type { EventLoopItem } from "../../event-loop/types/eventLoop.types";

type Props = {
	title: string;
	items: EventLoopItem[];
	color: string;
	className?: string;
};

const MergeSortSection: FC<Props> = ({ title, items, color, className }) => {
	const hasItems = items.length > 0;

	return (
		<div
			className={cn("relative rounded-xl border-2 p-4 min-h-16", className)}
			style={{
				borderColor: hasItems ? color : `${color}35`,
				borderStyle: hasItems ? "solid" : "dashed",
				boxShadow: hasItems ? `0 0 20px ${color}28` : "none",
			}}
		>
			<span
				className="absolute -top-3.5 left-4 px-3 py-0.5 text-[11px] font-semibold rounded-md border"
				style={{
					backgroundColor: "#0a0a12",
					borderColor: hasItems ? `${color}55` : `${color}28`,
					color: hasItems ? color : `${color}55`,
				}}
			>
				{title}
			</span>

			<div className="flex flex-wrap gap-2 pt-1 items-center">
				{hasItems ? (
					items.map((item) => (
						<div
							key={item.id}
							data-flip-id={item.id}
							className="w-9 h-9 flex items-center justify-center rounded-lg border font-bold text-sm shrink-0"
							style={{
								borderColor: `${color}65`,
								color,
								backgroundColor: `${color}18`,
							}}
						>
							{item.label}
						</div>
					))
				) : (
					<span
						className="text-xs italic"
						style={{ color: `${color}40` }}
					>
						empty
					</span>
				)}
			</div>
		</div>
	);
};

export default MergeSortSection;
