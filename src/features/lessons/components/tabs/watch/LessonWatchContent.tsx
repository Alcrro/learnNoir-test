import { useRef, useState } from "react";
import { useLessonAudio } from "../../../hooks/useLessonAudio";
import UseGetProfile from "../../../../profiles/hooks/UseGetProfile";

type Props = { lessonId: string };

export function LessonWatchContent({ lessonId }: Props) {
	const { query, generate } = useLessonAudio(lessonId);
	const { data: profile } = UseGetProfile();
	const audioRef = useRef<HTMLAudioElement>(null);
	const [currentMs, setCurrentMs] = useState(0);

	const isTeacherOrAdmin = profile?.role === "teacher" || profile?.role === "admin";
	const audio = query.data;

	const activeIndex = audio
		? audio.script.findLastIndex((seg) => seg.start_ms <= currentMs)
		: -1;

	function handleTimeUpdate() {
		const el = audioRef.current;
		if (el) setCurrentMs(el.currentTime * 1000);
	}

	if (query.isLoading) {
		return (
			<div className="space-y-3 py-4">
				{[1, 2, 3].map((i) => (
					<div key={i} className="h-4 animate-pulse rounded bg-(--border)" />
				))}
			</div>
		);
	}

	if (!audio) {
		return (
			<div className="flex flex-col items-center gap-4 py-10">
				<p className="text-sm text-(--text-muted)">
					Naratia audio nu a fost inca generata pentru aceasta lectie.
				</p>
				{isTeacherOrAdmin && (
					<button
						onClick={() => generate.mutate()}
						disabled={generate.isPending}
						className="rounded-lg bg-(--accent) px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
					>
						{generate.isPending ? "Se genereaza..." : "Genereaza naratie"}
					</button>
				)}
				{generate.isError && (
					<p className="text-xs text-red-500">
						Generarea a esuat. Incearca din nou.
					</p>
				)}
			</div>
		);
	}

	return (
		<div className="space-y-6 py-2">
			{/* Audio player */}
			<div className="rounded-xl border border-(--border) bg-(--surface) p-4">
				<audio
					ref={audioRef}
					src={audio.audioUrl}
					onTimeUpdate={handleTimeUpdate}
					controls
					className="w-full"
				/>
			</div>

			{/* Transcript */}
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

			{/* Regenerate button for teachers */}
			{isTeacherOrAdmin && (
				<button
					onClick={() => generate.mutate()}
					disabled={generate.isPending}
					className="text-xs text-(--text-muted) underline underline-offset-2 disabled:opacity-50"
				>
					{generate.isPending ? "Se regenereaza..." : "Regenereaza naratie"}
				</button>
			)}
		</div>
	);
}
