import { Component, type ErrorInfo, type ReactNode } from "react";
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

  componentDidCatch(error: Error, _errorInfo: ErrorInfo): void {
    if (error instanceof Response) {
      throw error;
    }
    console.error("caught by boundary: ", error);
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
