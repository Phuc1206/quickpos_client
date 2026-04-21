const apiStrings = {
	auth: {
		login: "/auth/sign-in",
		refreshToken: "/auth/refresh_token",
		logout: "/auth/sign-out",
	},
	product: {
		list: "/resources/menu-items/list",
		create: "/product/create",
	}
} as const;

export default apiStrings;
