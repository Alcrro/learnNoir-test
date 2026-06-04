import { useState } from "react";
import { Sparkles, Pencil, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "../../../../../libs/utils/cn";
import { useIsCreator } from "../../../../subscriptions/hooks/useIsCreator";
import { CreatorPaywallBanner } from "../../../../subscriptions/components/molecules/CreatorPaywallBanner";
import { lessonAIApi } from "../../../api/lessonAIApi";
import { NODE_REGISTRY } from "../../tabs/theory/node-registry";
import type { LessonContentNode } from "@shared/lesson-content";
import type { AnyNode } from "../../tabs/theory/node-registry";

type Tab = "ai" | "manual";

type Props = {
	nodeId: string;
	node: LessonContentNode;
	lessonTitle?: string;
	onUpdate: (id: string, updated: LessonContentNode) => void;
	onClose: () => void;
};

export function NodeContentPanel({ nodeId, node, lessonTitle, onUpdate, onClose }: Props) {
	const [tab, setTab] = useState<Tab>("ai");
	const [context, setContext] = useState("");
	const [generating, setGenerating] = useState(false);
	const [genError, setGenError] = useState<string | null>(null);
	const [generated, setGenerated] = useState(false);
	const isCreator = useIsCreator();

	const EditPanel = NODE_REGISTRY[node.type]?.EditPanel;
	const hasEditPanel = !!EditPanel;

	async function handleGenerate() {
		if (!context.trim()) {
			setGenError("Completează câmpul de mai sus înainte de a genera.");
			return;
		}
		setGenerating(true);
		setGenError(null);
		setGenerated(false);
		try {
			const topic = lessonTitle
				? `${node.type} node pentru "${lessonTitle}": ${context}`
				: `${node.type} node: ${context}`;

			const nodes = await lessonAIApi.generateBlocks(topic);
			const match = nodes.find((n) => (n as Record<string, unknown>).type === node.type) ?? nodes[0];
			if (match) {
				onUpdate(nodeId, match as LessonContentNode);
				if (hasEditPanel) {
					setTab("manual");
				} else {
					onClose();
				}
				setGenerated(true);
			} else {
				setGenError("AI-ul nu a generat un nod valid. Încearcă cu mai mult context.");
			}
		} catch (err) {
			setGenError(err instanceof Error ? err.message : "Eroare la generare");
		} finally {
			setGenerating(false);
		}
	}

	return (
		<div className="border-t border-(--border) mt-2 pt-3 flex flex-col gap-3">
			{/* Tab switcher */}
			<div className="flex gap-1">
				<button
					type="button"
					onClick={() => setTab("ai")}
					className={cn(
						"flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
						tab === "ai"
							? "bg-(--btn-primary-bg) text-(--btn-primary-text)"
							: "text-(--text-secondary) hover:bg-(--surface-hover)",
					)}
				>
					<Sparkles size={12} />
					Generează cu AI
				</button>
				{hasEditPanel && (
					<button
						type="button"
						onClick={() => setTab("manual")}
						className={cn(
							"flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
							tab === "manual"
								? "bg-(--btn-primary-bg) text-(--btn-primary-text)"
								: "text-(--text-secondary) hover:bg-(--surface-hover)",
						)}
					>
						<Pencil size={12} />
						Editează manual
					</button>
				)}
			</div>

			{/* AI tab */}
			{tab === "ai" && (
				<div className="flex flex-col gap-2">
					<label className="text-xs text-(--text-secondary)">
						Descrie ce vrei să conțină acest bloc — AI-ul va genera structura potrivită pentru tipul{" "}
						<span className="font-mono text-(--text-primary)">{node.type}</span>.
					</label>
					<textarea
						value={context}
						onChange={(e) => { setContext(e.target.value); setGenerated(false); setGenError(null); }}
						placeholder={getPlaceholder(node.type)}
						rows={3}
						className={cn(
							"w-full resize-none rounded-lg border border-(--border) bg-(--bg-input) px-3 py-2",
							"text-sm text-(--text-primary) placeholder:text-(--text-muted)",
							"focus:outline-none focus:ring-1 focus:ring-(--border-active)",
						)}
					/>
					{genError && (
						<p className="text-xs text-red-500">{genError}</p>
					)}
					{generated && !hasEditPanel && (
						<p className="flex items-center gap-1.5 text-xs text-green-500">
							<CheckCircle2 size={13} />
							Conținut generat cu succes.
						</p>
					)}
					<button
						type="button"
						onClick={isCreator ? handleGenerate : undefined}
						disabled={generating || !isCreator}
						className={cn(
							"flex items-center gap-2 self-start rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
							"bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-bg-hover)",
							(generating || !isCreator) && "opacity-50 cursor-not-allowed",
						)}
					>
						{generating ? (
							<><Loader2 size={14} className="animate-spin" /> Se generează…</>
						) : (
							<><Sparkles size={14} /> Generează</>
						)}
					</button>
					{!isCreator && (
						<CreatorPaywallBanner feature="Generare blocuri AI" />
					)}
				</div>
			)}

			{/* Manual edit tab */}
			{tab === "manual" && hasEditPanel && EditPanel && (
				<div className="flex flex-col gap-2">
					<EditPanel
						node={node as AnyNode}
						onSave={(updated: AnyNode) => {
							onUpdate(nodeId, updated as LessonContentNode);
							onClose();
						}}
						onCancel={onClose}
					/>
				</div>
			)}
		</div>
	);
}

function getPlaceholder(type: string): string {
	const map: Record<string, string> = {
		concept: "ex: Explică ce este Merge Sort, cum împarte array-ul și de ce e eficient",
		steps: "ex: Pașii algoritmului Merge Sort — divide, recursiv, merge",
		example: "ex: Exemplu cu array-ul [38, 27, 43, 3] sortat prin Merge Sort",
		complexity: "ex: Complexitatea Merge Sort — O(n log n) în toate cazurile, O(n) spațiu",
		formula: "ex: Relația de recurență T(n) = 2T(n/2) + O(n)",
		theorem: "ex: Teorema master pentru Merge Sort",
		proof: "ex: Demonstrația complexității O(n log n) prin inducție",
		think: "ex: Întrebare de reflecție despre de ce Merge Sort e stabil",
		predict: "ex: Predicție despre ordinea elementelor după primul pas",
		recall: "ex: 3 întrebări despre pașii și complexitatea Merge Sort",
		"inline-quiz": "ex: MCQ despre complexitatea spațiu a Merge Sort",
		"fill-blanks": "ex: Completare cod pentru funcția de merge",
		"drag-sort": "ex: Ordonare pași algoritm Merge Sort",
		"code-runner": "ex: Implementare Merge Sort în JavaScript cu array de test",
		heading: "ex: Titlu pentru secțiunea de complexitate",
		paragraph: "ex: Paragraf introductiv despre divide et impera",
		code: "ex: Implementare Merge Sort în JavaScript",
	};
	return map[type] ?? "Descrie ce conținut vrei să genereze AI-ul pentru acest bloc…";
}
