import { useState } from "react";
import { useLocation } from "react-router-dom";
import UseGetProfile from "../features/profiles/hooks/UseGetProfile";
import { useLogout } from "../features/auth/hooks/useLogout";
import { navigationItems } from "../content/navbarItems";

export function useNavbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { data, isAuthenticated, isLoading } = UseGetProfile();
	const location = useLocation();
	const logoutMutation = useLogout();

	const authLinkState = { backgroundLocation: location, modal: "login" };
	const userDisplayName = data?.username ?? "Learner";
	const visibleNavigation = navigationItems.filter((item) => !item.protected || isAuthenticated);

	const closeMobileMenu = () => setIsMobileMenuOpen(false);
	const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

	const handleLogout = async () => {
		await logoutMutation.mutateAsync();
		closeMobileMenu();
	};

	return {
		isMobileMenuOpen,
		toggleMobileMenu,
		closeMobileMenu,
		visibleNavigation,
		authLinkState,
		handleLogout,
		logoutMutation,
		isAuthenticated,
		isLoading,
		data,
		userDisplayName,
	};
}
