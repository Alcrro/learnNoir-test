import React, { ReactNode, useEffect, useState } from "react";
import { DragInteraction } from "../../../../../components/molecules/interactions/DragInteraction";

export type InteractionsStep = {
	items: number[];
};

type StepInteractionProps = {
	interactionData: InteractionsStep;
	renderItem: (item: number) => ReactNode;
};

const StepInteraction = ({
	interactionData,
	renderItem,
}: StepInteractionProps) => {
	const [items, setItems] = useState<number[]>(interactionData.items);
	const [activeId, setActiveId] = useState<number | null>(null);
	const [hoverId, setHoverId] = useState<number | null>(null);

	useEffect(() => {
		console.log("active:", activeId, "hover:", hoverId);
	}, [activeId, hoverId]);

	useEffect(() => {
		setItems(interactionData.items);
	}, [interactionData]);

	if (!interactionData.items) return null;

	const handleDrop = () => {
		if (!activeId || !hoverId) return;

		const i1 = items.indexOf(Number(activeId));
		const i2 = items.indexOf(Number(hoverId));

		if (i1 === -1 || i2 === -1) return;

		const newItems = [...items];
		[newItems[i1], newItems[i2]] = [newItems[i2], newItems[i1]];

		setItems(newItems);
		setActiveId(null);
		setHoverId(null);
	};
	console.log("is rendered?");

	return (
		<div className="flex justify-between">
			<div className="content flex gap-2 items-center">
				{/* <div className="title ">nice title</div> */}
				{items.map((item, index) => (
					<div
						key={`${item}-${index}`}
						className="relative"
					>
						<DragInteraction
							key={item}
							id={item}
							onDragStart={setActiveId}
							onHover={setHoverId}
							onDrop={handleDrop}
							className="items-center"
						>
							{renderItem(item)}
						</DragInteraction>
					</div>
				))}
			</div>
		</div>
	);
};

export default StepInteraction;
