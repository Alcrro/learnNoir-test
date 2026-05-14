import { useGetMe } from "../../auth/hooks/useAuth";
import { getProfile } from "../api/getProfile";
import { useQuery } from "@tanstack/react-query";
import { authQueryKeys } from "../../auth/lib/authQueryKeys";

const UseGetProfile = () => {
	const meQuery = useGetMe();
	const userId = meQuery.data?.userId;

	const profileQuery = useQuery({
		queryKey: authQueryKeys.profile(userId),
		queryFn: () => getProfile(userId),
		enabled: Boolean(userId),

		refetchInterval: 5 * 60 * 1000,
		refetchOnMount: true,
		refetchOnWindowFocus: false,
	});

	return {
		...profileQuery,
		authUser: meQuery.data,
		isAuthenticated: Boolean(userId),
		isAuthLoading: meQuery.isLoading,
		isLoading: meQuery.isLoading || (Boolean(userId) && profileQuery.isLoading),
	};
};

export default UseGetProfile;
