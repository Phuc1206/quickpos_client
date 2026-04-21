import { Outlet, NavLink } from "react-router";
import { useLogout } from "@/services/authServices";
import { SLUG_NAME } from "@/constants/slugName";
import Header from "@/components/ui/header";

export default function DashboardLayout() {
	const { mutateAsync: logout } = useLogout();

	const navItemClass = ({ isActive }: { isActive: boolean }) =>
		`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
			isActive
				? "bg-blue-600 text-white"
				: "text-gray-300 hover:bg-gray-800 hover:text-white"
		}`;

	return (
		<div className="flex h-screen bg-gray-100">
			{/* Sidebar */}
			<div className="w-64 bg-gray-900 text-white flex flex-col">
				{/* Logo */}
				<div className="px-4 py-5 border-b border-gray-800">
					<h2 className="text-xl font-bold text-blue-400! ">QuickPOS</h2>
					<p className="text-xs text-gray-400">Admin Dashboard</p>
				</div>

				{/* Menu */}
				<nav className="flex-1 p-4 space-y-2">
					<NavLink to={SLUG_NAME.FEATURE.DASHBOARD} className={navItemClass}>
						📊 Dashboard
					</NavLink>

					<NavLink to={SLUG_NAME.FEATURE.PRODUCT} className={navItemClass}>
						🍜 Quản lý món
					</NavLink>

					<NavLink to={SLUG_NAME.FEATURE.INVOICE} className={navItemClass}>
						🧾 Đơn hàng
					</NavLink>

					<NavLink to={SLUG_NAME.FEATURE.CUSTOMER} className={navItemClass}>
						👤 Khách hàng
					</NavLink>

					<NavLink to={SLUG_NAME.FEATURE.EMPLOYEE} className={navItemClass}>
						👷 Nhân viên
					</NavLink>
				</nav>

				{/* Logout */}
				<div className="p-4 border-t border-gray-800">
					<button
						onClick={() => logout()}
						className="w-full bg-red-500 hover:bg-red-600 transition px-3 py-2 rounded-lg text-white"
					>
						Đăng xuất
					</button>
				</div>
			</div>

			{/* Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Header */}
				<Header />

				{/* Main */}
				<div className="flex-1 p-6 overflow-auto">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
