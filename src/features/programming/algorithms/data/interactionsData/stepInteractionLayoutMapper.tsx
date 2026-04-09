import { Interaction } from "../../shared/engineInteractionTye";
import { compareInteraction, mcq, swapAction } from "./interactionData";

export const interactionMapper: Record<number, Interaction[]> = {
	1: [compareInteraction, swapAction, mcq],
	2: [compareInteraction],
	3: [swapAction],
};
