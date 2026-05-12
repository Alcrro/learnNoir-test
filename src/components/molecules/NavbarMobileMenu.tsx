import type { UserProfile } from "../../features/profiles/types/UserProfile.type";
import type { NavigationItem } from "../../content/navbarItems";
import { NavbarMobileNavItem } from "../atoms/NavbarMobileNavItem";
import { NavbarMobileAuth } from "./NavbarMobileAuth";

type Props = {
	items: NavigationItem[];
	isLoading: boolean;
	isAuthenticated: boolean;
	data: UserProfile | undefined;
	userDisplayName: string;
	authLinkState: object;
	onLogout: () => void;
	isLoggingOut: boolean;
	logoutError: boolean;
	onClose: () => void;
};

export function NavbarMobileMenu({
	items,
	isLoading,
	isAuthenticated,
	data,
	userDisplayName,
	authLinkState,
	onLogout,
	isLoggingOut,
	logoutError,
	onClose,
}: Props) {
	return (
		<div className="mt-4 border-t border-(--border) pt-4 lg:hidden">
			<div className="grid gap-2">
				{items.map((item) => (
					<NavbarMobileNavItem key={item.to} item={item} onClose={onClose} />
				))}
			</div>

			<NavbarMobileAuth
				isLoading={isLoading}
				isAuthenticated={isAuthenticated}
				data={data}
				userDisplayName={userDisplayName}
				authLinkState={authLinkState}
				onLogout={onLogout}
				isLoggingOut={isLoggingOut}
				logoutError={logoutError}
				onClose={onClose}
			/>
		</div>
	);
}
