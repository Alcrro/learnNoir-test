import { Code2 } from "lucide-react";
import { ProblemCard } from "../molecules/ProblemCard";
import { PaywallBanner } from "../../../../../../features/subscriptions/components/molecules/PaywallBanner";
import type { Exercise, ExerciseStatus } from "../lib/exerciseTypes";

type Props = {
	exercises: Exercise[];
	selectedId: string | null;
	statusMap: Record<string, ExerciseStatus>;
	onSelect: (id: string) => void;
	isPro: boolean;
};

export function ProblemListPanel({ exercises, selectedId, statusMap, onSelect, isPro }: Props) {
	const solvedCount = exercises.filter((e) => statusMap[e.id] === "passed").length;

	return (
		<aside className="flex h-full w-full flex-col border-r border-(--border)">
			<div className="border-b border-(--border) px-4 py-3.5">
				<h2 className="text-xs font-semibold uppercase tracking-wider text-(--text-secondary)">
					Exerciții
				</h2>
				<p className="mt-0.5 text-[10px] text-(--text-muted)">
					{solvedCount}/{exercises.length} rezolvate
				</p>
				{exercises.length > 0 && (
					<div className="mt-2 h-1 rounded-full bg-(--border) overflow-hidden">
						<div
							className="h-full rounded-full bg-emerald-500 transition-all duration-500"
							style={{ width: `${(solvedCount / exercises.length) * 100}%` }}
						/>
					</div>
				)}
			</div>

			<div className="flex-1 overflow-y-auto p-3 space-y-1.5">
				{exercises.map((ex) => (
					<div key={ex.id} className="relative">
						<ProblemCard
							exercise={ex}
							status={statusMap[ex.id] ?? "not_started"}
							isSelected={selectedId === ex.id}
							onSelect={() => onSelect(ex.id)}
						/>
					</div>
				))}

				{exercises.length === 0 && (
					<div className="flex flex-col items-center justify-center gap-2 py-12 text-(--text-muted)">
						<Code2 className="h-6 w-6 opacity-20" />
						<p className="text-xs">Niciun exercițiu disponibil</p>
					</div>
				)}

				{!isPro && exercises.length > 0 && (
					<PaywallBanner
						label="Deblochează toate exercițiile cu Pro"
						className="mt-1"
					/>
				)}
			</div>
		</aside>
	);
}
