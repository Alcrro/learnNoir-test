import { create } from "zustand";
import { persist } from "zustand/middleware";

type VisualAlgorithmUIProps = {
	visualAlgorithmUI: string;
	setVisualAlgorithmUI: (value: string) => void;
};

export const useVisualAlgorithmUIStore = create<VisualAlgorithmUIProps>()(
	persist(
		(set) => ({
			visualAlgorithmUI: "",
			setVisualAlgorithmUI: (visual) => set({ visualAlgorithmUI: visual }),
		}),
		{ name: "visual-algorithm-ui" },
	),
);
