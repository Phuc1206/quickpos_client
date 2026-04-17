import { SLUG_NAME } from "@/constants/slugName";
import type { TNavigationConfig } from "@/types/routesType";
import { ROUTE_REGISTRY } from "../config";

const administration: TNavigationConfig = {
    IndexPageComponent: () => { },
    children: [
        ROUTE_REGISTRY[SLUG_NAME.FEATURE.PRODUCT],
        ROUTE_REGISTRY[SLUG_NAME.FEATURE.EMPLOYEE],
        ROUTE_REGISTRY[SLUG_NAME.FEATURE.CUSTOMER],
    ]
};
export default administration;