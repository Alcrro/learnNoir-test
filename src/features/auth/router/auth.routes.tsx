import { RouteObject } from "react-router-dom";
import Auth from "../../../pages/auth/Auth";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

export const authRoutes: RouteObject = {
	path: "auth",
	element: <Auth />,
	children: [
		{ path: "login", element: <LoginPage /> },
		{ path: "register", element: <RegisterPage /> },
	],
};
