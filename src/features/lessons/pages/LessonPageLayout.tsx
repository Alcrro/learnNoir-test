import React from "react";
import { Outlet } from "react-router-dom";

const LessonPageLayout = () => {
	return (
		<div>
			<Outlet />
		</div>
	);
};

export default LessonPageLayout;
