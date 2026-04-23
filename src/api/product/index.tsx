import api from "@/core/axiosConfig";
import { apiStrings } from "@/services";
import type { IPagination } from "@/types/common";

const sendProductListRequest = async (payload: IPagination) => {
	try {
		const response = await api.get(apiStrings.product.list, {
			params: {
				page: payload.page,
				rows: payload.rows,
				search: payload.search || "",
			},
		});
		// console.log("Product list request api:", response);
		return response;
	} catch (error) {
		console.error("Product list request failed:", error);
		throw error;
	}
};

const getProductDetailRequest = async (id: string) => {
	try {
		const response = await api.get(`${apiStrings.product.detail}/${id}`);
		// console.log("Product detail request api:", response);
		return response;
	} catch (error) {
		console.error("Product detail request failed:", error);
		throw error;
	}
};

const updateProductRequest = async (id: string, payload: any) => {
	try {
		const response = await api.patch(
			`${apiStrings.product.update}/${id}`,
			payload,
		);
		// console.log("Product update request api:", response);
		return response;
	} catch (error) {
		console.error("Product update request failed:", error);
		throw error;
	}
};
const product = {
	sendProductListRequest,
	getProductDetailRequest,
	updateProductRequest,
};

export default product;
