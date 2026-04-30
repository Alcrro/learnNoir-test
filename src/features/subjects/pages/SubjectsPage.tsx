import React from "react";
import { useLocation } from "react-router-dom";
import ComputerSciencePages from "../../computer-science/pages/ComputerScience";
import MathPage from "../../mathematics/pages/MathPage";

const SubjectsPage = () => {
	const location = useLocation();

	const subjectName = location.pathname.split("/")[2];

	const subjectsMapper = {
		"computer-science": <ComputerSciencePages />,
		mathematics: <MathPage />,
	} as Record<string, React.ReactNode>;

	return <div>{subjectsMapper[subjectName] || "Subject not found"}</div>;
};

export default SubjectsPage;
