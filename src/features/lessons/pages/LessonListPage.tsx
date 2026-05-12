import { useParams } from "react-router-dom";
import { Breadcrumb } from "../../../components/molecules/Breadcrumb";
import PageStatus from "../../../components/atoms/PageStatus";
import { LessonsGrid } from "../components/organisms/LessonsGrid";
import { LessonsListHeader } from "../components/molecules/LessonsListHeader";
import { useLessonListPage } from "../hooks/useLessonListPage";

const LessonListPage = () => {
	const {
		subject = "computer-science",
		category = "",
		module: moduleSlug = "",
	} = useParams();

	const { lessons, progressMap, completedCount, buildHref, isLoading, isError } =
		useLessonListPage({ subject, category, moduleSlug });

	if (isLoading) {
		return (
			<div className="py-2">
				<Breadcrumb />
				<PageStatus message="Loading lessons…" />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="py-2">
				<Breadcrumb />
				<PageStatus message="Could not load lessons." />
			</div>
		);
	}

	return (
		<div className="py-2">
			<Breadcrumb />
			<LessonsListHeader
				moduleName={moduleSlug.replace(/-/g, " ")}
				lessonCount={lessons.length}
				completedCount={completedCount}
			/>
			<LessonsGrid lessons={lessons} progressMap={progressMap} buildHref={buildHref} />
		</div>
	);
};

export default LessonListPage;
