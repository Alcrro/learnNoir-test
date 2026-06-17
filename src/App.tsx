import { Outlet, useLocation } from "react-router-dom";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import "./App.scss";
import "./styles/main.scss";
import LoginModal from "./features/auth/components/modal/LoginModal";
import { queryClient, persister } from "./libs/queryClient";
import ErrorBoundary from "./ErrorBoundary";

const App = () => {
	const location = useLocation();
	const state = location.state as { backgroundLocation?: Location };
	const isModal =
		state?.backgroundLocation && location.pathname === "/auth/login";

	return (
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={{
				persister,
				dehydrateOptions: {
					shouldDehydrateQuery: (query) => {
						const key = query.queryKey[0];
						return key !== "lesson-translation" && key !== "feedback" && key !== "feedback-options";
					},
				},
			}}
		>
			<ErrorBoundary>
				{isModal ? <LoginModal /> : <Outlet />}
			</ErrorBoundary>
		</PersistQueryClientProvider>
	);
};

export default App;
