import { useState, useMemo } from "react";
import { CATEGORY_META, SUBJECTS } from "../../subjects/data/subjects.data";
import SubjectsFilter from "../../subjects/components/organisms/SubjectsFilter";
import SubjectsStats from "../../subjects/components/organisms/SubjectsStats";
import { Breadcrumb } from "../../../components/molecules/Breadcrumb";
import { buildCategories } from "../lib/buildCategories";
import { applyFilters } from "../lib/categoriesApplyFilters";
import { groupByCategory } from "../lib/groupByCategory";
import { CategoriesHeader } from "../components/molecules/CategoriesHeader";
import { CategoriesFilterSummary } from "../components/molecules/CategoriesFilterSummary";
import { CategorySection } from "../components/organisms/CategorySection";
import { CategoriesEmptyState } from "../components/organisms/CategoriesEmptyState";
import { useCatalogSubjectsQuery } from "../hooks/useCatalogSubjectsQuery";

export default function CategoriesListPage() {
	const [activeCategory, setActiveCategory] = useState("all");
	const [activeDiff, setActiveDiff] = useState("all");
	const [search, setSearch] = useState("");

	const { data: backendSubjects } = useCatalogSubjectsQuery("computer-science");
	const subjects = backendSubjects ?? SUBJECTS;

	const categories = buildCategories();

	const filtered = useMemo(
		() =>
			applyFilters(subjects, {
				category: activeCategory,
				difficulty: activeDiff,
				search,
			}),
		[subjects, activeCategory, activeDiff, search],
	);

	const grouped = useMemo(() => groupByCategory(filtered), [filtered]);

	const isFiltering =
		activeCategory !== "all" || activeDiff !== "all" || search.trim() !== "";

	function resetFilters() {
		setActiveCategory("all");
		setActiveDiff("all");
		setSearch("");
	}

	return (
		<div className="min-h-screen bg-(--bg-secondary) transition-colors duration-300 rounded-2xl">
			<div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<Breadcrumb />

				<CategoriesHeader
					subjectCount={subjects.length}
					categoryCount={Object.keys(CATEGORY_META).length}
				/>

				<div className="mb-5 mt-2">
					<SubjectsStats subjects={subjects} />
				</div>

				<div className="mb-5">
					<SubjectsFilter
						categories={categories}
						activeCategory={activeCategory}
						activeDiff={activeDiff}
						search={search}
						onCategory={setActiveCategory}
						onDiff={setActiveDiff}
						onSearch={setSearch}
					/>
				</div>

				{isFiltering && (
					<CategoriesFilterSummary
						filteredCount={filtered.length}
						search={search}
						onReset={resetFilters}
					/>
				)}

				{filtered.length > 0 ? (
					<div className="flex flex-col gap-10">
						{grouped.map(([categoryId, items]) => (
							<CategorySection
								key={categoryId}
								categoryId={categoryId}
								meta={CATEGORY_META[categoryId]}
								items={items}
							/>
						))}
					</div>
				) : (
					<CategoriesEmptyState onReset={resetFilters} />
				)}
			</div>
		</div>
	);
}
