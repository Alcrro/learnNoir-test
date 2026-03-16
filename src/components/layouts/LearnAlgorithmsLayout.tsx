import { Outlet } from "react-router-dom";
import SidebarMobile from "../../features/navigation/sidebar/SidebarMobile";
import SidebarDesktop from "../../features/navigation/sidebar/SidebarDesktop";
import TableOfContents from "../molecules/TableOfContents";
import { useToggleStore } from "../../store/usetoggleStore";
import Navbar from "../Navbar";

const LearnAlgorithmsLayout = () => {
	const { isToggled, setToggle } = useToggleStore((store) => store);

	return (
		<>
			<Navbar />
			<div className="min-h-screen flex transition-colors duration-300 group relative overflow-hidden">
				<div className="breadcrumb"></div>
				<SidebarDesktop />

				<main className="flex-1 px-1 xl:px-4 py-4  rounded-md bg-(--bg-secondary) text-(--text-primary) group-hover:opacity-80 hover:opacity-100! relative">
					<div className="main">
						<Outlet />
					</div>
				</main>
				<div className="hidden xl:block px-1 max-w-80 2xl:max-w-120 w-full group-hover:opacity-80 hover:opacity-100! ">
					<TableOfContents />
				</div>
				<SidebarMobile
					active={!isToggled("sideBar")}
					toggle={() => setToggle("sideBar")}
				/>
			</div>
		</>
	);
};

export default LearnAlgorithmsLayout;
