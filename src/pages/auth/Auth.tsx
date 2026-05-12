import { useLocation, useNavigate } from "react-router-dom";
import { useGetMe } from "../../features/auth/hooks/useAuth";
import { useRedirectCountdown } from "../../features/auth/hooks/useRedirectCountdown";
import LoginModal from "../../features/auth/components/modal/LoginModal";
import { AuthNavbar } from "../../features/auth/components/molecules/AuthNavbar";
import { AuthInfoPanel } from "../../features/auth/components/organisms/AuthInfoPanel";
import { AuthFormPanel } from "../../features/auth/components/organisms/AuthFormPanel";
import type { AuthLocationState } from "../../features/auth/types/LoginTypes.type";

type authTypeMethod = "register" | "login" | "auth";

const Auth = () => {
	const { data: user, isLoading } = useGetMe();
	const navigate = useNavigate();
	const location = useLocation();
	const state = (location.state ?? null) as AuthLocationState | null;
	const isModal = state?.backgroundLocation && location.pathname === "/auth/login";

	const wrapperPath = location.pathname.split("/");
	const pathname = wrapperPath[wrapperPath.length - 1] as authTypeMethod;

	const redirectCountdown = useRedirectCountdown({
		enabled: Boolean(user) && !isModal,
		seconds: 2,
		onComplete: () => navigate("/dashboard", { replace: true }),
	});

	const switchLink =
		pathname === "register"
			? { label: "Already have an account?", to: "/auth/login", cta: "Login" }
			: { label: "Need an account?", to: "/auth/register", cta: "Register" };

	if (isModal) return <LoginModal />;

	return (
		<div className="min-h-screen bg-(--bg-page) px-4 py-4 sm:px-6 lg:px-8">
			<div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl flex-col gap-6">
				<AuthNavbar />

				<div className="grid flex-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
					<AuthInfoPanel />
					<AuthFormPanel
						isLoading={isLoading}
						isAuthenticated={Boolean(user)}
						countdown={redirectCountdown ?? 0}
						switchLink={switchLink}
						onNavigate={() => navigate("/dashboard", { replace: true })}
					/>
				</div>
			</div>
		</div>
	);
};

export default Auth;
