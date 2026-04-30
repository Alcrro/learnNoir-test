import type { LoaderFunctionArgs } from "react-router-dom";

const allowedModules = ["thales", "euclid", "pythagoras"] as const;
type Module = (typeof allowedModules)[number];

export const validateModule = ({ params }: LoaderFunctionArgs) => {
	const { modulesId } = params;
	if (!modulesId || !allowedModules.includes(modulesId as Module)) {
		throw new Response("Not Found", { status: 404 });
	}

	if (!allowedModules.includes(modulesId as Module)) {
		throw new Response("Not Found", { status: 404 });
	}

	return null;
};
