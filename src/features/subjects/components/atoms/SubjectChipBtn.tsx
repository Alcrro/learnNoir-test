import React from "react";
import DefaultButton from "../../../../components/atoms/DefaultButton";

type ChipBtnProps = {
	active?: boolean;
	onClick: () => void;
	children: React.ReactNode;
};

const ChipBtn = ({ active, onClick, children }: ChipBtnProps) => {
	return (
		<DefaultButton
			role="tab"
			variant="outline"
			aria-selected={active}
			onClick={onClick}
			className={[
				"h-8 px-3 text-xs font-medium rounded-full",
				"transition-all duration-150",
				"focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40",
				active
					? "bg-(--bg-card) text-(--text-primary) shadow-sm border border-transparent"
					: [
							"text-(--text-secondary)",
							"border border-(--border)",
							"hover:text-(--text-primary)",
							"hover:border-(--border)",
						].join(" "),
			].join(" ")}
		>
			{children}
		</DefaultButton>
	);
};

export default ChipBtn;
