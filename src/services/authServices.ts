import gateway from "@/api";
import type { ILoginPayload } from "@/types/auth";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { clearAccessToken, setAccessToken } from "@/services/token";
import { toast } from "sonner";
import { SLUG_NAME } from "@/constants/slugName";
import type { TRole } from "@/constants/permission";
import { getDefaultPageByRole, navigationSelector } from "@/routes/navigationSelector";


export const useLogin = () => {
    const navigate = useNavigate();
    const { setUser, setNavigationConfig } = useAuthStore();

    return useMutation({
        mutationFn: (payload: ILoginPayload) => gateway.auth.sendLoginRequest(payload),
        onSuccess: async (data) => {
            const { accessToken, user } = data?.data?.data || {};
            setAccessToken(accessToken);
            setUser(user);

            const config = await navigationSelector(user.level as TRole);
            setNavigationConfig(config);

            toast.success(data?.data?.message || "Đăng nhập thành công", {
                description: "Chào mừng bạn quay trở lại."
            });

            navigate(getDefaultPageByRole(user.level as TRole));
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
    const { setUser, setNavigationConfig } = useAuthStore();

    return useMutation({
        mutationFn: () => gateway.auth.sendLogoutRequest(),
        onSuccess: (data) => {
            clearAccessToken();
            setUser(null);
            setNavigationConfig(undefined);

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

export const useRefreshToken = () => {
    const { setUser, setNavigationConfig } = useAuthStore();

    return useMutation({
        mutationFn: () => gateway.auth.sendRefreshTokenRequest(),
        onSuccess: async (data) => {
            const { accessToken, user } = data?.data || {};
            setAccessToken(accessToken);
            setUser(user);
            const config = await navigationSelector(user.level as TRole);
            setNavigationConfig(config);
        },
        onError: (error) => {
            console.log("Refresh token error:", error);
            toast.error("Làm mới token thất bại!");
        }
    });
};
