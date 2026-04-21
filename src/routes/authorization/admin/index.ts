import { SLUG_NAME } from "@/constants/slugName";
import type { TNavigationConfig } from "@/types/routesType";
import { ROUTE_REGISTRY } from "../config";
import DashboardLayout from "@/components/layout/dashboard";

const administration: TNavigationConfig = {
	IndexPageComponent: DashboardLayout,
	children: [
		ROUTE_REGISTRY[SLUG_NAME.FEATURE.DASHBOARD],
		ROUTE_REGISTRY[SLUG_NAME.FEATURE.PRODUCT],
		ROUTE_REGISTRY[SLUG_NAME.FEATURE.EMPLOYEE],
		ROUTE_REGISTRY[SLUG_NAME.FEATURE.CUSTOMER],
		ROUTE_REGISTRY[SLUG_NAME.FEATURE.INVOICE],
		ROUTE_REGISTRY[SLUG_NAME.FEATURE.ORDER],
	],
};
export default administration;
