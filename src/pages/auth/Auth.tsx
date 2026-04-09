import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoginModal from "../../features/auth/components/modal/LoginModal";

type authTypeMethod = "register" | "login" | "auth";

const Auth = () => {
	const { user } = useAuth();

	const location = useLocation();
	const state = location.state as { backgroundLocation?: Location };
	console.log("state din subjects", state);

	const isModal =
		state?.backgroundLocation && location.pathname === "/auth/login";

	// if (isModal) return <Outlet />;

	const wrapperPath = location.pathname.split("/");
	const pathname = wrapperPath[wrapperPath.length - 1] as authTypeMethod;

	if (user && pathname !== "register")
		throw new Error("You are already logged in");

	return (
		<div className="h-screen p-4 flex flex-col justify-center items-center">
			<div className="auth_container w-full max-w-100 bg-(--bg-color) rounded-md p-4">
				{!isModal && <Outlet />}
				{isModal && <LoginModal />}
				<div className="py-2">
					{user && pathname === "register" ? null : (
						<>
							<span>You dont have account? Go to </span>
							<Link
								to={pathname === "login" ? "/auth/register" : "/auth/login"}
								className="underline underline-offset-2 text-blue-500"
							>
								<span className=" capitalize">
									{pathname !== "register" ? "register" : "login"}
								</span>
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Auth;
