import { useState } from "react";
import { Plus, Save } from "lucide-react";
import { cn } from "../../../../../libs/utils/cn";
import { useToastStore } from "../../../../../store/useToastStore";
import { useLayoutBuilder } from "../hooks/useLayoutBuilder";
import { CompletenessPanel } from "../molecules/CompletenessPanel";
import { BuilderCanvas } from "./BuilderCanvas";
import { NodePicker } from "./NodePicker";
import type { LessonContentNode } from "@shared/lesson-content";

type Props = {
	lessonId: string;
	lessonTitle?: string;
	blockId: string | null;
	initialNodes: LessonContentNode[];
	onSaveSuccess: () => void;
};

export function LayoutBuilder({ lessonId, lessonTitle, blockId, initialNodes, onSaveSuccess }: Props) {
	const [pickerOpen, setPickerOpen] = useState(false);
	const toast = useToastStore();

	const builder = useLayoutBuilder({ lessonId, blockId, initialNodes });
	const { nodes, isDirty, saving, completeness, addNode, removeNode, reorderNodes, updateNode, save } = builder;

	function handleSelect(nodeType: string) {
		const warnings = addNode(nodeType);
		setPickerOpen(false);
		if (warnings.length > 0) {
			toast.show(`⚠ ${warnings[0].message}`, "info");
		}
	}

	async function handleSave() {
		try {
			await save();
			onSaveSuccess();
			toast.show("Layout salvat cu succes");
		} catch {
			toast.show(builder.saveError ?? "Eroare la salvare. Încearcă din nou.", "info");
		}
	}

	const canSave = isDirty && !saving && nodes.length > 0;

	return (
		<div className="flex flex-col gap-4">
			<CompletenessPanel
				result={completeness}
				onAddSuggested={(nodeType) => {
					const warnings = addNode(nodeType);
					if (warnings.length > 0) toast.show(`⚠ ${warnings[0].message}`, "info");
				}}
			/>

			<BuilderCanvas
				nodes={nodes}
				lessonTitle={lessonTitle}
				onReorder={reorderNodes}
				onDelete={removeNode}
				onUpdate={updateNode}
			/>

			<div className="flex items-center justify-between gap-3 pt-1">
				<button
					type="button"
					onClick={() => setPickerOpen(true)}
					className={cn(
						"btn flex items-center gap-2",
						"border border-(--border) bg-(--bg-card) text-(--text-primary)",
						"hover:bg-(--surface-hover) transition-colors",
						"px-4 py-2 text-sm rounded-lg",
					)}
				>
					<Plus size={16} />
					Adaugă bloc
				</button>

				<button
					type="button"
					onClick={handleSave}
					disabled={!canSave}
					title={nodes.length === 0 ? "Adaugă cel puțin un bloc înainte de a salva" : undefined}
					className={cn(
						"btn flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors",
						"bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-bg-hover)",
						!canSave && "opacity-50 cursor-not-allowed",
					)}
				>
					<Save size={16} />
					{saving ? "Se salvează…" : "Salvează"}
				</button>
			</div>

			<NodePicker
				open={pickerOpen}
				onClose={() => setPickerOpen(false)}
				onSelect={handleSelect}
				existingNodes={nodes}
				disabled={saving}
			/>
		</div>
	);
}
