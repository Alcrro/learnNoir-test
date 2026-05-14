import { Link } from "react-router-dom";
import { House } from "lucide-react";

const NavbarHomeLink = () => (
	<Link
		to="/"
		aria-label="Back to home"
		className="hidden shrink-0 items-center gap-2 rounded-2xl border border-(--border) bg-(--bg-secondary) px-3 py-2 text-sm font-medium text-(--text-secondary) transition hover:border-(--border-strong) hover:bg-(--bg-elevated) hover:text-(--text-primary) sm:inline-flex"
	>
		<House className="h-4 w-4 shrink-0" />
		<span className="hidden md:inline">Home</span>
	</Link>
);

export default NavbarHomeLink;
