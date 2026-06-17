import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import SubjectsFilter from "../../subjects/components/organisms/SubjectsFilter";
import SubjectsStats from "../../subjects/components/organisms/SubjectsStats";
import { Breadcrumb } from "../../../components/molecules/Breadcrumb";
import { applyFilters } from "../lib/categoriesApplyFilters";
import { mapCatalogToSubjects } from "../lib/mapCatalogToSubjects";
import { CategoriesHeader } from "../components/molecules/CategoriesHeader";
import { CategoriesFilterSummary } from "../components/molecules/CategoriesFilterSummary";
import { CategorySection } from "../components/organisms/CategorySection";
import { CategoriesEmptyState } from "../components/organisms/CategoriesEmptyState";
import { RoadmapView } from "../components/organisms/RoadmapView";
import { ViewToggle } from "../../../components/atoms/ViewToggle";
import { useCategoriesWithModulesQuery } from "../hooks/useCategoriesWithModulesQuery";
import { useSubjectsQuery } from "../../subjects/hooks/useSubjectsQuery";
import { CATEGORY_ORDER } from "../lib/categoryOrder";
import type { Subject } from "../../subjects/data/subjects.data";

const FALLBACK_META = { label: "", description: "", color: "slate", icon: "layers" };

export default function CategoriesListPage() {
	const { subject = "" } = useParams<{ subject: string }>();
	const [activeCategory, setActiveCategory] = useState("all");
	const [activeDiff, setActiveDiff] = useState("all");
	const [search, setSearch] = useState("");
	const [viewMode, setViewMode] = useState<"grid" | "roadmap">(() => {
		try {
			return (localStorage.getItem("modules-view-mode") as "grid" | "roadmap") ?? "grid";
		} catch {
			return "grid";
		}
	});

	function handleViewChange(mode: "grid" | "roadmap") {
		setViewMode(mode);
		try {
			localStorage.setItem("modules-view-mode", mode);
		} catch {
			// ignore
		}
	}

	const { data: rawCategories = [] } = useCategoriesWithModulesQuery(subject);
	const categories = useMemo(
		() => [...rawCategories].sort((a, b) => {
			const ao = CATEGORY_ORDER[a.slug] ?? 99;
			const bo = CATEGORY_ORDER[b.slug] ?? 99;
			return ao - bo;
		}),
		[rawCategories],
	);
	const { data: allSubjects = [] } = useSubjectsQuery();
	const subjectTitle = allSubjects.find((s) => s.id === subject)?.title ?? "";

	const subjects = useMemo(() => mapCatalogToSubjects(categories), [categories]);

	const categoryFilterOptions = useMemo(
		() => categories.map((c) => ({ id: c.slug, label: c.name })),
		[categories],
	);

	const categoryMetaMap = useMemo(
		() =>
			new Map(
				categories.map((c) => [
					c.slug,
					{ label: c.name, description: "", color: "slate", icon: "layers" },
				]),
			),
		[categories],
	);

	const filtered = useMemo(
		() =>
			applyFilters(subjects, {
				category: activeCategory,
				difficulty: activeDiff,
				search,
			}),
		[subjects, activeCategory, activeDiff, search],
	);

	const grouped = useMemo((): [string, Subject[]][] => {
		const map = new Map<string, Subject[]>(
			categories.map((c) => [c.slug, []]),
		);
		filtered.forEach((s) => map.get(s.category)?.push(s));
		return [...map.entries()].filter(([, items]) => items.length > 0);
	}, [categories, filtered]);

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
					title={subjectTitle}
					subjectCount={subjects.length}
					categoryCount={categories.length}
				/>

				<div className="mb-5 mt-2">
					<SubjectsStats subjects={subjects} />
				</div>

				<div className="mb-5">
					<SubjectsFilter
						categories={categoryFilterOptions}
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
					viewMode === "roadmap" ? (
						<>
							<div className="mb-4 flex justify-end">
								<ViewToggle
									value={viewMode}
									onChange={handleViewChange}
									disabled={filtered.length === 0}
								/>
							</div>
							<RoadmapView items={filtered} subjectSlug={subject} />
						</>
					) : (
						<>
							<div className="mb-4 flex justify-end">
								<ViewToggle
									value={viewMode}
									onChange={handleViewChange}
									disabled={filtered.length === 0}
								/>
							</div>
						<div className="flex flex-col gap-10">
							{grouped.map(([categorySlug, items]) => (
								<CategorySection
									key={categorySlug}
									categoryId={categorySlug}
									meta={categoryMetaMap.get(categorySlug) ?? FALLBACK_META}
									items={items}
								/>
							))}
						</div>
					</>
				)
				) : (
					<CategoriesEmptyState onReset={resetFilters} />
				)}
			</div>
		</div>
	);
}
