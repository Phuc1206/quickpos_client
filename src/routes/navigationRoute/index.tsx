import type { TNavigateItem, TNavigationConfig } from "@/types/routesType";
import { Route } from "react-router";
export interface IRoutersProps {
    config?: TNavigationConfig;
    indexPath?: string;
}

const renderRoutes = (navigateItem: TNavigateItem) => {
    if (!navigateItem?.children) {
        if (!navigateItem?.PageComponent) {
            console.error("PageComponent is undefined");
            return <div>Không tìm thấy trang</div>;
        }

        return <Route key={navigateItem._id} path={navigateItem.slug} element={<navigateItem.PageComponent />} />;
    }

    const routeElements = navigateItem.children.map((item) => {
        return renderRoutes(item);
    });

    return (
        <Route key={navigateItem._id} path={navigateItem.slug}>
            {routeElements}
        </Route>
    );
};

export const generateRoutes = ({ config, indexPath }: IRoutersProps) => {
    if (!config) {
        return undefined;
    }

    const { children, IndexPageComponent } = config;

    return (
        <Route path={indexPath} element={<IndexPageComponent />}>
            {children.map((item) => {
                return renderRoutes(item);
            })}
        </Route>
    );
};