import { type FC } from "react";
import { cn } from "../../../../libs/utils/cn";

type Props = {
	code: string[];
	activeLine: number;
};

const EventLoopCodeDisplay: FC<Props> = ({ code, activeLine }) => (
	<div className="rounded-xl border border-(--border) overflow-hidden h-fit">
		<div className="flex items-center gap-2 px-4 py-2.5 border-b border-(--border) bg-(--bg-secondary)">
			<div className="flex gap-1.5">
				<div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
				<div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
				<div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
			</div>
			<span className="text-xs text-(--text-muted) font-mono ml-2">
				script.js
			</span>
		</div>

		<div className="p-3 font-mono bg-[#0a0a12]">
			{code.map((line, index) => {
				const isActive = index === activeLine;
				return (
					<div
						key={index}
						className={cn(
							"flex items-baseline gap-2.5 py-[3px] px-2 rounded-md transition-colors duration-200",
							isActive
								? "bg-white/8 text-white"
								: "text-white/30",
						)}
					>
						<span className="text-[10px] tabular-nums w-4 text-right shrink-0 select-none opacity-40">
							{index + 1}
						</span>
						<span
							className={cn(
								"text-xs leading-relaxed",
								isActive && "font-semibold",
							)}
						>
							{line || " "}
						</span>
					</div>
				);
			})}
		</div>
	</div>
);

export default EventLoopCodeDisplay;
