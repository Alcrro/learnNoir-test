import { useOutletContext } from "react-router-dom";
import type { UserProfile } from "../../profiles/types/UserProfile.type";
import type { DashboardWorkspace, WorkspaceRole } from "../data/dashboardData";

export type DashboardOutletContext = {
	profile: UserProfile | null | undefined;
	profileName: string;
	profileRoleLabel: string;
	previewRole: WorkspaceRole;
	setPreviewRole: (role: WorkspaceRole) => void;
	workspace: DashboardWorkspace;
	isLoading: boolean;
};

export function useDashboardContext() {
	return useOutletContext<DashboardOutletContext>();
}
