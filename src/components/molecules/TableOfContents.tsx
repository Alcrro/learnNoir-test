import { compareElements } from "../../features/programming/algorithms/bubble-sort/docs/compareElements";
import PseudocodContainer from "../../features/programming/algorithms/components/PseudocodContainer";
import { cn } from "../../libs/utils/cn";
import { useLectureStore } from "../../store/useLectureStore";
import { useToggleStore } from "../../store/usetoggleStore";
import ExtendButton from "../atoms/ExtendButton";

const TableOfContents = () => {
	const { activeLecture } = useLectureStore((store) => store);

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
				<div className="bg-(--bg-card)">
					<ul>
						<li>bla bla</li>
						<li>
							{compareElements[activeLecture!] ?? (
								<div className="text-sm text-(--text-muted) text-center">
									Not yet documentation
								</div>
							)}
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default TableOfContents;
