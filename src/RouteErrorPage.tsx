import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import useTimer from "./subjects/computer-science/visualizer/hooks/useTimer";

const RouteErrorPage = () => {
	const error = useRouteError();
	const { timer } = useTimer();

	if (isRouteErrorResponse(error)) {
		return (
			<div className="h-screen flex flex-col justify-center items-center">
				<div>{error.status}</div>
				<div>{error.data}</div>
				Redirect in {timer}
			</div>
		);
	}

	if (error instanceof Error) {
		return (
			<div className="h-screen flex flex-col justify-center items-center">
				<div>{error.message}</div>
				Redirect in {timer}
			</div>
		);
	}

	return <div>Unknown error. Redirect in {timer}</div>;
};

export default RouteErrorPage;
