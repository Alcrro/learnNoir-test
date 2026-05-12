import { useParams } from "react-router-dom";
import { Breadcrumb } from "../../../components/molecules/Breadcrumb";
import PageStatus from "../../../components/atoms/PageStatus";
import { ModulesListHeader } from "../components/molecules/ModulesListHeader";
import { ModulesGrid } from "../components/organisms/ModulesGrid";
import { useCategoryModules } from "../hooks/useCategoryModules";

const ModulesListPage = () => {
	const { subject = "computer-science", category = "" } = useParams();
	const { categoryData, modules, isLoading, isError } = useCategoryModules(subject, category);

	if (isLoading) {
		return (
			<div className="py-2">
				<Breadcrumb />
				<PageStatus message="Loading..." />
			</div>
		);
	}

	if (isError || !categoryData) {
		return (
			<div className="py-2">
				<Breadcrumb />
				<PageStatus message="Category not found." />
			</div>
		);
	}

	return (
		<div className="py-2">
			<Breadcrumb />
			<ModulesListHeader
				name={categoryData.name}
				moduleCount={modules.length}
				totalLessons={categoryData.totalLessons}
			/>
			<ModulesGrid modules={modules} categorySlug={category} subjectSlug={subject} />
		</div>
	);
};

export default ModulesListPage;
