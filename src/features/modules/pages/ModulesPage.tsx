import React from "react";
import { useLocation } from "react-router-dom";

const ModulesPage = () => {
	const location = useLocation();
	const moduleName =
		location.pathname.split("/").pop()?.replace(/-/g, " ") || "Unknown Module";
	return <div>ModulesPage: {moduleName}</div>;
};

export default ModulesPage;
