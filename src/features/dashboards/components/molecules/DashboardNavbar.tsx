import NavbarMenu from "./NavbarMenu";
import NavbarSidebarToggle from "../atoms/NavbarSidebarToggle";
import NavbarHomeLink from "../atoms/NavbarHomeLink";
import NavbarLiveLesson from "../atoms/NavbarLiveLesson";
import NavbarLastLesson from "../atoms/NavbarLastLesson";
import { getRoleLabel, type WorkspaceRole } from "../../data/dashboardData";

type DashboardNavbarProps = {
	previewRole: WorkspaceRole;
	profileName: string;
	liveLesson: { title: string; status: string } | null;
	onOpenSidebar: () => void;
};

const DashboardNavbar = ({
	previewRole,
	profileName,
	liveLesson,
	onOpenSidebar,
}: DashboardNavbarProps) => (
	<header className="sticky top-3 z-30 rounded-[28px] border border-(--border) bg-(--bg-card)/95 p-4 shadow-sm backdrop-blur sm:p-5">
		<div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">

			{/* Left: sidebar toggle (mobile) + identity */}
			<div className="flex min-w-0 items-center gap-2 sm:gap-3">
				<NavbarSidebarToggle onClick={onOpenSidebar} />
				<div className="min-w-0">
					<p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--text-muted)">
						{getRoleLabel(previewRole)} dashboard
					</p>
					<h1 className="truncate text-xl font-semibold tracking-tight text-(--text-primary) sm:text-2xl">
						{profileName}
					</h1>
				</div>
			</div>

			{/* Center: home + last visited lesson (real URL) + live lesson indicator */}
			<div className="hidden items-center gap-2 md:flex">
				<NavbarHomeLink />
				<NavbarLastLesson />
				<NavbarLiveLesson lesson={liveLesson} />
			</div>

			{/* Right: theme toggle + settings + logout */}
			<div className="flex justify-end">
				<NavbarMenu />
			</div>
		</div>
	</header>
);

export default DashboardNavbar;
