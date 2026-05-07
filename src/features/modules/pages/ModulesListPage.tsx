import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb } from "../../../components/molecules/Breadcrumb";
import { categoriesApi } from "../../categories/api/categoriesApi";
import { ModulesListHeader } from "../components/molecules/ModulesListHeader";
import { ModulesGrid } from "../components/organisms/ModulesGrid";

const ModulesListPage = () => {
	const { subject = "computer-science", category = "" } = useParams();

	const { data, isLoading, isError } = useQuery({
		queryKey: ["category-modules", subject, category],
		queryFn: () => categoriesApi.getBySubject(subject),
		staleTime: 5 * 60 * 1000,
	});

	const categoryData = data?.find((c) => c.slug === category);
	const modules = categoryData?.modules ?? [];

	if (isLoading) {
		return (
			<div className="py-2">
				<Breadcrumb />
				<div className="mt-6 text-(--text-secondary)">Loading...</div>
			</div>
		);
	}

	if (isError || (!isLoading && !categoryData)) {
		return (
			<div className="py-2">
				<Breadcrumb />
				<div className="mt-6 text-(--text-secondary)">Category not found.</div>
			</div>
		);
	}

	return (
		<div className="py-2">
			<Breadcrumb />
			<ModulesListHeader
				name={categoryData!.name}
				moduleCount={modules.length}
				totalLessons={categoryData!.totalLessons}
			/>

			<ModulesGrid
				modules={modules}
				categorySlug={category}
				subjectSlug={subject}
			/>
		</div>
	);
};

export default ModulesListPage;
