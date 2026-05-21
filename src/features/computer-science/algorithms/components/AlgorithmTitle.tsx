import React from "react";

const AlgorithmTitle = ({ lessonName }: { lessonName: string }) => {
	return (
		<h1 className="capitalize font-medium tracking-tight text-3xl text-(--lp-text-primary)">
			{lessonName.includes("-") ? lessonName.replace("-", " ") : lessonName}
		</h1>
	);
};

export default AlgorithmTitle;
