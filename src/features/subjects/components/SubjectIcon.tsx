import React from "react";

const SubjectIcon = ({ icon, cls }: { icon: React.ReactNode; cls: string }) => {
	return (
		<div
			className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${cls}`}
		>
			{icon}
		</div>
	);
};

export default SubjectIcon;
