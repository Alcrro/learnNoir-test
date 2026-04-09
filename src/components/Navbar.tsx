import { ToggleTheme } from "./molecules/ThemeToggle";
import { Link, useLocation } from "react-router-dom";
import ProfileImage from "../features/profiles/components/ProfileImage";
import UseGetProfile from "../features/profiles/hooks/UseGetProfile";
import LogoutForm from "../features/auth/components/forms/LogoutForm";

const Navbar = () => {
	const profile = UseGetProfile();
	const location = useLocation();
	const { data } = profile;

	return (
		<nav className="flex items-center justify-between bg-(--bg-sidebar) p-4 m-2 rounded-lg">
			<div className="logo">LearnNoir</div>
			<div className="flex items-center">
				<ToggleTheme />
				<div className="menu">
					<ul className="flex items-center justify-center my-auto  gap-2">
						<li className="">
							<Link to="/dashboard">
								<ProfileImage username={data?.username} />
							</Link>
						</li>

						{data ? (
							<li>
								<LogoutForm />
							</li>
						) : (
							<li>
								<Link
									to={"/auth/login"}
									state={{ modal: "login", backgroundLocation: location }}
								>
									Login
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
