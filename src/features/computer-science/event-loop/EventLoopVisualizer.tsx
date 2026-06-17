import {
	useState,
	useRef,
	useLayoutEffect,
	useEffect,
} from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import {
	Play,
	Pause,
	RotateCcw,
	ChevronLeft,
	ChevronRight,
	RefreshCw,
} from "lucide-react";
import { cn } from "../../../libs/utils/cn";
import { eventLoopScenarios } from "./domain/eventLoopScenarios";
import EventLoopSection from "./components/EventLoopSection";
import EventLoopCodeDisplay from "./components/EventLoopCodeDisplay";

gsap.registerPlugin(Flip);

const SECTION_COLORS = {
	callStack: "#ff6b6b",
	webApis: "#9b59b6",
	taskQueue: "#e91e8c",
	microtaskQueue: "#1abc9c",
	eventLoop: "#3b82f6",
} as const;

function ControlBtn({
	onClick,
	disabled,
	children,
	title,
}: {
	onClick: () => void;
	disabled?: boolean;
	children: React.ReactNode;
	title?: string;
}) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			title={title}
			className={cn(
				"flex items-center justify-center w-9 h-9 rounded-lg border transition-colors",
				"border-(--border) text-(--text-secondary)",
				"hover:text-(--text-primary) hover:border-(--text-muted)",
				"disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-(--text-secondary) disabled:hover:border-(--border)",
			)}
		>
			{children}
		</button>
	);
}

