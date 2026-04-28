import api from "@/core/axiosConfig";
import { apiStrings } from "@/services";

const sendCreateEmployeeRequest = async (payload: any) => {
	try {
		const response = await api.post(apiStrings.employee.create, payload);
		// console.log("Product create request api:", response);
		return response;
	} catch (error) {
		console.error("Product create request failed:", error);
		throw error;
	}
};

const sendUpdateEmployeeRequest = async (payload: any) => {
	try {
		const response = await api.patch(apiStrings.employee.update, payload);
		// console.log("Product create request api:", response);
		return response;
	} catch (error) {
		console.error("Product create request failed:", error);
		throw error;
	}
};

const sendDeleteEmployeeRequest = async (id: string) => {
	try {
		const response = await api.delete(`${apiStrings.employee.delete}${id}`);
		// console.log("Product create request api:", response);
		return response;
	} catch (error) {
		console.error("Product create request failed:", error);
		throw error;
	}
};
const getEmployeeDetailRequest = async (id: string) => {
	try {
		const response = await api.get(`${apiStrings.employee.detail}/${id}`);
		// console.log("Product create request api:", response);
		return response;
	} catch (error) {
		console.error("Product create request failed:", error);
		throw error;
	}
};

const getEmployeeListRequest = async (payload: any) => {
	try {
		const response = await api.get(apiStrings.employee.list, {
			params: payload,
		});
		// console.log("Product create request api:", response);
		return response;
	} catch (error) {
		console.error("Product create request failed:", error);
		throw error;
	}
};
const employee = {
	sendCreateEmployeeRequest,
	sendUpdateEmployeeRequest,
	sendDeleteEmployeeRequest,
	getEmployeeDetailRequest,
	getEmployeeListRequest,
};
export default employee;
