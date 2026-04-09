import { Link, Outlet } from "react-router-dom";
import { CrumbsGenerator } from "../../../../../libs/utils/crumbsGenerator";

const LearnAlgorithmsLayout = () => {
	const { crumbs } = CrumbsGenerator();

	return (
		<div className="min-h-screen flex transition-colors duration-300 group relative overflow-hidden">
			<main className="flex-1 px-1 rounded-md text-(--text-primary) group-hover:opacity-80 hover:opacity-100! relative">
				<div className="breadcrumb p-2 text-sm text-(--text-muted)">
					{crumbs.map((c, i) => (
						<span key={c.path}>
							<Link
								to={c.path}
								className="hover:text-(--text-primary)"
							>
								{c.label}
							</Link>
							{i < crumbs.length - 1 && " / "}
						</span>
					))}
				</div>
				<div className="main">
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default LearnAlgorithmsLayout;
