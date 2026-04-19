const apiStrings = {
	auth: {
		login: "/auth/sign-in",
		refreshToken: "/auth/refresh-token",
		logout: "/auth/sign-out",
	},
} as const;

export default apiStrings;
