import React from "react";

const SubjectProgressModulesCounter = ({
	completed,
	total,
}: {
	completed: number;
	total: number;
}) => {
	return (
		<span>
			{completed}/{total} modules completed
		</span>
	);
};

export default SubjectProgressModulesCounter;
