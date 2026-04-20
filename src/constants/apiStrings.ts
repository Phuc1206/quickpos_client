const apiStrings = {
	auth: {
		login: "/auth/sign-in",
		refreshToken: "/auth/refresh_token",
		logout: "/auth/sign-out",
	},
} as const;

export default apiStrings;
