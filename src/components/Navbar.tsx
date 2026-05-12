import { Menu, X } from "lucide-react";
import { ToggleTheme } from "./molecules/ThemeToggle";
import { useNavbar } from "../hooks/useNavbar";
import { NavbarBrand } from "./atoms/NavbarBrand";
import { NavbarDesktopNav } from "./molecules/NavbarDesktopNav";
import { NavbarDesktopAuth } from "./molecules/NavbarDesktopAuth";
import { NavbarMobileMenu } from "./molecules/NavbarMobileMenu";

const Navbar = () => {
	const {
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
	} = useNavbar();

	return (
		<header className="sticky top-0 z-40 px-2 pt-2">
			<nav className="mx-auto flex max-w-7xl flex-col rounded-3xl border border-(--border) bg-(--bg-card)/95 px-4 py-3 shadow-sm backdrop-blur sm:px-5">
				<div className="flex items-center justify-between gap-4">
					<NavbarBrand onClick={closeMobileMenu} />

					<NavbarDesktopNav items={visibleNavigation} />

					<NavbarDesktopAuth
						isLoading={isLoading}
						isAuthenticated={isAuthenticated}
						data={data}
						userDisplayName={userDisplayName}
						authLinkState={authLinkState}
						onLogout={handleLogout}
						isLoggingOut={logoutMutation.isPending}
					/>

					<div className="flex items-center gap-2 lg:hidden">
						<ToggleTheme />
						<button
							type="button"
							onClick={toggleMobileMenu}
							className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-(--border) bg-[var(--bg-secondary)] text-[var(--text-primary)] transition hover:border-[color:var(--border-strong)] hover:bg-[var(--bg-elevated)]"
							aria-expanded={isMobileMenuOpen}
							aria-label="Toggle navigation menu"
						>
							{isMobileMenuOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</button>
					</div>
				</div>

				{isMobileMenuOpen ? (
					<NavbarMobileMenu
						items={visibleNavigation}
						isLoading={isLoading}
						isAuthenticated={isAuthenticated}
						data={data}
						userDisplayName={userDisplayName}
						authLinkState={authLinkState}
						onLogout={handleLogout}
						isLoggingOut={logoutMutation.isPending}
						logoutError={logoutMutation.isError}
						onClose={closeMobileMenu}
					/>
				) : null}
			</nav>
		</header>
	);
};

export default Navbar;
