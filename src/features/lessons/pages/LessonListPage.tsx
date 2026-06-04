import { useParams } from "react-router-dom";
import { Breadcrumb } from "../../../components/molecules/Breadcrumb";
import PageStatus from "../../../components/atoms/PageStatus";
import { LessonsGrid } from "../components/organisms/LessonsGrid";
import { LessonsGroupedGrid } from "../components/organisms/LessonsGroupedGrid";
import { LessonsListHeader } from "../components/molecules/LessonsListHeader";
import { useLessonListPage } from "../hooks/useLessonListPage";

const LessonListPage = () => {
	const {
		subject = "computer-science",
		category = "",
		module: moduleSlug = "",
	} = useParams();

	const {
		lessons,
		groupedLessons,
		progressMap,
		completedCount,
		buildHref,
		isLoading,
		isError,
		isLanguageModule,
	} = useLessonListPage({ subject, category, moduleSlug });

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

	const lessonCount = isLanguageModule ? groupedLessons.length : lessons.length;

	return (
		<div className="py-2">
			<Breadcrumb />
			<LessonsListHeader
				moduleName={moduleSlug.replace(/-/g, " ")}
				lessonCount={lessonCount}
				completedCount={completedCount}
			/>
			{isLanguageModule ? (
				<LessonsGroupedGrid
					groups={groupedLessons}
					progressMap={progressMap}
					buildHref={buildHref}
				/>
			) : (
				<LessonsGrid lessons={lessons} progressMap={progressMap} buildHref={buildHref} />
			)}
		</div>
	);
};

export default LessonListPage;
