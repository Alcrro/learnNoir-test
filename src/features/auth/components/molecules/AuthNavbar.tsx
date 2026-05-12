import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { ToggleTheme } from "../../../../components/molecules/ThemeToggle";
import { BRAND } from "../../../../content/brandContent";

export function AuthNavbar() {
	return (
		<div className="flex items-center justify-between gap-4 rounded-3xl border border-(--border) bg-(--bg-card)/95 px-4 py-3 shadow-sm backdrop-blur sm:px-5">
			<Link to="/" className="flex min-w-0 items-center gap-3">
				<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-(--blue-bg) text-(--blue-text)">
					{BRAND.logo ? (
						<img src={BRAND.logo} alt={BRAND.name} className="h-6 w-6 object-contain" />
					) : (
						<Sparkles className="h-5 w-5" />
					)}
				</div>
				<div className="min-w-0">
					<p className="truncate text-base font-semibold text-(--text-primary)">{BRAND.name}</p>
					<p className="truncate text-xs text-(--text-secondary)">{BRAND.description}</p>
				</div>
			</Link>
			<div className="flex items-center gap-2">
				<Link
					to="/subjects"
					className="hidden rounded-xl border border-(--border) px-4 py-2 text-sm font-medium text-(--text-secondary) transition hover:border-(--border-strong) hover:bg-(--bg-secondary) hover:text-(--text-primary) sm:inline-flex"
				>
					Explore subjects
				</Link>
				<ToggleTheme />
			</div>
		</div>
	);
}
