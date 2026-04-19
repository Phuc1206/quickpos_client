import { ROLES, type TRole } from "@/constants/permission";
import navigationConfig from "../authorization";

const navigationSelector = async (userRole: TRole) => {
    switch (userRole) {
        case ROLES.ADMIN:
            return navigationConfig.administration;
        case ROLES.STAFF:
            return navigationConfig.staff;
        default:
            throw new Error("Invalid user role");
    }

}

export default navigationSelector;