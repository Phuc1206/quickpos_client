const apiStrings = {
	auth: {
		login: "/auth/sign-in",
		refreshToken: "/auth/refresh_token",
		logout: "/auth/sign-out",
	},
	product: {
		list: "/resources/menu-items/list",
		create: "/product/create",
	},
	customer: {
		create: "/resources/customers/",
		detail: "/resources/customers/detail",
		selection: "/resources/customers/selection",
	},
	order: {
		create: "/resources/bills/",
		detail: "/resources/bills/detail"
	},
} as const;

export default apiStrings;
