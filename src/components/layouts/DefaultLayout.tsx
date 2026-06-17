import React from "react";
import Navbar from "../Navbar";
import { CookieBanner } from "../organisms/CookieBanner";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Navbar />
			<div className="main max-w-7xl w-full mx-auto px-2">{children}</div>
			<CookieBanner />
		</div>
	);
};

export default DefaultLayout;
