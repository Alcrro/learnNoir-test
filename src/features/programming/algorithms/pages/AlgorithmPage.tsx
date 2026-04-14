import { useParams, useSearchParams } from "react-router-dom";
import { type ReactElement, useEffect } from "react";
import SidebarMobile from "../../../mathematics/navigation/sidebar/SidebarMobile";
import { useToggleStore } from "../../../../store/useToggleStore";
import AlgorithmTitle from "../components/AlgorithmTitle";
import AlgorithmLessonMeta from "../components/lesson/AlgorithmLessonMeta";
import { type FeatureTabUniqueIdType } from "../../../../content/FeaturesTabData";
import Visualizer from "../bubble-sort/visualization/Visualizer";
import AlgorithmLessonTheory from "../components/lesson/AlgorithmLessonTheory";
import AlgorithmFeatureTabs from "../components/lesson/AlgorithmFeatureTabs";
import AlgorithmTableOfContents from "../components/lesson/AlgorithmTableOfContents";

const AlgorithmPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const tab = (searchParams.get("tab") as FeatureTabUniqueIdType) ?? "learnTab";
	const { isToggled, setToggle } = useToggleStore((store) => store);
	const { category, lessonId } = useParams<{
		category: string;
		lessonId: string;
	}>();

	useEffect(() => {
		const tab = searchParams.get("tab");
		const step = searchParams.get("step");

		if (tab !== "vizTab" && step) {
			const params = new URLSearchParams(searchParams);
			params.delete("step");

			setSearchParams(params, { replace: true });
		}
	}, [searchParams, setSearchParams]);
	if (!category || !lessonId) return <>no found</>;

	const setTab = (tabId: FeatureTabUniqueIdType) => {
		const params = new URLSearchParams(searchParams);

		// setezi mereu tab
		params.set("tab", tabId);

		if (tabId === "vizTab") {
			// fallback step
			if (!params.get("step")) {
				params.set("step", "1");
			}
		} else {
			params.delete("step");
		}

		setSearchParams(params);
	};
	const tabsMapper: Record<FeatureTabUniqueIdType, ReactElement> = {
		learnTab: <AlgorithmLessonTheory />,
		vizTab: <Visualizer />,
		codeTab: (
			<div className="hidden xl:block px-1 max-w-80 2xl:max-w-120 w-full group-hover:opacity-80 hover:opacity-100!">
				<AlgorithmTableOfContents />
			</div>
		),
		quizTab: <>quizz</>,
	} satisfies Record<FeatureTabUniqueIdType, ReactElement>;

	return (
		<div className="flex px-1 rounded-md group-hover:opacity-80 hover:opacity-100! relative">
			<div className="rounded-xl py-2 flex-1 flex flex-col gap-4">
				<div className="header flex flex-col gap-2">
					<AlgorithmTitle lessonName={lessonId} />
					<AlgorithmLessonMeta />
				</div>

				<AlgorithmFeatureTabs
					tab={tab}
					tabHandler={setTab}
				/>
				{tabsMapper[tab]}
				{/* {Component && <Component />} */}
			</div>

			<SidebarMobile
				active={!isToggled("sideBar")}
				toggle={() => setToggle("sideBar")}
			/>
		</div>
	);
};

export default AlgorithmPage;
