import type { LucideIcon } from "lucide-react";


export interface IBaseNavItem {
    _id: string;
    slug: string;
    title: string;
    icon?: LucideIcon;
}

interface INavItemWithComponent {
    PageComponent: React.ComponentType;
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
    IndexPageComponent: React.ComponentType;
    children: TNavigateItem[];
};