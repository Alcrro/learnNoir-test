import React from "react";

const SubjectSearchButn = ({
	onSearch,
}: {
	onSearch: (val: string) => void;
}) => {
	return (
		<button
			onClick={() => onSearch("")}
			aria-label="Clear search"
			className="absolute inset-y-0 right-2.5 flex items-center text-(--text-secondary) hover:text-(--text-primary) dark:hover:text-(--text-primary) transition-colors"
		>
			<svg
				className="w-3 h-3"
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
		</button>
	);
};

export default SubjectSearchButn;
