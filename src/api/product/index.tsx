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
}

const product = {
    sendProductListRequest,
}

export default product;