import React from "react";
import { cn } from "../../libs/utils/cn";

const LessonMetaBadge = ({
	name,
	classname,
}: {
	name: string;
	classname?: string;
}) => {
	return <div className={cn(classname)}>{name}</div>;
};

export default LessonMetaBadge;
