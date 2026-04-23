import { useState } from "react";
import {
	BookOpen,
	Compass,
	LayoutDashboard,
	LogIn,
	LogOut,
	Menu,
	Sparkles,
	X,
} from "lucide-react";
import { ToggleTheme } from "./molecules/ThemeToggle";
import { Link, NavLink, useLocation } from "react-router-dom";
import ProfileImage from "../features/profiles/components/ProfileImage";
import UseGetProfile from "../features/profiles/hooks/UseGetProfile";
import { useLogout } from "../features/auth/hooks/useLogout";
import { cn } from "../libs/utils/cn";

type NavigationItem = {
	label: string;
	to: string;
	icon: typeof Compass;
	description: string;
	protected?: boolean;
};

const baseLinkClassName =
	"inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200";

const navigationItems: NavigationItem[] = [
	{
		label: "Discover",
		to: "/",
		icon: Compass,
		description: "Landing and entry point",
	},
	{
		label: "Subjects",
		to: "/subjects",
		icon: BookOpen,
		description: "Browse learning tracks",
	},
	{
		label: "Dashboard",
		to: "/dashboard",
		icon: LayoutDashboard,
		description: "Progress and workspace",
		protected: true,
	},
] as const;

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const profile = UseGetProfile();
	const location = useLocation();
	const logoutMutation = useLogout();
	const { data, isAuthenticated, isLoading } = profile;
	const authLinkState = { modal: "login", backgroundLocation: location };
	const userDisplayName = data?.username ?? "Learner";

	const visibleNavigation = navigationItems.filter(
		(item) => !item.protected || isAuthenticated,
	);

	function closeMobileMenu() {
		setIsMobileMenuOpen(false);
	}

	async function handleLogout() {
		await logoutMutation.mutateAsync();
		closeMobileMenu();
	}

	return (
		<header className="sticky top-0 z-40 px-2 pt-2">
			<nav className="mx-auto flex max-w-7xl flex-col rounded-[24px] border border-[color:var(--border)] bg-[color:var(--bg-card)]/95 px-4 py-3 shadow-sm backdrop-blur sm:px-5">
				<div className="flex items-center justify-between gap-4">
					<Link
						to="/"
						className="flex min-w-0 items-center gap-3"
						onClick={closeMobileMenu}
					>
						<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--blue-bg)] text-[var(--blue-text)]">
							<Sparkles className="h-5 w-5" />
						</div>

						<div className="min-w-0">
							<p className="truncate text-base font-semibold text-[var(--text-primary)]">
								LearnNoir
							</p>
							<p className="truncate text-xs text-[var(--text-secondary)]">
								Structured learning for CS, math and science
							</p>
						</div>
					</Link>

					<div className="hidden flex-1 items-center justify-center lg:flex">
						<ul className="flex items-center gap-2 rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-1">
							{visibleNavigation.map((item) => {
								const Icon = item.icon;

								return (
									<li key={item.to}>
										<NavLink
											to={item.to}
											end={item.to === "/"}
											className={({ isActive }) =>
												cn(
													baseLinkClassName,
													isActive
														? "bg-[var(--blue-bg)] text-[var(--blue-text)]"
														: "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]",
												)
											}
										>
											<Icon className="h-4 w-4" />
											{item.label}
										</NavLink>
									</li>
								);
							})}
						</ul>
					</div>

					<div className="hidden items-center gap-3 lg:flex">
						<ToggleTheme />

						{isLoading ? (
							<div className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] px-4 py-2">
								<div className="h-10 w-10 animate-pulse rounded-2xl bg-[var(--bg-elevated)]" />
								<div className="space-y-2">
									<div className="h-3 w-28 animate-pulse rounded bg-[var(--bg-elevated)]" />
									<div className="h-2.5 w-20 animate-pulse rounded bg-[var(--bg-elevated)]" />
								</div>
							</div>
						) : isAuthenticated ? (
							<>
								<Link
									to="/dashboard"
									className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] px-3 py-2 transition hover:border-[color:var(--border-strong)] hover:bg-[var(--bg-elevated)]"
								>
									<ProfileImage
										username={data?.username}
										avatarUrl={data?.avatarUrl}
										size="sm"
									/>
									<div className="text-left">
										<p className="text-sm font-medium text-[var(--text-primary)]">
											{userDisplayName}
										</p>
										<p className="text-xs text-[var(--text-secondary)]">
											{data?.role ?? "student"}
										</p>
									</div>
								</Link>

								<button
									type="button"
									onClick={handleLogout}
									disabled={logoutMutation.isPending}
									className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:border-[color:var(--border-strong)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-60"
								>
									<LogOut className="h-4 w-4" />
									{logoutMutation.isPending ? "Signing out..." : "Logout"}
								</button>
							</>
						) : (
							<>
								<Link
									to="/subjects"
									className="inline-flex items-center gap-2 rounded-xl bg-[var(--blue-bg)] px-4 py-2 text-sm font-medium text-[var(--blue-text)] transition hover:opacity-90"
								>
									<BookOpen className="h-4 w-4" />
									Start learning
								</Link>
								<Link
									to="/auth/login"
									state={authLinkState}
									className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:border-[color:var(--border-strong)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
								>
									<LogIn className="h-4 w-4" />
									Login
								</Link>
							</>
						)}
					</div>

					<div className="flex items-center gap-2 lg:hidden">
						<ToggleTheme />
						<button
							type="button"
							onClick={() => setIsMobileMenuOpen((current) => !current)}
							className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] transition hover:border-[color:var(--border-strong)] hover:bg-[var(--bg-elevated)]"
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
					<div className="mt-4 border-t border-[color:var(--border)] pt-4 lg:hidden">
						<div className="grid gap-2">
							{visibleNavigation.map((item) => {
								const Icon = item.icon;

								return (
									<NavLink
										key={item.to}
										to={item.to}
										end={item.to === "/"}
										onClick={closeMobileMenu}
										className={({ isActive }) =>
											cn(
												baseLinkClassName,
												"justify-between rounded-2xl border border-[color:var(--border)] px-4 py-3",
												isActive
													? "bg-[var(--blue-bg)] text-[var(--blue-text)]"
													: "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]",
											)
										}
									>
										<span className="flex items-center gap-3">
											<Icon className="h-4 w-4" />
											{item.label}
										</span>
										<span className="text-xs text-[var(--text-muted)]">
											{item.description}
										</span>
									</NavLink>
								);
							})}
						</div>

						<div className="mt-4 rounded-2xl border border-[color:var(--border)] bg-[var(--bg-secondary)] p-4">
							{isLoading ? (
								<p className="text-sm text-[var(--text-secondary)]">
									Loading session...
								</p>
							) : isAuthenticated ? (
								<div className="flex flex-col gap-4">
									<Link
										to="/dashboard"
										onClick={closeMobileMenu}
										className="flex items-center gap-3"
									>
										<ProfileImage
											username={data?.username}
											avatarUrl={data?.avatarUrl}
											size="sm"
										/>
										<div>
											<p className="text-sm font-medium text-[var(--text-primary)]">
												{userDisplayName}
											</p>
											<p className="text-xs text-[var(--text-secondary)]">
												Continue from your dashboard
											</p>
										</div>
									</Link>

									<button
										type="button"
										onClick={handleLogout}
										disabled={logoutMutation.isPending}
										className="inline-flex items-center justify-center gap-2 rounded-xl border border-[color:var(--border)] bg-[var(--bg-card)] px-4 py-3 text-sm font-medium text-[var(--text-secondary)] transition hover:border-[color:var(--border-strong)] hover:text-[var(--text-primary)] disabled:opacity-60"
									>
										<LogOut className="h-4 w-4" />
										{logoutMutation.isPending ? "Signing out..." : "Logout"}
									</button>
								</div>
							) : (
								<div className="flex flex-col gap-3">
									<p className="text-sm text-[var(--text-secondary)]">
										Log in to save progress, open the dashboard and continue your
										learning path.
									</p>
									<div className="grid gap-2 sm:grid-cols-2">
										<Link
											to="/subjects"
											onClick={closeMobileMenu}
											className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--blue-bg)] px-4 py-3 text-sm font-medium text-[var(--blue-text)]"
										>
											<BookOpen className="h-4 w-4" />
											Start learning
										</Link>
										<Link
											to="/auth/login"
											state={authLinkState}
											onClick={closeMobileMenu}
											className="inline-flex items-center justify-center gap-2 rounded-xl border border-[color:var(--border)] bg-[var(--bg-card)] px-4 py-3 text-sm font-medium text-[var(--text-secondary)]"
										>
											<LogIn className="h-4 w-4" />
											Login
										</Link>
									</div>
								</div>
							)}

							{logoutMutation.isError ? (
								<p className="mt-3 text-sm text-red-500">
									Logout failed. Please try again.
								</p>
							) : null}
						</div>
					</div>
				) : null}
			</nav>
		</header>
	);
};

export default Navbar;
