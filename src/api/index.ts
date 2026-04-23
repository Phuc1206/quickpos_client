import auth from "./auth";
import customer from "./customer";
import order from "./order";
import product from "./product";

const gateway = {
    auth,
    product,
    customer,
    order
};

export default gateway;