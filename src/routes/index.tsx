import { Route, Routes } from "react-router";
import NavigatePage from "./navigationPage";
import { SLUG_NAME } from "@/constants/slugName";
import { generateRoutes } from "./navigationRoute";


export default function PageSelector() {

    const navigationConfig = undefined;
    const isInitializing = false;

    if (isInitializing) {
        return <>Đang tải trang</>;
    }

    if (!navigationConfig && !isInitializing) {
        return (
            <Routes>
                <Route path={SLUG_NAME.AUTH.LOGIN} element={<></>} />
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