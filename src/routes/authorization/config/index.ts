import { icons } from "@/assets/icons";
import { SLUG_NAME } from "@/constants/slugName";
import CustomerPage from "@/pages/Customer";
import DashboardPage from "@/pages/Dashboard";
import EmployeePage from "@/pages/Employee";
import InvoicePage from "@/pages/Invoice";
import OrderPage from "@/pages/Order";
import ProductPage from "@/pages/Product";
import type { TNavigateItemConfig } from "@/types/routesType";

export const ROUTE_REGISTRY: Record<string, TNavigateItemConfig> = {
    [SLUG_NAME.FEATURE.DASHBOARD]: {
        _id: "dashboard",
        slug: SLUG_NAME.FEATURE.DASHBOARD,
        title: "Trang chủ",
        icon: icons.Cookie,
        PageComponent: DashboardPage
    },

    [SLUG_NAME.FEATURE.PRODUCT]: {
        _id: "product",
        slug: SLUG_NAME.FEATURE.PRODUCT,
        title: "Món ăn",
        icon: icons.Cookie,
        PageComponent: ProductPage
    },

    [SLUG_NAME.FEATURE.EMPLOYEE]: {
        _id: "employee",
        slug: SLUG_NAME.FEATURE.EMPLOYEE,
        title: "Nhân viên",
        icon: icons.IdCardLanyard,
        PageComponent: EmployeePage
    },

    [SLUG_NAME.FEATURE.CUSTOMER]: {
        _id: "customer",
        slug: SLUG_NAME.FEATURE.CUSTOMER,
        title: "Khách hàng",
        icon: icons.Users,
        PageComponent: CustomerPage
    },

    [SLUG_NAME.FEATURE.INVOICE]: {
        _id: "invoice",
        slug: SLUG_NAME.FEATURE.INVOICE,
        title: "Hóa đơn",
        icon: icons.Receipt,
        PageComponent: InvoicePage
    },

    [SLUG_NAME.FEATURE.ORDER]: {
        _id: "order",
        slug: SLUG_NAME.FEATURE.ORDER,
        title: "Bán hàng",
        icon: icons.Cookie,
        PageComponent: OrderPage
    }
};
