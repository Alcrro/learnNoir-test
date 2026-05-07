import { useState } from "react";
import { BarChart3, Code2 } from "lucide-react";
import { useAlgorithmStore } from "../../../../store/useAlgorithmStore";
import useAlgorithmController from "../../visualizer/hooks/useAlgorithmController";
import useArraySettings from "../../visualizer/hooks/useArraySettings";
import useCurrentArray from "../../visualizer/hooks/useCurrentArray";
import useStepFromUrl from "../../visualizer/hooks/useStepFromUrl";
import useSetSearchParams from "../../../../hooks/useSetSearchParams";
import { cn } from "../../../../libs/utils/cn";
import AlgorithmsControlsV2 from "../components/visualizers/AlgorithmsControlsV2";
import GenerateRandomArrayControlsV2 from "../components/visualizers/controls/GenerateRandomArrayControlsV2";
import VisualizerHeader from "./molecules/VisualizerHeader";
import VisualizerCanvas from "./organisms/VisualizerCanvas";
import PseudocodePanel from "./organisms/PseudocodePanel";
import { useVisualizerAnimation } from "./hooks/useVisualizerAnimation";
import { useCurrentAlgorithm } from "./hooks/useCurrentAlgorithm";
import { pseudocodeRegistry } from "./registry/pseudocodeRegistry";

type MobileTab = "canvas" | "code";

const VisualizerV2 = () => {
	const { step } = useStepFromUrl();
	const algorithm = useCurrentAlgorithm();
	const [mobileTab, setMobileTab] = useState<MobileTab>("canvas");

	const { arraySize, setArraySize } = useArraySettings();
	const currentStep = useAlgorithmStore((s) => s.currentStep);
	const setCurrentStep = useAlgorithmStore((s) => s.setCurrentStep);
	const steps = useAlgorithmStore((s) => s.steps);
	const currentArray = useCurrentArray();

	const { boxesRef, handleNextStep, handlePrevStep } = useAlgorithmController();

	useVisualizerAnimation({ boxesRef });
	useSetSearchParams({ currentStep: step });

	const hasPseudocode = algorithm != null && algorithm in pseudocodeRegistry;

	return (
		<div className="flex flex-col gap-3">
			{/* Header — always full width */}
			<VisualizerHeader
				algorithm={algorithm}
				currentStep={currentStep}
				steps={steps}
			/>

			{/* Mobile-only tab switcher — hidden on md+ */}
			{hasPseudocode && (
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
						onClick={() => setMobileTab("code")}
						className={cn(
							"flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-100",
							mobileTab === "code"
								? "bg-(--bg-card) text-(--text-primary) shadow-sm"
								: "text-(--text-muted) hover:text-(--text-secondary)",
						)}
					>
						<Code2 size={11} strokeWidth={2} />
						Code
					</button>
				</div>
			)}

			{/* Responsive grid: stacked on mobile, side-by-side on md+ */}
			<div
				className={cn(
					"grid gap-4 items-start",
					hasPseudocode ? "md:grid-cols-[1fr_280px]" : "grid-cols-1",
				)}
			>
				{/* Canvas column */}
				<div
					className={cn(
						"flex flex-col gap-2",
						hasPseudocode && mobileTab !== "canvas" && "hidden md:flex",
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

				{/* Pseudocode column */}
				{hasPseudocode && (
					<div
						className={cn(
							mobileTab !== "code" && "hidden md:block",
						)}
					>
						<PseudocodePanel
							algorithm={algorithm}
							currentStep={currentStep}
							steps={steps}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default VisualizerV2;
