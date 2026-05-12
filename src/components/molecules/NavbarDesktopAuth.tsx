import { BookOpen, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { ToggleTheme } from "./ThemeToggle";
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
};

export function NavbarDesktopAuth({
	isLoading,
	isAuthenticated,
	data,
	userDisplayName,
	authLinkState,
	onLogout,
	isLoggingOut,
}: Props) {
	return (
		<div className="hidden items-center gap-3 lg:flex">
			<ToggleTheme />

			{isLoading ? (
				<div className="flex items-center gap-3 rounded-2xl border border-(--border) bg-(--bg-secondary) px-4 py-2">
					<div className="h-10 w-10 animate-pulse rounded-2xl bg-(--bg-elevated)" />
					<div className="space-y-2">
						<div className="h-3 w-28 animate-pulse rounded bg-(--bg-elevated)" />
						<div className="h-2.5 w-20 animate-pulse rounded bg-(--bg-elevated)" />
					</div>
				</div>
			) : isAuthenticated ? (
				<>
					<Link
						to="/dashboard"
						className="flex items-center gap-3 rounded-2xl border border-(--border) bg-(--bg-secondary) px-3 py-2 transition hover:border-(--border-strong) hover:bg-(--bg-elevated)"
					>
						<ProfileImage
							username={data?.username}
							avatarUrl={data?.avatarUrl}
							size="sm"
						/>
						<div className="text-left">
							<p className="text-sm font-medium text-(--text-primary)">
								{userDisplayName}
							</p>
							<p className="text-xs text-(--text-secondary)">
								{data?.role ?? "student"}
							</p>
						</div>
					</Link>

					<button
						type="button"
						onClick={onLogout}
						disabled={isLoggingOut}
						className="inline-flex items-center gap-2 rounded-xl border border-(--border) px-4 py-2 text-sm font-medium text-(--text-secondary) transition hover:border-(--border-strong) hover:bg-(--bg-secondary) hover:text-(--text-primary) disabled:cursor-not-allowed disabled:opacity-60"
					>
						<LogOut className="h-4 w-4" />
						{isLoggingOut ? "Signing out..." : "Logout"}
					</button>
				</>
			) : (
				<>
					<Link
						to="/subjects"
						className="inline-flex items-center gap-2 rounded-xl bg-(--blue-bg) px-4 py-2 text-sm font-medium text-(--blue-text) transition hover:opacity-90"
					>
						<BookOpen className="h-4 w-4" />
						Start learning
					</Link>
					<Link
						to="/auth/login"
						state={authLinkState}
						className="inline-flex items-center gap-2 rounded-xl border border-(--border) px-4 py-2 text-sm font-medium text-(--text-secondary) transition hover:border-(--border-strong) hover:bg-(--bg-secondary) hover:text-(--text-primary)"
					>
						<LogIn className="h-4 w-4" />
						Login
					</Link>
				</>
			)}
		</div>
	);
}
