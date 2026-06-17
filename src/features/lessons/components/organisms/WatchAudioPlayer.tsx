import { useRef, useState } from "react";
import type { LessonAudioData } from "../../api/lessonAudioApi";
import { WatchTeacherControls } from "../molecules/WatchTeacherControls";

type Props = {
	audio: LessonAudioData;
	isTeacherOrAdmin: boolean;
	isPendingGenerate: boolean;
	isCreator: boolean;
	onGenerate: () => void;
};

export function WatchAudioPlayer({ audio, isTeacherOrAdmin, isPendingGenerate, isCreator, onGenerate }: Props) {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [currentMs, setCurrentMs] = useState(0);

	const activeIndex = audio.script.findLastIndex((seg) => seg.start_ms <= currentMs);

	function handleTimeUpdate() {
		const el = audioRef.current;
		if (el) setCurrentMs(el.currentTime * 1000);
	}

	return (
		<div className="space-y-6 py-2">
			<div className="rounded-xl border border-(--border) bg-(--surface) p-4">
				<audio
					ref={audioRef}
					src={audio.audioUrl}
					onTimeUpdate={handleTimeUpdate}
					controls
					className="w-full"
				/>
			</div>

			<div className="space-y-3">
				{audio.script.map((seg, i) => (
					<p
						key={i}
						className={`rounded-lg px-3 py-2 text-sm leading-relaxed transition-colors ${
							i === activeIndex
								? "bg-(--accent)/10 font-medium text-(--text-primary)"
								: "text-(--text-muted)"
						}`}
					>
						{seg.text}
					</p>
				))}
			</div>

			{isTeacherOrAdmin && (
				<WatchTeacherControls
					variant="regenerate"
					isPending={isPendingGenerate}
					isCreator={isCreator}
					onGenerate={onGenerate}
				/>
			)}
		</div>
	);
}
