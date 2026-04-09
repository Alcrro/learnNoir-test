import MathPageLayout from "../../features/mathematics/components/MathPageLayout";
import { compareElements } from "../../features/programming/algorithms/bubble-sort/docs/compareElements";
import PseudocodContainer from "../../features/programming/algorithms/components/PseudocodContainer";
import { cn } from "../../libs/utils/cn";
import { useLectureStore } from "../../store/useLectureStore";
import { useToggleStore } from "../../store/usetoggleStore";
import ExtendButton from "../atoms/ExtendButton";
import LearnContainer from "./LearnContainer";
import LectureText from "./LectureText";

const TableOfContents = () => {
	const lectures = useLectureStore((store) => store.lectures);
	const isToggled = useToggleStore((store) => store.isToggled);
	const active = useToggleStore((s) => s.toggle.has("sideBar"));
	const closeDiv = useToggleStore((s) => s.closeToggle);
	// console.log("isToggled ", isToggled("sideBar"));

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
								<LearnContainer
									containerName={key}
									key={key}
								>
									<MathPageLayout>
										<div className="title pb-2 font-semibold text-xl capitalize text-center">
											{lecture.title}
										</div>
										<div className="flex flex-col gap-2 pl-14">
											<LectureText
												text={lecture.description}
												isOpen={!!compareElements[key]}
											/>
										</div>
									</MathPageLayout>
								</LearnContainer>
							);
						})
					: null}
			</div>
		</>
	);
};

export default TableOfContents;
