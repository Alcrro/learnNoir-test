import { Shuffle } from "lucide-react";
import { cn } from "../../../../../../libs/utils/cn";

type Props = {
	onClick: () => void;
	className?: string;
};

const GenerateRandomArrayButtonV2 = ({ onClick, className }: Props) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				"group flex items-center gap-2 px-3 py-1.5 rounded-lg shrink-0",
				"text-sm font-medium text-(--text-primary)",
				"bg-(--bg-secondary) border border-(--border)",
				"hover:border-(--border-strong) hover:bg-(--bg-tertiary)",
				"active:scale-[0.97] transition-all duration-100",
				className,
			)}
		>
			<Shuffle
				size={13}
				strokeWidth={2}
				className="text-(--text-muted) group-hover:text-(--text-primary) transition-colors duration-100"
			/>
			<span>Generate</span>
		</button>
	);
};

export default GenerateRandomArrayButtonV2;
