import MathPageLayout from "../../../../mathematics/components/MathPageLayout";
import { compareElements } from "../../bubble-sort/docs/compareElements";
import PseudocodContainer from "../PseudocodContainer";
import { cn } from "../../../../../libs/utils/cn";
import { useLectureStore } from "../../../../../store/useLectureStore";
import { useToggleStore } from "../../../../../store/useToggleStore";
import ExtendButton from "../../../../../components/atoms/ExtendButton";
import LearningSection from "./LearningSection";
import TypewriterLectureText from "./TypewriterLectureText";

const AlgorithmTableOfContents = () => {
	const lectures = useLectureStore((store) => store.lectures);
	const active = useToggleStore((s) => s.toggle.has("sideBar"));
	const closeDiv = useToggleStore((s) => s.closeToggle);

	return (
		<>
			<div
				className={cn("relative py-2 xl:hidden")}
				onClick={(e) => e.stopPropagation()}
			>
				<ExtendButton
					active={active}
					toggle={() => closeDiv("sideBar")}
				/>
			</div>
			<div className={cn("flex flex-col gap-2 rounded-md ")}>
				<PseudocodContainer />
				{lectures
					? lectures.map((key) => {
							const lecture = compareElements[key];
							// console.log("lecture", !!compareElements[key]);

							return (
								<LearningSection
									containerName={key}
									key={key}
								>
									<MathPageLayout>
										<div className="title pb-2 font-semibold text-xl capitalize text-center">
											{lecture.title}
										</div>
										<div className="flex flex-col gap-2 pl-14">
											<TypewriterLectureText
												text={lecture.description}
												isOpen={!!compareElements[key]}
											/>
										</div>
									</MathPageLayout>
								</LearningSection>
							);
						})
					: null}
			</div>
		</>
	);
};

export default AlgorithmTableOfContents;
