import { useSubscription } from "./useSubscription";

export function useIsPro(): boolean {
	const { data } = useSubscription();
	return (data?.pro ?? false) || (data?.creator ?? false);
}
