import { useGetMe } from "../../auth/hooks/useAuth";
import { getProfile } from "../services/getProfile";
import { useQuery } from "@tanstack/react-query";

const UseGetProfile = () => {
	const { data } = useGetMe();
	console.log({ data });

	return useQuery({
		queryKey: ["profile", data?.userId],
		queryFn: () => getProfile(data!.userId),
		enabled: !!data?.userId,

		// staleTime: 1000 * 60 * 10,

		refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes to keep profile data fresh

		refetchOnMount: true, // Refetch when the component mounts to ensure we have the latest profile data
		refetchOnWindowFocus: false,
	});
};

export default UseGetProfile;
