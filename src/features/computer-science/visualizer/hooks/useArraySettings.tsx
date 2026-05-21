import { useState } from "react";

const useArraySettings = () => {
	const [arraySize, setArraySize] = useState(10);
	const [minValueState, setMinValueState] = useState(0);
	const [maxValueState, setMaxValueState] = useState(30);

	return {
		arraySize,
		setArraySize,
		minValueState,
		maxValueState,
		setMinValueState,
		setMaxValueState,
	};
};

export default useArraySettings;
