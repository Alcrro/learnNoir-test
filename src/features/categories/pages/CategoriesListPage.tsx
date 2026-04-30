// pages/SubjectsPage.jsx
import { useState, useMemo } from "react";
import { CATEGORY_META, SUBJECTS } from "../../subjects/data/subjects.data";
import SubjectCard from "../../subjects/data/SubjectCard";
import SubjectsFilter from "../../../components/organisms/subjects/SubjectsFilter";
import SubjectsStats from "../../../components/organisms/subjects/SubjectsStats";
import { Breadcrumb } from "../../../components/molecules/Breadcrumb";
import { buildCategories } from "../utils/buildCategories";
import { applyFilters } from "../utils/categoriesApplyFilters";
import { groupByCategory } from "../utils/groupByCategory";
import { useLoaderData } from "react-router-dom";

// ── Categories list Page ──────────────────────────────────────────────────────────────
export default function CategoriesListPage() {
	const [activeCategory, setActiveCategory] = useState("all");
	const [activeDiff, setActiveDiff] = useState("all");
	const [search, setSearch] = useState("");

	const mere = useLoaderData();

	console.log(mere);

	const categories = buildCategories();

	const filtered = useMemo(
		() =>
			applyFilters(SUBJECTS, {
				category: activeCategory,
				difficulty: activeDiff,
				search,
			}),
		[activeCategory, activeDiff, search],
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
			<div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* ── Header ──────────────────────────────────────────────────── */}

				<Breadcrumb />

				<div className="flex items-end justify-between gap-4 flex-wrap">
					<div>
						<h1 className="text-2xl font-medium text-(--text-primary) tracking-tight">
							Computer Science
						</h1>
						<p className="text-sm text-(--text-secondary) mt-1">
							{SUBJECTS.length} subjects · {Object.keys(CATEGORY_META).length}{" "}
							categories
						</p>
					</div>
				</div>

				{/* ── Stats ───────────────────────────────────────────────────── */}
				<div className="mb-5 mt-2">
					<SubjectsStats subjects={SUBJECTS} />
				</div>

				{/* ── Filters ─────────────────────────────────────────────────── */}
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

				{/* ── Filter result summary ────────────────────────────────────── */}
				{isFiltering && (
					<div className="flex items-center justify-between mb-4">
						<p className="text-xs text-(--text-secondary)">
							{filtered.length > 0 ? (
								<>
									{filtered.length} result{filtered.length !== 1 ? "s" : ""}
									{search && (
										<>
											{" "}
											for{" "}
											<em className="not-italic text-(--text-secondary)">"{search}"</em>
										</>
									)}
								</>
							) : (
								"No results"
							)}
						</p>
						<button
							onClick={resetFilters}
							className="text-xs text-(--text-secondary) hover:text-(--text-primary) underline underline-offset-2 transition-colors"
						>
							Reset filters
						</button>
					</div>
				)}

				{/* ── Content ─────────────────────────────────────────────────── */}
				{filtered.length > 0 ? (
					<div className="flex flex-col gap-10">
						{grouped.map(([categoryId, items]) => {
							const meta = CATEGORY_META[categoryId];
							return (
								<section
									key={categoryId}
									aria-labelledby={`section-${categoryId}`}
								>
									{/* Section label */}
									<div className="flex items-center gap-3 mb-4">
										<h2
											id={`section-${categoryId}`}
											className="text-sm font-medium text-(--text-primary) whitespace-nowrap"
										>
											{meta.label}
										</h2>
										<span className="text-xs text-(--text-secondary) whitespace-nowrap">
											{items.length} subject{items.length !== 1 ? "s" : ""}
										</span>
										<div
											className="flex-1 h-px bg-(--border-strong) ml-4"
											aria-hidden="true"
										/>
										<p className="hidden sm:block text-xs text-(--text-secondary) whitespace-nowrap">
											{meta.description}
										</p>
									</div>

									{/* Cards grid */}
									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
										{items.map((subject) => (
											<SubjectCard
												key={subject.id}
												subject={subject}
												categoryMeta={meta}
											/>
										))}
									</div>
								</section>
							);
						})}
					</div>
				) : (
					/* ── Empty state ─────────────────────────────────────────────── */
					<div className="flex flex-col items-center justify-center py-24 text-center">
						<div className="w-12 h-12 rounded-full bg-(--bg-secondary) flex items-center justify-center mb-4">
							<svg
								className="w-5 h-5 text-(--text-secondary)"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={1.5}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
								/>
							</svg>
						</div>
						<p className="text-sm font-medium text-(--text-primary) mb-1">
							No subjects found
						</p>
						<p className="text-xs text-(--text-secondary) mb-5 max-w-xs">
							Try a different search term or clear your filters.
						</p>
						<button
							onClick={resetFilters}
							className={[
								"text-xs px-4 py-2 rounded-lg",
								"border border-(--border)",
								"text-(--text-secondary)",
								"hover:bg-(--bg-primary) ",
								"transition-colors duration-150",
							].join(" ")}
						>
							Clear all filters
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
