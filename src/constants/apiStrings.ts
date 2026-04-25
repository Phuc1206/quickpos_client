const apiStrings = {
	auth: {
		login: "/auth/sign-in",
		refreshToken: "/auth/refresh_token",
		logout: "/auth/sign-out",
	},
	product: {
		list: "/resources/menu-items/list",
		create: "/resources/menu-items/",
		detail: "/resources/menu-items/detail",
		update: "/resources/menu-items/",
		delete: "/resources/menu-items/",
	},
	customer: {
		create: "/resources/customers/",
		detail: "/resources/customers/detail",
		selection: "/resources/customers/selection",
		list: "/resources/customers/list",
		update: "/resources/customers/",
	},
	order: {
		create: "/resources/bills/",
		detail: "/resources/bills/detail",
		list: "/resources/bills/list",
	},
} as const;

export default apiStrings;
