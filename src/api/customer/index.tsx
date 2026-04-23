import api from "@/core/axiosConfig";
import { apiStrings } from "@/services";
import type { ICustomerPayload } from "@/types/customer";


const sendCreateCustomerRequest = async (payload: ICustomerPayload) => {
    try {
        const response = await api.post(apiStrings.customer.create, payload);
        // console.log("Create customer request api:", response);
        return response;
    } catch (error) {
        console.error("Create customer request failed:", error);
        throw error;
    }
}

const sendGetCustomerDetailRequest = async (customerId: string) => {
    try {
        const response = await api.get(`${apiStrings.customer.detail}/${customerId}`);
        // console.log("Get customer detail request api:", response);
        return response;
    } catch (error) {
        console.error("Get customer detail request failed:", error);
        throw error;
    }
}

const sendGetCustomerSelectionRequest = async (searchTerm?: string) => {
    try {
        const response = await api.get(`${apiStrings.customer.selection}`, {
            params: { search: searchTerm }
        });
        // console.log("Get customer selection request api:", response);
        return response;
    } catch (error) {
        console.error("Get customer selection request failed:", error);
        throw error;
    }
}


const customer = {
    sendCreateCustomerRequest,
    sendGetCustomerDetailRequest,
    sendGetCustomerSelectionRequest,
}

export default customer;