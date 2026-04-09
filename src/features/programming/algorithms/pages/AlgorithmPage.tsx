import { useParams } from "react-router-dom";
import { algorithmComponents } from "../../../../router/routeMappers/algorithmComponentsMapper";
import TableOfContents from "../../../../components/molecules/TableOfContents";
import SidebarMobile from "../../../mathematics/navigation/sidebar/SidebarMobile";
import { useToggleStore } from "../../../../store/usetoggleStore";

const AlgorithmPage = () => {
	const { isToggled, setToggle } = useToggleStore((store) => store);
	const { category, lessonId } = useParams<{
		category: string;
		lessonId: string;
	}>();

	if (!category || !lessonId) return <>no found</>;
	const Component = algorithmComponents[category][lessonId];

	return (
		<div className="flex px-1 rounded-md text-(--text-primary) group-hover:opacity-80 hover:opacity-100! relative">
			<div className="bg-(--bg-card) rounded-xl py-2 flex-1">
				<h1 className="capitalize font-semibold tracking-tight text-3xl text-center">
					{lessonId.includes("-") ? lessonId.replace("-", " ") : lessonId}
				</h1>
				{Component && <Component />}
			</div>

			<div className="hidden xl:block px-1 max-w-80 2xl:max-w-120 w-full group-hover:opacity-80 hover:opacity-100!">
				<TableOfContents />
			</div>
			<SidebarMobile
				active={!isToggled("sideBar")}
				toggle={() => setToggle("sideBar")}
			/>
		</div>
	);
};

export default AlgorithmPage;
