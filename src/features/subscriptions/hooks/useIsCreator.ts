import { useSubscription } from "./useSubscription";

export function useIsCreator(): boolean {
	const { data } = useSubscription();
	return data?.creator ?? false;
}
