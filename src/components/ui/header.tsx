import { LogOut, Search } from "lucide-react";
import { useAuthStore } from "@/zustand/authStore";
import { Button } from "./button";
import { useLogout } from "@/services/authServices";
import { Spinner } from "./spinner";

export default function Header() {
	const user = useAuthStore((state) => state.user);
	const { mutateAsync: logoutMutation, isPending: isLoggingOut } = useLogout();

	const handleLogout = async () => {
		try {
			await logoutMutation();
		}
		catch (error) {
			console.error("Logout failed:", error);
		}
	};


	return (
		<div className="bg-white h-16 flex items-center justify-between px-6 border-b shadow-sm">
			{/* LEFT */}
			<div className="flex items-center gap-4">
				<div className="text-lg font-semibold text-gray-800">
					Hệ thống quản lý
				</div>

				{/* Search */}
				<div className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-lg">
					<Search size={16} className="text-gray-400 mr-2" />
					<input
						placeholder="Tìm kiếm..."
						className="bg-transparent outline-none text-sm"
					/>
				</div>
			</div>

			{/* RIGHT */}
			<div className="flex items-center gap-4">
				{/* User */}
				<div className="flex items-center gap-2">
					<div className="w-9 h-9 bg-blue-500 text-white flex items-center justify-center rounded-full">
						{user?.name?.charAt(0) || "A"}
					</div>

					<div className="hidden md:block">
						<p className="text-sm font-medium text-gray-800">
							{user?.name || "Admin"}
						</p>
						<p className="text-xs text-gray-500">{user?.level || "ADMIN"}</p>
					</div>
				</div>

				<Button
					variant="outline"
					size="icon"
					className="h-9 w-9 shrink-0 bg-red-100 text-destructive transition-colors hover:bg-red-200 hover:text-destructive-hover"
					onClick={handleLogout}
					disabled={isLoggingOut}
				>
					{isLoggingOut ? <Spinner /> : <LogOut className="h-4 w-4" />}
				</Button>
			</div>
		</div>
	);
}
