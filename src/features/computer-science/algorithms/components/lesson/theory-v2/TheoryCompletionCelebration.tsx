import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Trophy, ArrowRight, Clock, Zap, X, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import type { LessonTheoryModel } from "../../../lib/buildAlgorithmLessonTheory";

const TONE_CLASS: Record<"red" | "amber" | "green", string> = {
	red: "text-red-400 bg-red-500/10 border-red-500/20",
	amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
	green: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

type Props = {
	open: boolean;
	onClose: () => void;
	model: LessonTheoryModel;
	quizScore: number;
	justCompleted: boolean;
};

export function TheoryCompletionCelebration({ open, onClose, model, quizScore, justCompleted }: Props) {
	// Confetti only when the user finished in this session, not on page reload.
	useEffect(() => {
		if (!open || !justCompleted) return;

		void confetti({
			particleCount: 160,
			spread: 80,
			origin: { y: 0.5 },
			colors: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899"],
		});
		const t = setTimeout(() => {
			void confetti({ particleCount: 80, angle: 60, spread: 65, origin: { x: 0, y: 0.5 }, colors: ["#3b82f6", "#8b5cf6"] });
			void confetti({ particleCount: 80, angle: 120, spread: 65, origin: { x: 1, y: 0.5 }, colors: ["#f59e0b", "#ec4899"] });
		}, 300);

		return () => clearTimeout(t);
	}, [open, justCompleted]);

	// Escape to close
	useEffect(() => {
		if (!open) return;
		const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [open, onClose]);

	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => { document.body.style.overflow = ""; };
	}, [open]);

	if (!open) return null;

	return createPortal(
		<div
			className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
			onClick={onClose}
		>
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

			{/* Modal */}
			<div
				className="relative z-10 w-full max-w-lg rounded-2xl border border-(--border) bg-(--bg-card) shadow-2xl overflow-hidden"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close */}
				<button
					onClick={onClose}
					className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-(--text-muted) hover:bg-(--border) hover:text-(--text-primary) transition-colors"
				>
					<X size={16} />
				</button>

				{/* Header */}
				<div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 px-6 pt-8 pb-6 text-center border-b border-(--border)">
					<div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/20 ring-2 ring-blue-500/40">
						<Trophy size={26} className="text-blue-400" />
					</div>
					<h2 className="text-2xl font-bold text-(--text-primary)">Felicitări!</h2>
					<p className="mt-1 text-sm text-(--text-muted)">
						Ai parcurs toată lecția <span className="font-medium text-(--text-primary)">{model.title}</span>
					</p>
					<div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 px-3 py-1 text-sm font-semibold text-blue-400">
						<CheckCircle2 size={13} />
						Quiz score: {quizScore}%
					</div>
				</div>

				{/* Summary body */}
				<div className="max-h-[55vh] overflow-y-auto px-6 py-5 space-y-4">
					{/* Key idea */}
					<div>
						<p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-(--text-muted)">
							Ideea centrală
						</p>
						<p className="text-sm leading-relaxed text-(--text-secondary)">{model.keyIdea}</p>
					</div>

					{/* Steps */}
					{model.steps.length > 0 && (
						<div>
							<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-(--text-muted)">
								Pașii algoritmului
							</p>
							<ol className="space-y-2">
								{model.steps.map((step, i) => (
									<li key={i} className="flex items-start gap-3">
										<span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--border) text-xs font-semibold text-(--text-muted)">
											{i + 1}
										</span>
										<div>
											<span className="text-sm font-medium text-(--text-primary)">{step.title}</span>
											{step.description && (
												<p className="mt-0.5 text-xs text-(--text-muted) leading-relaxed">{step.description}</p>
											)}
										</div>
									</li>
								))}
							</ol>
						</div>
					)}

					{/* Complexity */}
					{model.complexityCases.length > 0 && (
						<div>
							<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-(--text-muted)">
								Complexitate
							</p>
							<div className="flex flex-wrap gap-2">
								{model.complexityCases.map((c, i) => (
									<div
										key={i}
										className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium ${TONE_CLASS[c.tone]}`}
									>
										{c.label === "Time" ? <Clock size={11} /> : <Zap size={11} />}
										<span className="opacity-70">{c.label}:</span>
										<span className="font-mono">{c.value}</span>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="flex items-center justify-between gap-3 border-t border-(--border) px-6 py-4">
					<button
						onClick={onClose}
						className="rounded-xl border border-(--border) px-4 py-2 text-sm text-(--text-secondary) hover:bg-(--border) transition-colors"
					>
						Închide
					</button>

					{model.nextLesson?.path ? (
						<Link
							to={model.nextLesson.path}
							onClick={onClose}
							className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-blue-500 transition-colors"
						>
							{model.nextLesson.name}
							<ArrowRight size={14} />
						</Link>
					) : (
						<button
							onClick={onClose}
							className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-blue-500 transition-colors"
						>
							Super!
						</button>
					)}
				</div>
			</div>
		</div>,
		document.body,
	);
}
