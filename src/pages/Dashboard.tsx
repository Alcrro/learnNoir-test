import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../features/dashboards/components/molecules/DashboardNavbar";
import Sidebar from "../features/dashboards/components/molecules/SidebarItems";
import UseGetProfile from "../features/profiles/hooks/UseGetProfile";
import { cn } from "../libs/utils/cn";
import {
	getDashboardWorkspace,
	getRoleLabel,
	type WorkspaceRole,
} from "../features/dashboards/data/dashboardData";

const Dashboard = () => {
	const profileQuery = UseGetProfile();
	const [rolePreference, setRolePreference] = useState<WorkspaceRole | null>(
		null,
	);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const profile = profileQuery.data;
	const profileRole =
		profile?.role === "teacher" || profile?.role === "student"
			? (profile.role as WorkspaceRole)
			: "teacher";
	const previewRole = rolePreference ?? profileRole;
	const workspace = getDashboardWorkspace(previewRole);
	const profileName = profile?.username ?? "Classroom workspace";
	const profileRoleLabel = getRoleLabel(profileRole);
	const liveLesson =
		workspace.lessons.find((l) => l.status === "Live") ??
		workspace.lessons.find((l) => l.status === "Scheduled") ??
		workspace.lessons[0] ??
		null;

	function handleRoleChange(role: WorkspaceRole) {
		setRolePreference(role);
	}

	return (
		<div className="min-h-screen bg-(--bg-page) px-3 py-3 text-(--text-primary) sm:px-4 sm:py-4 lg:px-6">
			<div className="mx-auto flex max-w-7xl flex-col gap-4">
				<DashboardNavbar
					previewRole={previewRole}
					profileName={profileName}
					liveLesson={liveLesson}
					onOpenSidebar={() => setIsSidebarOpen(true)}
				/>

				<div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
					<div className="hidden lg:block">
						<Sidebar
							previewRole={previewRole}
							profileName={profileName}
							onRoleChange={handleRoleChange}
						/>
					</div>

					<div className="min-w-0">
						<Outlet
							context={{
								profile,
								profileName,
								profileRoleLabel,
								previewRole,
								setPreviewRole: handleRoleChange,
								workspace,
								isLoading: profileQuery.isLoading,
							}}
						/>
					</div>
				</div>

				<div
					className={cn(
						"fixed inset-0 z-40 bg-black/40 transition lg:hidden",
						isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0",
					)}
					onClick={() => setIsSidebarOpen(false)}
				/>
				<div
					className={cn(
						"fixed inset-y-0 left-0 z-50 w-[min(88vw,320px)] p-3 transition-transform lg:hidden",
						isSidebarOpen ? "translate-x-0" : "-translate-x-full",
					)}
				>
					<Sidebar
						previewRole={previewRole}
						profileName={profileName}
						onRoleChange={handleRoleChange}
						className="h-full"
						onNavigate={() => setIsSidebarOpen(false)}
					/>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
