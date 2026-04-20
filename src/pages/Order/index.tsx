import { Button } from "@/components/ui/button";
import { useLogout } from "@/services/authServices";


const OrderPage = () => {
    const { mutateAsync: logoutMutation, isPending: isLoggingOut } = useLogout();

    return (
        <div>
            <p className="text-2xl font-bold mb-4">OrderPage</p>
            <Button disabled={isLoggingOut} onClick={() => logoutMutation()} className="mt-4" color="destructive" size="lg">
                Đăng xuất
            </Button>
        </div>
    );

}

export default OrderPage;