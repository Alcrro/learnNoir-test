import MathPageLayout from "../../../../mathematics/components/MathPageLayoutContent";
import "./docsIntro.css";

export type LessonComplexityCard = {
	label: string;
	value: string;
	desc: string;
};

type DocsIntroProps = {
	title: string;
	description: string;
	why: string;
	whenToUse: string[];
	keyIdea: string;
	complexities: LessonComplexityCard[];
};

const AlgorithmDocsIntroduction = ({
	title,
	description,
	why,
	whenToUse,
	keyIdea,
	complexities,
}: DocsIntroProps) => {
	return (
		// <div className="docs-intro">
		<MathPageLayout>
			<div className="math-container ml-1">
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
				<div className="math-block bg-(--lp-bg-sidebar) rounded-md p-8">
					<div className="math-label p-2">Complexity</div>
					<div className="math-content grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] max-sm:grid-cols-1 gap-2">
						{complexities.map((complexity) => (
							<div
								className="complexity-card bg-(--lp-bg-elevated) p-4 rounded-xl"
								key={complexity.label}
							>
								<div className="text-(--text-muted)">
									{complexity.label.charAt(0).toLocaleUpperCase() +
										complexity.label.slice(1)}
								</div>
								<div className="text-3xl">{complexity.value}</div>
								<div className="text-(--text-secondary)">
									{complexity.desc.charAt(0).toLocaleUpperCase() +
										complexity.desc.slice(1)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</MathPageLayout>
		// </div>
	);
};

export default AlgorithmDocsIntroduction;
