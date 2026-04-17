import { ROLES } from "./permission";

export const AUTH_ROUTES = {
    LOGIN: "/login",
    LOGOUT: "/logout"
};

export const FEATURE_ROUTES = {
    DASHBOARD: "/dashboard",
    PRODUCT: "/product", // món ăn
    CUSTOMER: "/customer", // khách hàng
    EMPLOYEE: "/employee", // nhân viên
    INVOICE: "/invoice", // hóa đơn
    ORDER: "/order", // bán hàng
};

export const SLUG_NAME = {
    AUTH: AUTH_ROUTES,
    ROLE: ROLES,
    FEATURE: FEATURE_ROUTES
};
