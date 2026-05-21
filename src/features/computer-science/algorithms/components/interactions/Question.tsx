import React from "react";

const Question = ({ questionUI }: { questionUI: string }) => {
	return <div className="math-line">→ {questionUI}</div>;
};

export default Question;
