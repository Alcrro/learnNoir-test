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
			<h1 className="capitalize">
				{itemId.includes("-") ? itemId.replace("-", " ") : itemId}
			</h1>
			{Component && <Component />}
		</div>
	);
};

export default AlgorithmPage;
