import React from "react";
import DefaultButton from "../../atoms/DefaultButton";

const SubjectResetFilters = ({ onReset }: { onReset: () => void }) => {
	return (
		<DefaultButton
			type="button"
			onClick={onReset}
			className="inline-flex h-10 items-center justify-center rounded-xl border border-(--border) bg-(--bg-secondary) px-4 text-sm font-medium text-(--text-secondary) transition hover:border-(--border-strong) hover:bg-(--bg-elevated) hover:text-(--text-primary)"
		>
			Reset filters
		</DefaultButton>
	);
};

export default SubjectResetFilters;
