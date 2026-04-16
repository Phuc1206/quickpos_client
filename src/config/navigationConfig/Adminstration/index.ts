/* pages */
// import Dashboard from "@/pages/authorization/Dashboard";

/* layout */
import Supplier from "@/pages/authorization/Supplier";
import Ingredient from "@/pages/authorization/Ingredient";
import Product from "@/pages/authorization/Product";

/* others */
import slugName from "@/config/slugName";
import generate from "@/utils/generate";
import type { TNavigateItemConfig, TNavigationConfig } from "../Types";
import icons from "@/assets/icons";
import DefaultLayout from "@/layout/DefaultLayout";

const children: TNavigateItemConfig[] = [
  // {
  //   _id: generate.id(),
  //   slug: slugName.dashboard,
  //   title: "Trang chủ",
  //   icon: icons.dashboard,
  //   PageComponent: Dashboard
  // },
  {
    _id: generate.id(),
    slug: slugName.supplier,
    title: "Nhà cung cấp",
    icon: icons.users,
    PageComponent: Supplier
  },
  {
    _id: generate.id(),
    slug: slugName.ingredient,
    title: "Nguyên liệu",
    icon: icons.ingredients,
    PageComponent: Ingredient
  },
  {
    _id: generate.id(),
    slug: slugName.product,
    title: "Sản phẩm",
    icon: icons.products,
    PageComponent: Product
  }
];

const administration: TNavigationConfig = {
  IndexPageComponent: DefaultLayout,
  children
};

export default administration;
