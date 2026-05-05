import { type ReactNode } from "react";
import { useToggleStore } from "../../../store/useToggleStore";
import SidebarMobile from "../../mathematics/navigation/sidebar/SidebarMobile";

type Props = {
	header: ReactNode;
	tabs: ReactNode;
	content: ReactNode;
};

// Full-width lesson layout with a collapsible mobile sidebar.
// Mirrors AlgorithPageLayout — kept separate so the two can diverge independently.
const LessonPageLayout = ({ header, tabs, content }: Props) => {
	const { isToggled, setToggle } = useToggleStore((store) => store);

	return (
		<div className="flex pl-1 rounded-md relative">
			<div className="rounded-xl py-2 flex-1 flex flex-col gap-4">
				{header}
				{tabs}
				{content}
			</div>

			<SidebarMobile
				active={isToggled("sideBar")}
				toggle={() => setToggle("sideBar")}
			/>
		</div>
	);
};

export default LessonPageLayout;
