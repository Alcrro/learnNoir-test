import React from "react";
import DefaultButton from "../../../../components/atoms/DefaultButton";

const SubjectClearSearchBtn = ({
	onSearchChange,
}: {
	onSearchChange: (val: string) => void;
}) => {
	return (
		<DefaultButton
			type="button"
			variant="icon"
			onClick={() => onSearchChange("")}
			className="absolute inset-y-0 right-3 flex items-center text-(--text-muted) transition hover:text-(--text-primary)"
			aria-label="Clear search"
		>
			<svg
				className="h-4 w-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={2.5}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</DefaultButton>
	);
};

export default SubjectClearSearchBtn;
