import { BookOpen, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileImage from "../../features/profiles/components/ProfileImage";
import type { UserProfile } from "../../features/profiles/types/UserProfile.type";

type Props = {
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

export function NavbarMobileAuth({
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
		<div className="mt-4 rounded-2xl border border-(--border) bg-(--bg-secondary) p-4">
			{isLoading ? (
				<p className="text-sm text-(--text-secondary)">Loading session...</p>
			) : isAuthenticated ? (
				<div className="flex flex-col gap-4">
					<Link to="/dashboard" onClick={onClose} className="flex items-center gap-3">
						<ProfileImage username={data?.username} avatarUrl={data?.avatarUrl} size="sm" />
						<div>
							<p className="text-sm font-medium text-(--text-primary)">{userDisplayName}</p>
							<p className="text-xs text-(--text-secondary)">Continue from your dashboard</p>
						</div>
					</Link>

					<button
						type="button"
						onClick={onLogout}
						disabled={isLoggingOut}
						className="inline-flex items-center justify-center gap-2 rounded-xl border border-(--border) bg-(--bg-card) px-4 py-3 text-sm font-medium text-(--text-secondary) transition hover:border-(--border-strong) hover:text-(--text-primary) disabled:opacity-60"
					>
						<LogOut className="h-4 w-4" />
						{isLoggingOut ? "Signing out..." : "Logout"}
					</button>
				</div>
			) : (
				<div className="flex flex-col gap-3">
					<p className="text-sm text-(--text-secondary)">
						Log in to save progress, open the dashboard and continue your learning path.
					</p>
					<div className="grid gap-2 sm:grid-cols-2">
						<Link
							to="/subjects"
							onClick={onClose}
							className="inline-flex items-center justify-center gap-2 rounded-xl bg-(--blue-bg) px-4 py-3 text-sm font-medium text-(--blue-text)"
						>
							<BookOpen className="h-4 w-4" />
							Start learning
						</Link>
						<Link
							to="/auth/login"
							state={authLinkState}
							onClick={onClose}
							className="inline-flex items-center justify-center gap-2 rounded-xl border border-(--border) bg-(--bg-card) px-4 py-3 text-sm font-medium text-(--text-secondary)"
						>
							<LogIn className="h-4 w-4" />
							Login
						</Link>
					</div>
				</div>
			)}

			{logoutError ? (
				<p className="mt-3 text-sm text-red-500">Logout failed. Please try again.</p>
			) : null}
		</div>
	);
}
