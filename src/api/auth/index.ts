import api from "@/core/axiosConfig";
import { apiStrings } from "@/services";
import type { ILoginPayload } from "@/types/auth";


const sendLoginRequest = async (payload: ILoginPayload) => {
    try {
        const response = await api.post(apiStrings.auth.login, payload);
        // console.log("Login request api:", response);
        return response;
    } catch (error) {
        console.error("Login request failed:", error);
        throw error;
    }
}

const sendLogoutRequest = async () => {
    try {
        const response = await api.post(apiStrings.auth.logout);
        console.log("Logout request api:", response);
        return response;
    } catch (error) {
        console.error("Logout request failed:", error);
        throw error;
    }
}

const auth = {
    sendLoginRequest,
    sendLogoutRequest
};

export default auth;