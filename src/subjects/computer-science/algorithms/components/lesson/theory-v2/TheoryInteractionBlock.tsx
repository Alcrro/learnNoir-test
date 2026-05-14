import { Bot, Check, Loader2, RefreshCw } from "lucide-react";
import type { TheoryInteractionComponentType, TheoryInteractionDTO } from "../../../../../../features/lessons/api/lessonTheoryInteractionsApi";

type Props = {
	component: TheoryInteractionComponentType;
	label: string;
	isEditing: boolean;
	interaction: TheoryInteractionDTO | undefined;
	isGenerating: boolean;
	isApproving: boolean;
	onGenerate: () => void;
	onApprove: (id: string) => void;
	children?: React.ReactNode;
};

export function TheoryInteractionBlock({
	component: _component,
	label,
	isEditing,
	interaction,
	isGenerating,
	isApproving,
	onGenerate,
	onApprove,
	children,
}: Props) {
	if (!isEditing) {
		// Student view — just render the component
		return <>{children}</>;
	}

	const isDraft = interaction?.status === "draft";
	const isApproved = interaction?.status === "approved";
	const hasContent = !!interaction;

	return (
		<div className="lt-interaction-block">
			{/* Teacher toolbar */}
			<div className="lt-interaction-block__toolbar">
				<span className="lt-interaction-block__label">{label}</span>

				<div className="lt-interaction-block__actions">
					{hasContent && (
						<span className={`lt-interaction-block__status lt-interaction-block__status--${interaction.status}`}>
							{isDraft ? "Draft" : "Aprobat"}
						</span>
					)}

					{isDraft && interaction && (
						<button
							className="lt-interaction-block__btn lt-interaction-block__btn--approve"
							onClick={() => onApprove(interaction.id)}
							disabled={isApproving}
						>
							{isApproving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
							{isApproving ? "Se aprobă..." : "Aprobă"}
						</button>
					)}

					<button
						className="lt-interaction-block__btn lt-interaction-block__btn--generate"
						onClick={onGenerate}
						disabled={isGenerating}
					>
						{isGenerating ? (
							<Loader2 size={12} className="animate-spin" />
						) : hasContent ? (
							<RefreshCw size={12} />
						) : (
							<Bot size={12} />
						)}
						{isGenerating ? "Generează..." : hasContent ? "Regenerează" : "Generează cu AI"}
					</button>
				</div>
			</div>

			{/* Content: show the rendered component, or a placeholder if nothing exists yet */}
			{hasContent || children ? (
				<div className={`lt-interaction-block__content${isDraft ? " lt-interaction-block__content--draft" : ""}`}>
					{children}
					{isDraft && !isApproved && !children && (
						<div className="lt-interaction-block__draft-notice">
							Conținut generat — verifică și aprobă pentru a fi vizibil studenților.
						</div>
					)}
				</div>
			) : (
				<div className="lt-interaction-block__empty">
					<Bot size={14} className="lt-interaction-block__empty-icon" />
					<span>Nicio interacțiune generată încă pentru această secțiune.</span>
				</div>
			)}
		</div>
	);
}
