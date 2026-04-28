import auth from "./auth";
import customer from "./customer";
import order from "./order";
import product from "./product";
import employee from "./employee";

const gateway = {
	auth,
	product,
	customer,
	order,
	employee,
};

export default gateway;