const EventLoopVisualizer = () => {
	const [scenarioIdx, setScenarioIdx] = useState(0);
	const [currentFrame, setCurrentFrame] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null);

	const scenario = eventLoopScenarios[scenarioIdx];
	const frame = scenario ? scenario.frames[currentFrame] : undefined;
	const totalFrames = scenario?.frames.length ?? 0;

	const goToFrame = (idx: number) => {
		if (!scenario || idx < 0 || idx >= totalFrames) return;
		flipStateRef.current = Flip.getState("[data-flip-id]");
		setCurrentFrame(idx);
	};

	useLayoutEffect(() => {
		if (!flipStateRef.current) return;
		const state = flipStateRef.current;
		flipStateRef.current = null;

		requestAnimationFrame(() => {
			Flip.from(state, {
				duration: 0.45,
				ease: "power2.inOut",
				onEnter: (els: Element[]) =>
					gsap.from(els, {
						opacity: 0,
						scale: 0.4,
						duration: 0.3,
						ease: "back.out(2)",
					}),
				onLeave: (els: Element[]) =>
					gsap.to(els, {
						opacity: 0,
						scale: 0.4,
						duration: 0.25,
					}),
			});
		});
	}, [currentFrame]);

	useEffect(() => {
		if (!isPlaying) return;
		if (currentFrame >= totalFrames - 1) {
			setIsPlaying(false);
			return;
		}
		const id = setTimeout(() => goToFrame(currentFrame + 1), 1300);
		return () => clearTimeout(id);
	}, [isPlaying, currentFrame, totalFrames]);

	const handleScenarioChange = (idx: number) => {
		setScenarioIdx(idx);
		setCurrentFrame(0);
		setIsPlaying(false);
	};

	if (!scenario || !frame) return null;

	return (
		<div className="flex flex-col gap-4">
			{/* Scenario tabs */}
			<div className="flex items-center justify-between flex-wrap gap-3">
				<div className="flex gap-1.5 p-1 bg-(--bg-secondary) rounded-lg border border-(--border)">
					{eventLoopScenarios.map((s, i) => (
						<button
							key={s.id}
							onClick={() => handleScenarioChange(i)}
							className={cn(
								"px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-100",
								i === scenarioIdx
									? "bg-(--bg-card) text-(--text-primary) shadow-sm"
									: "text-(--text-muted) hover:text-(--text-secondary)",
							)}
						>
							{s.title}
						</button>
					))}
				</div>
				<span className="text-xs font-mono text-(--text-muted)">
					{currentFrame + 1} / {totalFrames}
				</span>
			</div>

			{/* Main layout */}
			<div className="grid gap-4 items-start md:grid-cols-[200px_1fr]">
				{/* Code display */}
				<EventLoopCodeDisplay
					code={scenario.code}
					activeLine={frame.activeLine}
				/>

				{/* JS Runtime diagram */}
				<div
					className="relative rounded-xl border border-(--border) p-5 pt-7"
					style={{ backgroundColor: "#0a0a12" }}
				>
					{/* Runtime label */}
					<span
						className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase rounded-full border"
						style={{
							backgroundColor: "#0a0a12",
							borderColor: "rgba(255,255,255,0.1)",
							color: "rgba(255,255,255,0.4)",
						}}
					>
						JavaScript Runtime
					</span>

					<div className="flex flex-col gap-4">
						{/* Top row */}
						<div className="grid grid-cols-2 gap-4">
							<EventLoopSection
								title="Call Stack"
								items={frame.callStack}
								color={SECTION_COLORS.callStack}
								minHeight={130}
							/>
							<EventLoopSection
								title="Web APIs"
								items={frame.webApis}
								color={SECTION_COLORS.webApis}
								minHeight={130}
							/>
						</div>

						{/* Bottom row */}
						<div className="flex gap-4 items-stretch">
							{/* Event Loop spinner */}
							<div className="flex flex-col items-center justify-center gap-2 w-20 shrink-0 py-2">
								<div
									className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
									style={{
										borderColor: SECTION_COLORS.eventLoop,
										boxShadow: `0 0 16px ${SECTION_COLORS.eventLoop}50`,
									}}
								>
									<RefreshCw
										size={20}
										className={cn(
											"transition-colors duration-200",
											frame.eventLoopActive
												? "animate-spin"
												: "",
										)}
										style={{
											color: frame.eventLoopActive
												? SECTION_COLORS.eventLoop
												: `${SECTION_COLORS.eventLoop}60`,
										}}
									/>
								</div>
								<span
									className="text-[10px] font-semibold tracking-wide text-center leading-tight"
									style={{ color: `${SECTION_COLORS.eventLoop}90` }}
								>
									Event Loop
								</span>
							</div>

							{/* Queues */}
							<div className="flex-1 flex flex-col gap-3">
								<EventLoopSection
									title="Task Queue"
									items={frame.taskQueue}
									color={SECTION_COLORS.taskQueue}
									minHeight={60}
								/>
								<EventLoopSection
									title="Microtask Queue"
									items={frame.microtaskQueue}
									color={SECTION_COLORS.microtaskQueue}
									minHeight={60}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Description */}
			<div className="rounded-xl border border-(--border) px-4 py-3 bg-(--bg-secondary) min-h-12 flex items-center">
				<p className="text-sm text-(--text-primary) leading-relaxed">
					{frame.description}
				</p>
			</div>

			{/* Controls */}
			<div className="flex items-center justify-center gap-2">
				<ControlBtn
					onClick={() => {
						setCurrentFrame(0);
						setIsPlaying(false);
					}}
					title="Reset"
				>
					<RotateCcw size={14} />
				</ControlBtn>

				<ControlBtn
					onClick={() => goToFrame(currentFrame - 1)}
					disabled={currentFrame === 0}
					title="Previous step"
				>
					<ChevronLeft size={16} />
				</ControlBtn>

				<button
					onClick={() => setIsPlaying((p) => !p)}
					className={cn(
						"flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium transition-colors",
						"border-(--border) text-(--text-primary)",
						"hover:bg-(--bg-secondary)",
					)}
				>
					{isPlaying ? (
						<>
							<Pause size={13} />
							Pause
						</>
					) : (
						<>
							<Play size={13} />
							Play
						</>
					)}
				</button>

				<ControlBtn
					onClick={() => goToFrame(currentFrame + 1)}
					disabled={currentFrame >= totalFrames - 1}
					title="Next step"
				>
					<ChevronRight size={16} />
				</ControlBtn>
			</div>
		</div>
	);
};

export default EventLoopVisualizer;
