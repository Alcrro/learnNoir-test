import React from "react";
import { Outlet } from "react-router-dom";
import MainLayout from "../../../../components/layouts/MainLayout";
import Sidebar from "../../navigation/sidebar/Sidebar";
import { Breadcrumb } from "../../../../components/molecules/Breadcrumb";

const MathLayout = () => {
	return (
		<MainLayout>
			<Sidebar />
			<div className="main w-full">
				<Breadcrumb />
				<Outlet />
			</div>
		</MainLayout>
	);
};

export default MathLayout;
