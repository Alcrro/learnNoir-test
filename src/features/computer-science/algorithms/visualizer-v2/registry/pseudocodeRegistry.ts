import type { AlgorithmTypes, Step } from "../../shared/AlgorithmTypes";
import { bubblePseudo } from "../../data/pseudocode";
import { bubbleSortDocs } from "../../bubble-sort/docs/bubbleSortDocs";

export type PseudocodeLine = { text: string; indent: number };

export type StepDoc = {
	title: string;
	explanation: string;
	logic: string;
	mnemonic?: string;
};

export type AlgorithmPseudocode = {
	lines: PseudocodeLine[];
	docs: (step: Step) => StepDoc | null;
};

export const pseudocodeRegistry: Partial<Record<AlgorithmTypes, AlgorithmPseudocode>> = {
	"bubble-sort": {
		lines: bubblePseudo,
		docs: (step) => {
			const d = bubbleSortDocs(step);
			return {
				title: d.title,
				explanation: d.explanation,
				logic: d.logic,
				mnemonic: d.mnemonic,
			};
		},
	},
};
