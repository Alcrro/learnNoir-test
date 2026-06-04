import { useSubscription } from "./useSubscription";

export function useIsPro(): boolean {
	const { data } = useSubscription();
	return data?.plan === "pro";
}
