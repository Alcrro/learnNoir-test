import React, { useCallback, useState } from "react";
import DefaultButton from "../../../../../components/atoms/DefaultButton";
import AnswerOption from "../../../../../components/molecules/interactions/AnswerOption";
import StepInteraction from "./StepInteraction";
import { AnswerOptionType } from "../../shared/engineInteractionTye";
import { interactionMapper } from "../../data/interactionsData/stepInteractionLayoutMapper";

const InteractionLayout = ({
	stepValues,
}: {
	stepValues: Record<"first" | "second", number>;
}) => {
	const [answers, setAnswers] = useState<
		Record<string, boolean | string[] | AnswerOptionType[]>
	>({});

	const currentInteraction = interactionMapper[1] ?? [];

	const { first, second } = stepValues;

	const handleSubmit = () => {
		currentInteraction.forEach((interaction) => {
			const selected = answers[interaction.id];

			if (!selected) return;

			const isCorrect = interaction.validate(
				{ a: first, b: second },
				selected as boolean | string[],
			);

			console.log(interaction.id, isCorrect);
		});
	};

	const handleSelect = useCallback((id: string, value: AnswerOptionType[]) => {
		setAnswers((prev) => ({ ...prev, [id]: value }));
	}, []);
	return (
		<div className="py-2">
			<ol className="w-full list-decimal list-outside flex flex-col gap-4">
				{currentInteraction.map((interaction, index) => (
					<li
						key={interaction.id}
						className="pl-4"
					>
						<div className="rounded-xl shadow-sm p-5 border border-gray-200 pl6">
							{/* Question */}
							<div className="mb-3 text-sm text-gray-500">Question {index + 1}</div>

							<div className="text-lg font-medium mb-4">
								{interaction.question({ a: first, b: second })}
							</div>

							{/* Render by type */}
							{interaction.type === "single_choice" && (
								<AnswerOption
									options={interaction.options ?? []}
									onSelect={(value) => handleSelect(interaction.id, [value])}
								/>
							)}

							{interaction.type === "action" && (
								<div className="p-4 rounded-lg border border-dashed flex justify-center">
									<StepInteraction
										interactionData={{ items: [first, second] }}
										renderItem={(item) => (
											<>
												<div className="bg-purple-600 px-4 py-2 rounded">{item}</div>
												{interaction.options && index < interaction.options.length - 1 && (
													<span className="absolute -right-5 top-1/2 -translate-y-1/2 pointer-events-none">
														{">"}
													</span>
												)}
											</>
										)}
									/>
								</div>
							)}
							{interaction.type === "boolean" && (
								<AnswerOption
									options={interaction.options}
									onSelect={(value) => handleSelect(interaction.id, [value])}
								/>
							)}
						</div>
					</li>
				))}
				<div className="flex justify-center items-center py-4 border-t border-t-gray-500 mt-6">
					<DefaultButton
						onClick={handleSubmit}
						className="rounded-md"
					>
						Submit
					</DefaultButton>
				</div>
			</ol>
		</div>
	);
};

export default InteractionLayout;
