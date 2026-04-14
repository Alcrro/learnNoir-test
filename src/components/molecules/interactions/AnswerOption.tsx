import { FC } from "react";
import DefaultButton from "../../atoms/DefaultButton";
import { AnswerOptionProps } from "../../../features/programming/algorithms/shared/engineInteractionType";
import { cn } from "../../../libs/utils/cn";

const AnswerOption: FC<AnswerOptionProps> = ({
	options,
	selectedId,
	onSelect,
}) => {
	return (
		<div className=" flex gap-4 justify-evenly flex-wrap">
			{options?.map((opt) => (
				<DefaultButton
					onClick={() => onSelect(opt)}
					className={cn(
						"rounded-md",
						selectedId === opt.id && "bg-blue-500 text-white",
					)}
					key={opt.id}
				>
					<div className="min-w-20">{opt.label}</div>
				</DefaultButton>
			))}
		</div>
	);
};

export default AnswerOption;
