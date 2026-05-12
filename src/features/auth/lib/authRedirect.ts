import type { AuthLocationState } from "../types/LoginTypes.type";

export function resolveRedirectTarget(locationState: AuthLocationState | null): string {
	const bg = locationState?.backgroundLocation;
	if (bg) {
		return `${bg.pathname}${bg.search ?? ""}${bg.hash ?? ""}`;
	}
	return locationState?.redirectTo ?? "/dashboard";
}
