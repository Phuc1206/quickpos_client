import { ROLES, type TRole } from "@/constants/permission";
import navigationConfig from "../authorization";
import { SLUG_NAME } from "@/constants/slugName";

export const navigationSelector = async (userRole: TRole) => {
    switch (userRole) {
        case ROLES.ADMIN:
            return navigationConfig.administration;
        case ROLES.STAFF:
            return navigationConfig.staff;
        default:
            throw new Error("Invalid user role");
    }
}

export const getDefaultPageByRole = (role: TRole) => {
    switch (role) {
        case ROLES.ADMIN:
            return SLUG_NAME.FEATURE.PRODUCT;
        case ROLES.STAFF:
            return SLUG_NAME.FEATURE.ORDER;
        default:
            return SLUG_NAME.FEATURE.DASHBOARD;
    }
};

