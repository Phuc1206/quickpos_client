import Loading from "@/components/section/loading";
import { useInitAuth } from "@/hooks/useInitAuth";
import { Route, Routes } from "react-router";
import { generateRoutes } from "./navigationRoute";
import NavigatePage from "./navigationPage";
import { SLUG_NAME } from "@/constants/slugName";
import LoginPage from "@/pages/Login";

export default function PageSelector() {
	const { isInitializing, user, navigationConfig } = useInitAuth();

	if (isInitializing) return <Loading.FullScreen />;

	// Luồng cho người dùng chưa đăng nhập
	if (!user || !navigationConfig) {
		return (
			<Routes>
				<Route path={SLUG_NAME.AUTH.LOGIN} element={<LoginPage />} />
				<Route path="*" element={<NavigatePage to={SLUG_NAME.AUTH.LOGIN} />} />
			</Routes>
		);
	}

	// Luồng cho người dùng đã đăng nhập
	return (
		<Routes>
			<Route path="/" element={<NavigatePage to={SLUG_NAME.FEATURE.DASHBOARD} />} />
			{generateRoutes({ config: navigationConfig })}
			<Route path="*" element={<NavigatePage to={SLUG_NAME.FEATURE.DASHBOARD} />} />
		</Routes>
	);
}
