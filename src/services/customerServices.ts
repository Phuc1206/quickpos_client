import gateway from "@/api";
import type { IPagination } from "@/types/common";
import type { ICustomerDetail, ICustomerPayload } from "@/types/customer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateCustomer = () => {
	return useMutation({
		mutationFn: (payload: ICustomerPayload) =>
			gateway.customer.sendCreateCustomerRequest(payload),
		onSuccess: async (data) => {
			toast.success(data?.data?.message || "Tạo khách hàng thành công", {
				description: "Khách hàng đã được tạo thành công.",
			});
		},
		onError: (error) => {
			console.log("Create customer error:", error);
			toast.error("Tạo khách hàng thất bại!", {
				description: "Vui lòng kiểm tra lại thông tin khách hàng.",
			});
		},
	});
};

export const useGetCustomerDetail = (customerId: string) => {
	const query = useQuery({
		queryKey: ["get-customer-detail", customerId],
		queryFn: async () => {
			try {
				const res =
					await gateway.customer.sendGetCustomerDetailRequest(customerId);
				return res?.data ?? null;
			} catch (error: any) {
				console.error("Failed to fetch customer detail:", error);
				throw error;
			}
		},
		// enabled: false
	});

	const queryData = (query.data as any)?.data as ICustomerDetail[];

	return {
		customerDetail: queryData,
		...query,
	};
};

export const useGetCustomerSelection = (searchTerm?: string) => {
	const query = useQuery({
		queryKey: ["get-customer-selection", searchTerm],
		queryFn: async () => {
			try {
				const res =
					await gateway.customer.sendGetCustomerSelectionRequest(searchTerm);
				return res?.data ?? null;
			} catch (error: any) {
				console.error("Failed to fetch customer selection:", error);
				throw error;
			}
		},
		// enabled: false
	});

	const queryData = (query.data as any)?.data as ICustomerDetail[];

	return {
		customerSelection: queryData,
		...query,
	};
};

export const useGetCustomerList = (payload: IPagination) => {
	const query = useQuery({
		queryKey: [
			"get-customer-list",
			payload?.page,
			payload?.rows,
			payload?.search,
		],
		queryFn: async () => {
			try {
				const res = await gateway.customer.sendGetCustomerListRequest(payload);
				return res?.data ?? null;
			} catch (error: any) {
				console.error("Failed to fetch customer list:", error);
				throw error;
			}
		},
		// enabled: false
	});

	const queryData = (query.data as any)?.data?.customers as ICustomerDetail[];
	const countTotal = ((query.data as any)?.data?.count as number) || 0;

	return {
		customerList: queryData,
		customerListCount: countTotal,
		...query,
	};
};

export const useUpdateCustomer = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: any) =>
			gateway.customer.sendUpdateCustomerRequest(payload),
		onSuccess: async (data) => {
			queryClient.invalidateQueries(["get-customer-detail"]);
			queryClient.invalidateQueries(["get-customer-list"]);
			toast.success(data?.data?.message || "Cập nhật khách hàng thành công", {
				description: "Khách hàng đã được cập nhật thành công.",
			});
		},
		onError: (error) => {
			console.log("Update customer error:", error);
			toast.error("Cập nhật khách hàng thất bại!", {
				description: "Vui lòng kiểm tra lại thông tin khách hàng.",
			});
		},
	});
};
