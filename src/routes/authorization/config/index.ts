import { icons } from "@/assets/icons";
import { SLUG_NAME } from "@/constants/slugName";
import type { TNavigateItemConfig } from "@/types/routesType";
import React from "react";

export const ROUTE_REGISTRY: Record<string, TNavigateItemConfig> = {
    [SLUG_NAME.FEATURE.PRODUCT]: {
        _id: SLUG_NAME.FEATURE.PRODUCT,
        slug: SLUG_NAME.FEATURE.PRODUCT,
        title: "Món ăn",
        icon: icons.Cookie,
        PageComponent: () => React.createElement("div", null, "Món ăn")
    },

    [SLUG_NAME.FEATURE.EMPLOYEE]: {
        _id: SLUG_NAME.FEATURE.EMPLOYEE,
        slug: SLUG_NAME.FEATURE.EMPLOYEE,
        title: "Nhân viên",
        icon: icons.IdCardLanyard,
        PageComponent: () => React.createElement("div", null, "Nhân viên")
    },

    [SLUG_NAME.FEATURE.CUSTOMER]: {
        _id: SLUG_NAME.FEATURE.CUSTOMER,
        slug: SLUG_NAME.FEATURE.CUSTOMER,
        title: "Khách hàng",
        icon: icons.Users,
        PageComponent: () => React.createElement("div", null, "Khách hàng")
    },

    [SLUG_NAME.FEATURE.INVOICE]: {
        _id: SLUG_NAME.FEATURE.INVOICE,
        slug: SLUG_NAME.FEATURE.INVOICE,
        title: "Hóa đơn",
        icon: icons.Receipt,
        PageComponent: () => React.createElement("div", null, "Hóa đơn")
    },

    [SLUG_NAME.FEATURE.ORDER]: {
        _id: SLUG_NAME.FEATURE.ORDER,
        slug: SLUG_NAME.FEATURE.ORDER,
        title: "Bán hàng",
        icon: icons.Cookie,
        PageComponent: () => React.createElement("div", null, "Bán hàng")
    }
};
