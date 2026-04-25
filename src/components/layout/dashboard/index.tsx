import { Outlet, NavLink } from "react-router";
import { useLogout } from "@/services/authServices";
import { SLUG_NAME } from "@/constants/slugName";
import Header from "@/components/ui/header";

// shadcn
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// icons (lucide)
import {
	LayoutDashboard,
	UtensilsCrossed,
	Receipt,
	Users,
	UserCog,
	LogOut,
} from "lucide-react";

export default function DashboardLayout() {
	const { mutateAsync: logout } = useLogout();

	const navItemClass = ({ isActive }: { isActive: boolean }) =>
		cn(
			"flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition",
			isActive
				? "bg-primary text-primary-foreground"
				: "text-muted-foreground hover:bg-muted hover:text-foreground",
		);

	return (
		<div className="flex h-screen bg-muted/40">
			{/* Sidebar */}
			<div className="w-64 border-r bg-background flex flex-col">
				{/* Logo */}
				<div className="h-16 flex items-center px-6 border-b">
					<div>
						<h2 className="text-lg font-bold">QuickPOS</h2>
						<p className="text-xs text-muted-foreground">Admin Dashboard</p>
					</div>
				</div>

				{/* Menu */}
				<ScrollArea className="flex-1 px-3 py-4">
					<nav className="space-y-1">
						<NavLink to={SLUG_NAME.FEATURE.DASHBOARD} className={navItemClass}>
							<LayoutDashboard size={18} />
							Dashboard
						</NavLink>

						<NavLink to={SLUG_NAME.FEATURE.PRODUCT} className={navItemClass}>
							<UtensilsCrossed size={18} />
							Quản lý món
						</NavLink>

						<NavLink to={SLUG_NAME.FEATURE.INVOICE} className={navItemClass}>
							<Receipt size={18} />
							Đơn hàng
						</NavLink>

						<NavLink to={SLUG_NAME.FEATURE.CUSTOMER} className={navItemClass}>
							<Users size={18} />
							Khách hàng
						</NavLink>

						<NavLink to={SLUG_NAME.FEATURE.EMPLOYEE} className={navItemClass}>
							<UserCog size={18} />
							Nhân viên
						</NavLink>
					</nav>
				</ScrollArea>

				{/* Logout */}
				<div className="p-4 border-t">
					<Button
						variant="destructive"
						className="w-full flex items-center gap-2"
						onClick={() => logout()}
					>
						<LogOut size={16} />
						Đăng xuất
					</Button>
				</div>
			</div>

			{/* Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Header */}
				<Header />

				{/* Main */}
				<main className="flex-1 overflow-auto p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
