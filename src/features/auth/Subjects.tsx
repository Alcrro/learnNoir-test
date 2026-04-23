import { Outlet } from "react-router-dom";
import DefaultLayout from "../../components/layouts/DefaultLayout";

const Subjects = () => {
	return (
		<DefaultLayout>
			<Outlet />
		</DefaultLayout>
	);
};

export default Subjects;
