import { ReactNode } from "react";
import Navbar from "../Navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
};

export default MainLayout;
