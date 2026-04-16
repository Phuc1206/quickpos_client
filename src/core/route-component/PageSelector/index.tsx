// import * as React from "react";

// /* components */
// import { generateRoutes } from "../Routers";
// import NavigatePage from "../NavigatePage";
// // import DefaultLayout from "../../../layout/DefaultLayout";
// // import Login from "@/pages/onboarding/Login";

// /* packages */
// import { Route, Routes } from "react-router";

// /* configurations */
// import slugName from "../../../config/slugName";
// import navigationSelector from "../../navigationSelector";
// import { TNavigationConfig } from "@/config/navigationConfig/Types";
// // import NotFound from "@/pages/global/NotFound";

// export default function PageSelector() {

//   // const [navigationConfig, setNavigationConfig] = React.useState<TNavigationConfig | undefined>(undefined);

//   // const [isInitializing, setIsInitializing] = React.useState(true); // Trạng thái đang nạp lại dữ liệu sau khi refresh trang

//   // React.useLayoutEffect(() => {
//   //   setIsInitializing(true); // Bắt đầu trạng thái nạp lại dữ liệu;

//   //   const localStorageData = localStorageClient as any;

//   //   // ✅ LOGOUT CASE
//   //   if (!localStorageData?.token || !localStorageData?.userInfo) {
//   //     setNavigationConfig(undefined);
//   //     setIsInitializing(false);
//   //     return;
//   //   }

//   //   if (!userInfoStored && localStorageData?.userInfo && localStorageData?.token) {
//   //     updateUser(localStorageData.userInfo);
//   //     setToken(localStorageData.token);
//   //   }

//   //   const getNavigationConfig = async () => {
//   //     // TODO: Enable lại sau khi integrate API LOGIN
//   //     if ((!userInfoStored || !localStorageData?.token) && !localStorageData?.userInfo) {
//   //       return setTimeout(() => setIsInitializing(false), 3000);
//   //     }

//   //     const currentUser = localStorageData?.userInfo?.user || userInfoStored;

//   //     const config = navigationSelector(currentUser?.permission?.role || userInfoStored?.permission?.role);

//   //     if (config) {
//   //       setNavigationConfig(config);
//   //       setIsInitializing(false); // Kết thúc trạng thái nạp lại dữ liệu
//   //     }
//   //   };

//   //   getNavigationConfig();
//   // }, [userInfoStored]);

//   // if (isInitializing) {
//   //   return <Loading />;
//   // }

//   if (!navigationConfig && !isInitializing) {
//     return (
//       <Routes>
//         {/* <Route path={slugName.login} element={<Login />} /> */}
//         <Route path="*" element={<NavigatePage to={slugName.login} />} />
//       </Routes>
//     );
//   }

//   return (
//     <Routes>
//       <Route path="/" element={<NavigatePage to={slugName.supplier} />} />
//       {generateRoutes({ config: navigationConfig })}
//       <Route path="*" element={<NavigatePage to={slugName.supplier} />} />
//     </Routes>
//   );
// }
