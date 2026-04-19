import gateway from "@/api";
import type { ILoginPayload } from "@/types/auth";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { clearAccessToken, setAccessToken } from "@/services/token";
import { toast } from "sonner";
import { SLUG_NAME } from "@/constants/slugName";


export const useLogin = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (payload: ILoginPayload) => gateway.auth.sendLoginRequest(payload),
        onSuccess: (data) => {
            console.log("Login success services:", data?.data);

            const { accessToken, user } = data?.data?.data || {};
            setAccessToken(accessToken);
            useAuthStore.getState().setUser(user);
            localStorage.setItem("user", JSON.stringify(user));

            // Hiển thị toast trước
            toast.success(data?.data?.message || "Đăng nhập thành công", {
                description: "Chào mừng bạn quay trở lại."
            });

            // Sau đó mới chuyển trang
            navigate(SLUG_NAME.FEATURE.DASHBOARD);
        },
        onError: (error) => {
            console.log("Login error:", error);
            toast.error("Đăng nhập thất bại!", {
                description: "Vui lòng kiểm tra lại thông tin đăng nhập."
            });
        }
    });
};

export const useLogout = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: () => gateway.auth.sendLogoutRequest(),
        onSuccess: (data) => {
            console.log("Logout success services:", data?.data);
            clearAccessToken();
            useAuthStore.getState().setUser(null);
            localStorage.setItem("user", JSON.stringify(null));

            navigate(SLUG_NAME.AUTH.LOGIN);

            toast.success(data?.data?.message, {
                description: "Đăng xuất thành công"
            });
        },
        onError: (error) => {
            console.log("Login error:", error);
            toast.error("Đăng xuất thất bại!");
        }
    });
};