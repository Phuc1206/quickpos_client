import type { TNavigationConfig } from "@/types/routesType";
import { ROUTE_REGISTRY } from "../config";
import { SLUG_NAME } from "@/constants/slugName";
import DefaultLayout from "@/components/layout/default";

const staff: TNavigationConfig = {
    IndexPageComponent: DefaultLayout,
    children: [
        ROUTE_REGISTRY[SLUG_NAME.FEATURE.DASHBOARD],
        ROUTE_REGISTRY[SLUG_NAME.FEATURE.ORDER]
    ]
};
export default staff;