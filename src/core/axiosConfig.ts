import { API_DEVELOPMENT } from "@/core/ENV";
import { apiStrings } from "@/services";
import {
	clearAccessToken,
	getAccessToken,
	setAccessToken,
} from "@/services/token";
import { useAuthStore } from "@/zustand/authStore";
import axios from "axios";

const api = axios.create({
	baseURL: API_DEVELOPMENT,
	withCredentials: true,
});

api.interceptors.request.use((config) => {
	const token = getAccessToken();

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

api.interceptors.response.use(
	(res) => res,
	async (error) => {
		const originalRequest = error.config;

		// nếu token hết hạn
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const res = await axios.post(
					`${API_DEVELOPMENT}${apiStrings.auth.refreshToken}`,
					{},
					{ withCredentials: true },
				);

				const newToken = res.data.accessToken;

				setAccessToken(newToken);

				// gọi lại request cũ
				originalRequest.headers.Authorization = `Bearer ${newToken}`;

				return api(originalRequest);
			} catch (err) {
				// refresh fail → logout
				clearAccessToken();
				useAuthStore.getState().logout();
				console.log(err);
				window.location.href = "/login";
			}
		}

		return Promise.reject(error);
	},
);

export default api;
