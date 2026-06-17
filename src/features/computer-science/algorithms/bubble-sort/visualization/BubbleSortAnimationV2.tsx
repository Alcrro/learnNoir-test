import { useState } from "react";
import { BarChart3, Code2 } from "lucide-react";
import { useAlgorithmStore } from "../../../../../store/useAlgorithmStore";
import { useAlgorithmStoreV2 } from "../../../../../store/useAlgorithmStoreV2";
import useAlgorithmController from "../../../visualizer/hooks/useAlgorithmController";
import useArraySettings from "../../../visualizer/hooks/useArraySettings";
import useCurrentArray from "../../../visualizer/hooks/useCurrentArray";
import useStepFromUrl from "../../../visualizer/hooks/useStepFromUrl";
import useSetSearchParams from "../../../../../hooks/useSetSearchParams";
import { cn } from "../../../../../libs/utils/cn";
import AlgorithmsControlsV2 from "../../components/visualizers/AlgorithmsControlsV2";
import GenerateRandomArrayControlsV2 from "../../components/visualizers/controls/GenerateRandomArrayControlsV2";
import VisualizerHeader from "../../visualizer-v2/molecules/VisualizerHeader";
import VisualizerCanvas from "../../visualizer-v2/organisms/VisualizerCanvas";
import PseudocodePanel from "../../visualizer-v2/organisms/PseudocodePanel";
import VariableWatcher from "../../visualizer-v2/organisms/VariableWatcher";
import { useVisualizerAnimation } from "../../visualizer-v2/hooks/useVisualizerAnimation";
import { useGenerateBubbleSortV2 } from "../../visualizer-v2/hooks/useGenerateBubbleSortV2";

type MobileTab = "canvas" | "state";

const BubbleSortAnimationV2 = () => {
	const { step } = useStepFromUrl();
	const [mobileTab, setMobileTab] = useState<MobileTab>("canvas");

	const { arraySize, setArraySize } = useArraySettings();
	const currentStep = useAlgorithmStore((s) => s.currentStep);
	const setCurrentStep = useAlgorithmStore((s) => s.setCurrentStep);
	const steps = useAlgorithmStore((s) => s.steps);
	const stepsV2 = useAlgorithmStoreV2((s) => s.stepsV2);
	const currentArray = useCurrentArray();

	const { boxesRef, handleNextStep, handlePrevStep } = useAlgorithmController();

	useVisualizerAnimation({ boxesRef });
	useGenerateBubbleSortV2();
	useSetSearchParams({ currentStep: step });

	const currentStepV2 = currentStep >= 0 ? stepsV2[currentStep] : undefined;

	return (
		<div className="flex flex-col gap-3">
			<VisualizerHeader
				algorithm="bubble-sort"
				currentStep={currentStep}
				steps={steps}
			/>

			<div className="flex md:hidden gap-px bg-(--bg-secondary) border border-(--border) rounded-lg p-0.5 self-start">
				<button
					onClick={() => setMobileTab("canvas")}
					className={cn(
						"flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-100",
						mobileTab === "canvas"
							? "bg-(--bg-card) text-(--text-primary) shadow-sm"
							: "text-(--text-muted) hover:text-(--text-secondary)",
					)}
				>
					<BarChart3 size={11} strokeWidth={2} />
					Visualizer
				</button>
				<button
					onClick={() => setMobileTab("state")}
					className={cn(
						"flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-100",
						mobileTab === "state"
							? "bg-(--bg-card) text-(--text-primary) shadow-sm"
							: "text-(--text-muted) hover:text-(--text-secondary)",
					)}
				>
					<Code2 size={11} strokeWidth={2} />
					State
				</button>
			</div>

			<div className="grid gap-4 items-start md:grid-cols-[1fr_300px]">
				<div
					className={cn(
						"flex flex-col gap-2",
						mobileTab !== "canvas" && "hidden md:flex",
					)}
				>
					<GenerateRandomArrayControlsV2
						setCurrentStep={setCurrentStep}
						size={arraySize}
						setSize={setArraySize}
						boxesRef={boxesRef}
					/>
					<div className="flex flex-col rounded-xl overflow-hidden border border-(--border)">
						<div className="bg-(--lp-bg-page)">
							<VisualizerCanvas
								currentArray={currentArray}
								boxesRef={boxesRef}
							/>
						</div>
						<AlgorithmsControlsV2
							currentStep={currentStep}
							stepsLength={steps.length}
							handleNextStep={handleNextStep}
							handlePrevStep={handlePrevStep}
							boxesRef={boxesRef}
							setCurrentStep={setCurrentStep}
						/>
					</div>
				</div>

				<div
					className={cn(
						"flex flex-col gap-3",
						mobileTab !== "state" && "hidden md:flex",
					)}
				>
					<VariableWatcher
						vars={currentStepV2?.vars}
						stepType={currentStepV2?.type}
					/>
					<PseudocodePanel
						algorithm="bubble-sort"
						currentStep={currentStep}
						steps={stepsV2}
					/>
				</div>
			</div>
		</div>
	);
};

export default BubbleSortAnimationV2;
