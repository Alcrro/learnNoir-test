import React from "react";
import { Outlet } from "react-router-dom";
import MainLayout from "../../../../components/layouts/MainLayout";
import { Breadcrumb } from "../../../../components/molecules/Breadcrumb";

const MathLayout = () => {
	return (
		<MainLayout>
			<div className="main w-full">
				<Breadcrumb />
				<Outlet />
			</div>
		</MainLayout>
	);
};

export default MathLayout;
