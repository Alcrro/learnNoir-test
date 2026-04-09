import React from "react";
import NavbarMenu from "./NavbarMenu";

const DashboardNavbar = () => {
	return (
		<div className="flex gap-2 justify-between items-center p-4 bg-(--bg-tertiary) rounded-md">
			<div>Dashboard</div>
			<NavbarMenu />
		</div>
	);
};

export default DashboardNavbar;
