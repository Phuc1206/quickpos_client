import type { TNavigationConfig } from "@/types/routesType";
import { ROUTE_REGISTRY } from "../config";
import { SLUG_NAME } from "@/constants/slugName";

const staff: TNavigationConfig = {
    IndexPageComponent: () => { },
    children: [
        ROUTE_REGISTRY[SLUG_NAME.FEATURE.ORDER]
    ]
};
export default staff;