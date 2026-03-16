import { useParams } from "react-router-dom";
import { algorithmComponents } from "../../../router/routeMappers/algorithmComponentsMapper";

const AlgorithmPage = () => {
	const { category, itemId } = useParams<{
		category: string;
		itemId: string;
	}>();

	if (!category || !itemId) return <>no found</>;
	const Component = algorithmComponents[category][itemId];

	return (
		<div>
			<div className="bg-(--bg-card) rounded-xl py-2">
				<h1 className="capitalize font-semibold tracking-tight text-3xl">
					{itemId.includes("-") ? itemId.replace("-", " ") : itemId}
				</h1>
			</div>
			{Component && <Component />}
		</div>
	);
};

export default AlgorithmPage;
