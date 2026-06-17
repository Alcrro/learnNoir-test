import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { ControlBtn } from "../atoms/ControlBtn";

interface StepControlsProps {
	currentFrame: number;
	totalFrames: number;
	isPlaying: boolean;
	onReset: () => void;
	onPrev: () => void;
	onPlayPause: () => void;
	onNext: () => void;
	onShuffle: () => void;
}

export function StepControls({
	currentFrame,
	totalFrames,
	isPlaying,
	onReset,
	onPrev,
	onPlayPause,
	onNext,
	onShuffle,
}: StepControlsProps) {
	return (
		<div className="flex items-center justify-center gap-2">
			<ControlBtn onClick={onReset} title="Reset">
				<RotateCcw size={14} />
			</ControlBtn>
			<ControlBtn onClick={onPrev} disabled={currentFrame === 0} title="Previous">
				<ChevronLeft size={16} />
			</ControlBtn>
			<button
				onClick={onPlayPause}
				className="flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium transition-colors border-(--border) text-(--text-primary) hover:bg-(--bg-secondary)"
			>
				{isPlaying ? <><Pause size={13} /> Pause</> : <><Play size={13} /> Play</>}
			</button>
			<ControlBtn onClick={onNext} disabled={currentFrame >= totalFrames - 1} title="Next">
				<ChevronRight size={16} />
			</ControlBtn>
			<ControlBtn onClick={onShuffle} title="New random array">
				<Shuffle size={14} />
			</ControlBtn>
		</div>
	);
}
