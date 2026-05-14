import { useState } from "react";
import { AlertTriangle, ChevronDown } from "lucide-react";
import type { LessonTheoryModel } from "../../../lib/buildAlgorithmLessonTheory";

type Props = {
	misconceptions: LessonTheoryModel["misconceptions"];
	onAllRevealed?: () => void;
};

export function MisconceptionReveal({ misconceptions, onAllRevealed }: Props) {
	const [open, setOpen] = useState<boolean[]>(() => misconceptions.map(() => false));
	const [allNotified, setAllNotified] = useState(false);

	const toggle = (i: number) => {
		setOpen((prev) => {
			const next = [...prev];
			next[i] = !next[i];
			if (!allNotified && next.every(Boolean)) {
				setAllNotified(true);
				onAllRevealed?.();
			}
			return next;
		});
	};

	return (
		<div className="lt-card">
			<div className="lt-card__header">
				<div className="lt-card__icon lt-card__icon--red">
					<AlertTriangle size={12} aria-hidden />
				</div>
				<span className="lt-card__title">Common mistakes</span>
				<span className="lt-card__sub">click to reveal</span>
			</div>
			<div className="lt-card__body">
				{misconceptions.map((m, i) => (
					<div className="lt-misc" key={m.title}>
						<button className="lt-misc__trigger" onClick={() => toggle(i)}>
							<span className="lt-misc__trigger-title">{m.title}</span>
							<ChevronDown
								size={14}
								className={`lt-misc__chevron${open[i] ? " lt-misc__chevron--open" : ""}`}
								aria-hidden
							/>
						</button>
						{open[i] && (
							<div className="lt-misc__body">
								<p>{m.body}</p>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
