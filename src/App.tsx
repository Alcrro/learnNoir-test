import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import "./App.scss";
import "./styles/main.scss";
import LoginModal from "./features/auth/components/modal/LoginModal";

const queryClient = new QueryClient();

const persister = createSyncStoragePersister({ storage: window.localStorage });

const App = () => {
	const location = useLocation();
	const state = location.state as { backgroundLocation?: Location };
	// console.log("state din subjects", state);

	const isModal =
		state?.backgroundLocation && location.pathname === "/auth/login";

	return (
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={{ persister }}
		>
			{!isModal && <Outlet />}

			{isModal && (
				<Routes>
					<Route
						path="/auth/login"
						element={<LoginModal />}
					/>
				</Routes>
			)}
		</PersistQueryClientProvider>
	);
};

export default App;
