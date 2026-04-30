import SubjectResetFilters from "../buttons/SubjectResetFilters";

type SubjectFiltersFooterProps = {
	resultCount: number;
	hasActiveFilters: boolean;
	onReset: () => void;
};
const SubjectFiltersFooter = ({
	resultCount,
	hasActiveFilters,
	onReset,
}: SubjectFiltersFooterProps) => {
	return (
		<div className="mt-4 flex flex-col gap-3 border-t border-(--border) pt-4 sm:flex-row sm:items-center sm:justify-between">
			<p className="text-sm text-(--text-secondary)">
				<span className="font-semibold text-(--text-primary)">{resultCount}</span>{" "}
				subjects match the current filters.
			</p>

			{hasActiveFilters && <SubjectResetFilters onReset={onReset} />}
		</div>
	);
};

export default SubjectFiltersFooter;
