import { Component, type ErrorInfo, type ReactNode } from "react";
import * as Sentry from "@sentry/react";
import RouteErrorPage from "./RouteErrorPage";

type ErrorBoundaryProps = {
	children: ReactNode;
};
type ErrorBoundarySate = {
	hasError: boolean;
};
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundarySate> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(_error: Error): ErrorBoundarySate {
		return { hasError: true };
	}

	componentDidCatch(error: Error, _errorInfo: ErrorInfo): void {
		if (error instanceof Response) {
			throw error;
		}
		Sentry.captureException(error);
		this.setState({ hasError: true });
	}
	render() {
		if (this.state.hasError) {
			return <RouteErrorPage />;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
