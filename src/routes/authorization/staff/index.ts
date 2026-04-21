import type { TNavigationConfig } from "@/types/routesType";
import { ROUTE_REGISTRY } from "../config";
import { SLUG_NAME } from "@/constants/slugName";
import OrderLayout from "@/components/layout/order";

const staff: TNavigationConfig = {
    IndexPageComponent: OrderLayout,
    children: [
        // ROUTE_REGISTRY[SLUG_NAME.FEATURE.DASHBOARD],
        ROUTE_REGISTRY[SLUG_NAME.FEATURE.ORDER]
    ]
};
export default staff;