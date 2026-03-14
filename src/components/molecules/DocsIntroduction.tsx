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
		<div className="docs-intro">
			<h2>{title}</h2>

			<section>
				<h3>What is it?</h3>
				<p>{description}</p>
			</section>

			<section>
				<h3>Why does it exist?</h3>
				<p>{why}</p>
			</section>

			<section>
				<h3>Key Idea</h3>
				<p>{keyIdea}</p>
			</section>

			<section>
				<h3>When to use</h3>
				<ul>
					{whenToUse.map((item, i) => (
						<li key={i}>{item}</li>
					))}
				</ul>
			</section>

			<section>
				<h3>Complexity</h3>
				<div className="complexity">
					<span>Best: {complexity.best}</span>
					<span>Average: {complexity.average}</span>
					<span>Worst: {complexity.worst}</span>
					<span>Space: {complexity.space}</span>
				</div>
			</section>
		</div>
	);
};

export default DocsIntroduction;
