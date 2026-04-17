import type { TNavigationConfig } from "@/types/routesType";
import { ROUTE_REGISTRY } from "../config";
import { SLUG_NAME } from "@/constants/slugName";

const staff: TNavigationConfig = {
    IndexPageComponent: () => { },
    children: [
        ROUTE_REGISTRY[SLUG_NAME.FEATURE.ORDER],
        ROUTE_REGISTRY[SLUG_NAME.FEATURE.CUSTOMER],
        ROUTE_REGISTRY[SLUG_NAME.FEATURE.PRODUCT],
    ]
};
export default staff;