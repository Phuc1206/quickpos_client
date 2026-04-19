import { icons } from "@/assets/icons";
import { SLUG_NAME } from "@/constants/slugName";
import CustomerPage from "@/pages/Customer";
import EmployeePage from "@/pages/Employee";
import InvoicePage from "@/pages/Invoice";
import OrderPage from "@/pages/Order";
import ProductPage from "@/pages/Product";
import type { TNavigateItemConfig } from "@/types/routesType";

export const ROUTE_REGISTRY: Record<string, TNavigateItemConfig> = {
    [SLUG_NAME.FEATURE.PRODUCT]: {
        _id: SLUG_NAME.FEATURE.PRODUCT,
        slug: SLUG_NAME.FEATURE.PRODUCT,
        title: "Món ăn",
        icon: icons.Cookie,
        PageComponent: ProductPage
    },

    [SLUG_NAME.FEATURE.EMPLOYEE]: {
        _id: SLUG_NAME.FEATURE.EMPLOYEE,
        slug: SLUG_NAME.FEATURE.EMPLOYEE,
        title: "Nhân viên",
        icon: icons.IdCardLanyard,
        PageComponent: EmployeePage
    },

    [SLUG_NAME.FEATURE.CUSTOMER]: {
        _id: SLUG_NAME.FEATURE.CUSTOMER,
        slug: SLUG_NAME.FEATURE.CUSTOMER,
        title: "Khách hàng",
        icon: icons.Users,
        PageComponent: CustomerPage
    },

    [SLUG_NAME.FEATURE.INVOICE]: {
        _id: SLUG_NAME.FEATURE.INVOICE,
        slug: SLUG_NAME.FEATURE.INVOICE,
        title: "Hóa đơn",
        icon: icons.Receipt,
        PageComponent: InvoicePage
    },

    [SLUG_NAME.FEATURE.ORDER]: {
        _id: SLUG_NAME.FEATURE.ORDER,
        slug: SLUG_NAME.FEATURE.ORDER,
        title: "Bán hàng",
        icon: icons.Cookie,
        PageComponent: OrderPage
    }
};
