const onboarding = {
  login: "/login",
  forgotPassword: "/forgot-password",
  traceability: "/traceability/:serial"
};

const authorization = {
  dashboard: "/dashboard",
  supplier: "/supplier",
  ingredient: "/ingredient",
  product: "/product"
};

const others = {
  logout: "/logout"
};

const slugName = Object.assign(onboarding, authorization, others);

export default slugName;
