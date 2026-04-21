import { Button } from "@/components/ui/button";
import { ROLES } from "@/constants/permission";
import { useLogout } from "@/services/authServices";
import { useAuthStore } from "@/zustand/authStore";

const DashboardPage = () => {
	const isAdmin = useAuthStore((state) => state.user?.level === ROLES.ADMIN);
	const { mutateAsync: logoutMutation, isPending: isLoggingOut } = useLogout();

	return (
		<div className="p-4">
			<p className="text-2xl font-bold mb-4">DashboardPage</p>
			{isAdmin ? (
				<p>Welcome, Admin! You have full access to the dashboard.</p>
			) : (
				<p>Welcome! You have limited access to the dashboard.</p>
			)}

			<Button
				disabled={isLoggingOut}
				onClick={() => logoutMutation()}
				className="mt-4"
				color="destructive"
				size="lg"
			>
				Đăng xuất
			</Button>
		</div>
	);
};

export default DashboardPage;
