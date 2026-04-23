import React, { ReactNode } from "react";
import { useToggleStore } from "../../../../store/useToggleStore";
import SidebarMobile from "../../../mathematics/navigation/sidebar/SidebarMobile";

type Props = {
	header: ReactNode;
	tabs: ReactNode;
	content: ReactNode;
};

const AlgorithPageLayout = ({ header, tabs, content }: Props) => {
	const { isToggled, setToggle } = useToggleStore((store) => store);

	return (
		<div className="flex pl-1 rounded-md group-hover:opacity-80 hover:opacity-100! relative">
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

export default AlgorithPageLayout;
