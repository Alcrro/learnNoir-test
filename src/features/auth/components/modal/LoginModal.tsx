import React from "react";
import Modal from "./Modal";
import Login from "../Login";
import { useLocation, useNavigate } from "react-router-dom";

const LoginModal = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const state = location.state as {
		modal?: string;
		backgroundLocation?: Location;
	} | null;

	const isLoginModal = state?.modal === "login";

	const closeModal = () => {
		navigate(-1); // back = închide modalul
	};

	console.log("STATE:", location.state);
	return (
		<Modal
			open={isLoginModal}
			onClose={closeModal}
		>
			<Login />
		</Modal>
	);
};

export default LoginModal;
