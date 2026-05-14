import { Menu } from "lucide-react";

type Props = { onClick: () => void };

const NavbarSidebarToggle = ({ onClick }: Props) => (
	<button
		type="button"
		onClick={onClick}
		aria-label="Open sidebar"
		className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-(--border) bg-(--bg-secondary) text-(--text-secondary) transition hover:border-(--border-strong) hover:bg-(--bg-elevated) hover:text-(--text-primary) lg:hidden"
	>
		<Menu className="h-5 w-5" />
	</button>
);

export default NavbarSidebarToggle;
