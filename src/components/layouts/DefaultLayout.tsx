import React from "react";
import Navbar from "../Navbar";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
};

export default DefaultLayout;
