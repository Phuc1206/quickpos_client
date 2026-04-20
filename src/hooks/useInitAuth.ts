/* eslint-disable react-hooks/exhaustive-deps */
import { SLUG_NAME } from "@/constants/slugName";
import { useRefreshToken } from "@/services/authServices";
import { clearAccessToken } from "@/services/token";
import { useAuthStore } from "@/zustand/authStore";
import { useEffect, useState } from "react";

export const useInitAuth = () => {
    const { user, navigationConfig, logout } = useAuthStore();
    const { mutateAsync: refreshAccessToken } = useRefreshToken();
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        const init = async () => {
            if (user && navigationConfig) {
                setIsInitializing(false);
                return;
            }

            if (!user && location.pathname !== SLUG_NAME.AUTH.LOGIN) {
                try {
                    await refreshAccessToken();
                } catch (err) {
                    console.log('Refresh token failed during init:', err);
                    clearAccessToken();
                    logout();
                }
            }

            setIsInitializing(false);
        };

        void init();
    }, []);

    return { isInitializing, user, navigationConfig };
};
