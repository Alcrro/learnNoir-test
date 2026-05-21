import React, { useCallback, useState } from "react";
import DefaultButton from "../../../../../components/atoms/DefaultButton";
import AnswerOption from "./AnswerOption";
import StepInteraction from "./StepInteraction";
import { AnswerOptionType } from "../../shared/engineInteractionType";
import { interactionMapper } from "../../data/interactionsData/stepInteractionLayoutMapper";

const InteractionLayout = ({
	stepValues,
}: {
	stepValues: Record<"first" | "second", number>;
}) => {
	const [answers, setAnswers] = useState<
		Record<string, boolean | string[] | AnswerOptionType[]>
	>({});
	const [results, setResults] = useState<Record<string, boolean | null>>({});
	const [submitted, setSubmitted] = useState(false);

	const currentInteraction = interactionMapper[1] ?? [];

	const { first, second } = stepValues;

	const handleSubmit = () => {
		const newResults: Record<string, boolean | null> = {};

		currentInteraction.forEach((interaction) => {
			const selected = answers[interaction.id];
			if (!selected) {
				newResults[interaction.id] = null;
				return;
			}
			newResults[interaction.id] = interaction.validate(
				{ a: first, b: second },
				selected as boolean | string[],
			);
		});

		setResults(newResults);
		setSubmitted(true);
	};

	const handleSelect = useCallback((id: string, value: AnswerOptionType[]) => {
		setAnswers((prev) => ({ ...prev, [id]: value }));
		if (submitted) {
			setResults((prev) => ({ ...prev, [id]: null }));
			setSubmitted(false);
		}
	}, [submitted]);

	return (
		<div className="py-2">
			<ol className="w-full list-decimal list-outside flex flex-col gap-4">
				{currentInteraction.map((interaction, index) => {
					const result = results[interaction.id];
					const isCorrect = result === true;
					const isWrong = result === false;

					return (
						<li
							key={interaction.id}
							className="pl-4"
						>
							<div
								className={[
									"rounded-xl shadow-sm p-5 border pl6 transition-colors",
									submitted && isCorrect && "border-green-500 bg-green-500/5",
									submitted && isWrong && "border-red-500 bg-red-500/5",
									(!submitted || result === null) && "border-(--border)",
								]
									.filter(Boolean)
									.join(" ")}
							>
								<div className="mb-3 text-sm text-gray-500">Question {index + 1}</div>

								<div className="flex items-center justify-between mb-4">
									<div className="text-lg font-medium">
										{interaction.question({ a: first, b: second })}
									</div>
									{submitted && result !== null && (
										<span
											className={[
												"text-sm font-medium px-2 py-0.5 rounded-full",
												isCorrect ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100",
											].join(" ")}
										>
											{isCorrect ? "Correct" : "Incorrect"}
										</span>
									)}
									{submitted && result === null && (
										<span className="text-sm font-medium px-2 py-0.5 rounded-full text-yellow-600 bg-yellow-100">
											No answer
										</span>
									)}
								</div>

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
					);
				})}
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
