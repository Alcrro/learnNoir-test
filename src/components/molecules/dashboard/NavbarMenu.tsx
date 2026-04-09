import { Link } from "react-router-dom";
import LogoutForm from "../../../features/auth/components/forms/LogoutForm";

const NavbarMenu = () => {
	return (
		<div>
			<ul className="flex gap-4 items-center">
				<li>
					<Link to={"/dashboard/settings"}>Settings</Link>
				</li>
				<li>
					<LogoutForm />
				</li>
			</ul>
		</div>
	);
};

export default NavbarMenu;
