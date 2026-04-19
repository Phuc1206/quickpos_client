import * as React from "react";
import { Routes, Route } from "react-router";
import { useAuthStore } from "@/zustand/authStore";
import { generateRoutes } from "./navigationRoute";
import NavigatePage from "./navigationPage";
import LoginPage from "@/pages/Login";
import type { TNavigationConfig } from "@/types/routesType";
import type { TRole } from "@/constants/permission";
import navigationSelector from "./navigationSelector";
import { SLUG_NAME } from "@/constants/slugName";

export default function PageSelector() {
	const user = useAuthStore((state) => state.user);
	// const userLocalStorage = localStorage.getItem("user");
	// const user = userAuth || (userLocalStorage ? JSON.parse(userLocalStorage) : null);

	const [navigationConfig, setNavigationConfig] = React.useState<TNavigationConfig | undefined>(undefined);
	const [isInitializing, setIsInitializing] = React.useState(true);

	React.useLayoutEffect(() => {
		const fetchConfig = async () => {
			setIsInitializing(true);

			if (!user) {
				setNavigationConfig(undefined);
				setIsInitializing(false);
				return;
			}

			const role = (user?.level) as TRole;

			const config = await navigationSelector(role);
			setNavigationConfig(config);
			setIsInitializing(false);
		};

		fetchConfig();
	}, [user]);

	if (isInitializing) {
		return <>Đang tải trang...</>;
	}


	if (!user || (!navigationConfig && !isInitializing)) {
		return (
			<Routes>
				<Route path={SLUG_NAME.AUTH.LOGIN} element={<LoginPage />} />
				<Route path="*" element={<NavigatePage to={SLUG_NAME.AUTH.LOGIN} />} />
			</Routes>
		);
	}

	return (
		<Routes>
			<Route path="/" element={<NavigatePage to={SLUG_NAME.FEATURE.DASHBOARD} />} />

			{generateRoutes({ config: navigationConfig })}

			<Route path="*" element={<NavigatePage to={SLUG_NAME.FEATURE.DASHBOARD} />} />
		</Routes>
	);
}
