import { Outlet } from "react-router-dom";
import MainLayout from "../../../components/layouts/MainLayout";

const ProgrammingPages = () => {
	return (
		<MainLayout>
			<Outlet />
		</MainLayout>
	);
};

export default ProgrammingPages;
