import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoginModal from "./components/modal/LoginModal";

const Subjects = () => {
	const location = useLocation();
	const state = location.state as { backgroundLocation?: Location };
	// console.log("state din subjects", state);

	const isModal =
		state?.backgroundLocation && location.pathname === "/auth/login";

	if (isModal) return <Outlet />;

	return <Outlet />;
};

export default Subjects;
