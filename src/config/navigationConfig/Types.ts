import { LucideIcon } from "lucide-react";

interface IBaseNavItem {
  _id: string;
  slug: string;
  title: string;
  icon?: LucideIcon;
}

interface INavItemWithComponent {
  PageComponent: any; // React component
}

export type TNavigateItemConfig = IBaseNavItem &
  Required<
    | INavItemWithComponent
    | {
        children: TNavigateItemConfig[];
      }
  >;

export type TNavigateItem = IBaseNavItem &
  Partial<
    INavItemWithComponent & {
      children: TNavigateItem[];
    }
  >;

export type TNavigationConfig = {
  IndexPageComponent: any; // React component
  children: TNavigateItem[];
};
