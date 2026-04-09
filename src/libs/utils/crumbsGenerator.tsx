import { useMatches } from "react-router-dom";

type Crumb =
	| string
	| ((data: unknown, params: Record<string, string | undefined>) => string);

type Handle = {
	crumb?: Crumb;
};

export const CrumbsGenerator = () => {
	const matches = useMatches();
	const getHandle = (match: (typeof matches)[number]) => match.handle as Handle;

	const crumbs = matches
		.map((match) => ({
			match,
			handle: getHandle(match),
		}))
		.filter(({ handle }) => handle?.crumb)
		.map(({ match, handle }) => {
			const crumb = handle.crumb!;

			return {
				label:
					typeof crumb === "function" ? crumb(match.data, match.params) : crumb,
				path: match.pathname,
			};
		});
	return { crumbs };
};
