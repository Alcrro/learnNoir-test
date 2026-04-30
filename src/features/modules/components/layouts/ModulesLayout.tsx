import React from "react";
import { Outlet } from "react-router-dom";

const ModulesLayout = () => {
	return (
		<div>
			<Outlet />
		</div>
	);
};

export default ModulesLayout;
