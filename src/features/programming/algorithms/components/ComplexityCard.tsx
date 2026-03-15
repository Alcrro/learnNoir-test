import { useLocation } from "react-router-dom";
import { algorithmComplexitiesRegistry } from "../data/algorithmComplexitiesRegistry";
import type { AlgorithmTypes, ComplexityType } from "../shared/AlgorithmTypes";

const ComplexityCard = ({
	showingDescription = false,
	complexity,
}: {
	showingDescription?: boolean;
	complexity: ComplexityType | ComplexityType[];
}) => {
	const location = useLocation();

	const algorithm = location.pathname.split("/").pop() as AlgorithmTypes;
	const complexitiesAlgorithm = algorithmComplexitiesRegistry[algorithm];
	return (
		<>
			{showingDescription && <div>{showingDescription}</div>}
			<div className="flex flex-col ">
				{Array.isArray(complexity) ? (
					complexity.map((comp) => (
						<div className="flex gap-2 justify-between">
							<div className="capitalize ml-auto">{comp}</div>
							<span> : </span>
							<div className="w-12">{complexitiesAlgorithm.complexity[comp]}</div>
						</div>
					))
				) : (
					<div className="flex gap-2 justify-between">
						<div className="capitalize ml-auto">{complexity}</div>
						<span> : </span>
						<div className="w-12">{complexitiesAlgorithm.complexity[complexity]}</div>
					</div>
				)}
			</div>
		</>
	);
};

export default ComplexityCard;
