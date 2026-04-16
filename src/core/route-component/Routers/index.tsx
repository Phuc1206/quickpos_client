import { Route } from "react-router";

import type { TNavigateItem, TNavigationConfig } from "@/config/navigationConfig/Types";

export interface IRoutersProps {
  config?: TNavigationConfig;
  indexPath?: string;
}

const renderRoutes = (navigateItem: TNavigateItem) => {
  const slug = navigateItem.slug.replace("/", "");

  if (!navigateItem?.children) {
    if (!navigateItem?.PageComponent) {
      console.error("PageComponent is undefined");
      return <></>;
    }

    return <Route key={navigateItem._id} path={slug} element={<navigateItem.PageComponent />} />;
  }

  const routeElements = navigateItem.children.map((item) => {
    return renderRoutes(item);
  });

  return (
    <Route key={navigateItem._id} path={slug}>
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
