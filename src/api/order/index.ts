import api from "@/core/axiosConfig";
import { apiStrings } from "@/services";
import type { IBillPayload } from "@/types/order";


const sendCreateBillRequest = async (payload: IBillPayload) => {
    try {
        const response = await api.post(apiStrings.order.create, payload);
        // console.log("Create bill request api:", response);
        return response;
    } catch (error) {
        console.error("Create bill request failed:", error);
        throw error;
    }
}

const sendGetBillDetailRequest = async (billId: string) => {
    try {
        const response = await api.get(`${apiStrings.order.detail}/${billId}`);
        // console.log("Get customer detail request api:", response);
        return response;
    } catch (error) {
        console.error("Get customer detail request failed:", error);
        throw error;
    }
}

const order = {
    sendCreateBillRequest,
    sendGetBillDetailRequest
}

export default order;