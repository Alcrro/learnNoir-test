import MathPageLayout from "../../features/mathematics/components/MathPageLayout";
import "../styles/docsIntro.css";

type Complexity = {
	best: string;
	average: string;
	worst: string;
	space: string;
};

type DocsIntroProps = {
	title: string;
	description: string;
	why: string;
	whenToUse: string[];
	keyIdea: string;
	complexity: Complexity;
};

const DocsIntroduction = ({
	title,
	description,
	why,
	whenToUse,
	keyIdea,
	complexity,
}: DocsIntroProps) => {
	return (
		// <div className="docs-intro">
		<MathPageLayout>
			<div className="math-container ml-1 ">
				<div className="math-block text-center ">
					<h2 className="math-title ">{title}</h2>
				</div>

				{/* DEFINIȚIE */}
				<div className="math-block">
					<div className="math-label">Def:</div>
					<div className="math-content">{description}</div>
				</div>

				{/* INTUIȚIE */}
				<div className="math-block">
					<div className="math-label">Intuiție:</div>
					<div className="math-content">{why}</div>
				</div>

				{/* IDEE CHEIE */}
				<div className="math-block highlight">
					<div className="math-label">💡 Idee:</div>
					<div className="math-content">{keyIdea}</div>
				</div>

				{/* CÂND FOLOSEȘTI */}
				<div className="math-block">
					<div className="math-label">Când:</div>
					<div className="math-content">
						{whenToUse.map((item, i) => (
							<div key={i}>- {item}</div>
						))}
					</div>
				</div>

				{/* COMPLEXITATE */}
				<div className="math-block">
					<div className="math-label">Comp:</div>
					<div className="math-content grid grid-cols-2 gap-2">
						<div>Best: {complexity.best}</div>
						<div>Avg: {complexity.average}</div>
						<div>Worst: {complexity.worst}</div>
						<div>Space: {complexity.space}</div>
					</div>
				</div>
			</div>
		</MathPageLayout>
		// </div>
	);
};

export default DocsIntroduction;
