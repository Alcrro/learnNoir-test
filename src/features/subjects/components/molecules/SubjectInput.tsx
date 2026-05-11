import React from "react";

const SubjectInput = ({
	search,
	onSearch,
}: {
	search: string;
	onSearch: (query: string) => void;
}) => {
	return (
		<input
			type="search"
			value={search}
			onChange={(e) => onSearch(e.target.value)}
			placeholder="Search subjects or tags..."
			className={[
				"w-full h-9 pl-9 pr-8 text-xs",
				"bg-(--bg-card)",
				"border border-(--border)",
				"rounded-lg text-(--text-secondary)",
				"placeholder:text-(--text-secondary)",
				"focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 dark:focus:border-indigo-600",
				"transition-colors duration-150",
			].join(" ")}
		/>
	);
};

export default SubjectInput;
