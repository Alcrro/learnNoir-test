import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import "./App.scss";
import "./styles/main.scss";
import LoginModal from "./features/auth/components/modal/LoginModal";
import { queryClient, persister } from "./libs/queryClient";

const App = () => {
	const location = useLocation();
	const state = location.state as { backgroundLocation?: Location };
	const isModal = state?.backgroundLocation && location.pathname === "/auth/login";

	return (
		<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
			{isModal ? (
				<Routes>
					<Route path="/auth/login" element={<LoginModal />} />
				</Routes>
			) : (
				<Outlet />
			)}
		</PersistQueryClientProvider>
	);
};

export default App;
