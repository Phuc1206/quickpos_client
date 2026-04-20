import { Button } from "@/components/ui/button";
import { useLogout } from "@/services/authServices";


const ProductPage = () => {
    const { mutateAsync: logoutMutation, isPending: isLoggingOut } = useLogout();

    return (
        <div>
            <p>Product Page</p>
            <Button disabled={isLoggingOut} onClick={() => logoutMutation()} className="mt-4" color="destructive" size="lg">
                Đăng xuất
            </Button>
        </div>
    );

}

export default ProductPage;