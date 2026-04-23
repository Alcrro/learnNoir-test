import { Outlet } from "react-router-dom";
import { Breadcrumb } from "../../../../../components/molecules/Breadcrumb";
import Sidebar from "../../../../mathematics/navigation/sidebar/Sidebar";

const LearnAlgorithmsLayout = () => {
	return (
		<div className="min-h-screen flex transition-colors duration-300 group relative overflow-hidden bg-(--lp-bg-page) px-2">
			<main className="flex-1 flex gap-2 px-1 rounded-md group-hover:opacity-80 hover:opacity-100!">
				<Sidebar />
				<div className="main w-full">
					<Breadcrumb />
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default LearnAlgorithmsLayout;
