import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/molecules/dashboard/DashboardNavbar";
import Sidebar from "../components/molecules/dashboard/SidebarItems";

const Dashboard = () => {
	return (
		<div className="flex flex-col gap-2 p-2">
			<DashboardNavbar />
			<div className="main flex gap-2">
				<div className="max-w-60 h-full w-full bg-(--bg-tertiary) p-2 rounded-md">
					<Sidebar />
				</div>
				<div className="main-content bg-(--bg-tertiary) flex-1 rounded-md p-2 h-120">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
